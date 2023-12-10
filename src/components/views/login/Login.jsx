import * as React from 'react';
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import DialogTitle from '@mui/material/DialogTitle';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const StyledLogin = styled.div `
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 7%;
    .row1{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 10%;
    }
    .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root{
        width: 100%;
    }
    .css-1u3bzj6-MuiFormControl-root-MuiTextField-root{
        margin: 8px;
    }
    .css-46bh2p-MuiCardContent-root:last-child{
        padding-bottom:0px;
    }

    .css-12dv9jb{
        width: 480px;
        margin: 50px;
    }
`;

export default function OutlinedCard() {

    const [mail, setEmail] = React.useState('');
    const [pass, setPassword] = React.useState('');
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [showMessage, setShowMessage] = React.useState(false);
    const [loginSuccess, setLoginSuccess] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);
    const [redirectToInicio, setRedirectToInicio] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (redirectToInicio) {
            navigate('/inicio'); 
        }
    }, [redirectToInicio, navigate]);

    const handleLogin = async () => {
        setProcessing(true);
        setButtonDisabled(true);
        setShowMessage(false);

        try {
            const response = await fetch('http://localhost:8080/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mail, pass })
            });
            
            
            const data = await response.json();

            if (response.ok) {
                setLoginSuccess(true);
                setRedirectToInicio(true);
                localStorage.setItem('token', data.token);

            } else {
                setLoginSuccess(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginSuccess(false);
        }

        setEmail('');
        setPassword('');
        setButtonDisabled(false);
        setProcessing(false);
        setShowMessage(true);

        if (redirectToInicio) {
            navigate('/inicio'); 
            return null;
        }
    };

    return (
        <StyledLogin>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">
                    <CardContent>
                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                            ¡Bienvenido!
                        </DialogTitle>
                        <div className='row1'>
                            <TextField
                                id="outlined-controlled"
                                InputLabelProps={{ shrink: true }}
                                label="Email"
                                size="small"
                                variant="outlined"
                                onChange={(e) => setEmail(e.target.value)}
                                value={mail}
                                disabled={buttonDisabled || processing}
                            />
                            <TextField
                                id="outlined-controlled"
                                InputLabelProps={{ shrink: true }}
                                label="Contraseña"
                                size="small"
                                type='password'
                                variant="outlined"
                                onChange={(e) => setPassword(e.target.value)}
                                value={pass}
                                disabled={buttonDisabled || processing}
                            />
                        </div>
                        {showMessage && (
                            <div className='row1'>
                                {!loginSuccess ? (
                                    <Typography variant="body2" color="error">
                                        Credenciales incorrectas. Inténtalo de nuevo.
                                    </Typography>
                                ): (
                                    null
                                )}
                            </div>
                        )}
                        <div className='row1'>
                            {processing ? (
                                <Typography variant="body2">
                                    Procesando...
                                </Typography>
                            ) : (
                                <CardActions>
                                    <Button size="small" onClick={handleLogin} disabled={buttonDisabled}>
                                        Iniciar sesión
                                    </Button>
                                </CardActions>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </Box>
        </StyledLogin>
    );
}
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
import { Link } from 'react-router-dom';

const StyledLogin = styled.div `
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;

    .row1{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root{
        width: 300px;
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
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [showMessage, setShowMessage] = React.useState(false);
    const [loginSuccess, setLoginSuccess] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);

    const handleLogin = () => {
        setProcessing(true);
        setButtonDisabled(true);
        setShowMessage(false);

        setTimeout(() => {
            // Lógica simulada de inicio de sesión
            if (email === 'sbmartinezmartinez@gmail.com' && password === '123456') {
                setLoginSuccess(true);
            } else {
                setLoginSuccess(false);
            }

            setTimeout(() => {
                setEmail('');
                setPassword('');
                setButtonDisabled(false);
                setProcessing(false);
                window.location.href = '/inicio';

                if (loginSuccess) {
                    // Redirige a la ruta deseada después de un inicio de sesión exitoso
                    console.log(loginSuccess)
                    setTimeout(() => {
                        window.location.href = '/inicio';
                    }, 2000);
                }

                setShowMessage(true);
            }, 2000);
        }, 2000);
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
                                value={email}
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
                                value={password}
                                disabled={buttonDisabled || processing}
                            />
                        </div>
                        {showMessage && (
                            <div className='row1'>
                                {loginSuccess ? (
                                    <Typography variant="body2" color="success">
                                        Inicio de sesión exitoso
                                    </Typography>
                                ) : (
                                    <Typography variant="body2" color="error">
                                        Credenciales incorrectas. Inténtalo de nuevo.
                                    </Typography>
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

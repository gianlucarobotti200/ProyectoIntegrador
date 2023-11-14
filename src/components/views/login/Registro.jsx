import * as React from 'react';
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import DialogTitle from '@mui/material/DialogTitle';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const StyledRegistro = styled.div `
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

    const handleRegister = () => {
        // Deshabilitar el botón y mostrar el mensaje
        setButtonDisabled(true);
        setShowMessage(true);
    
        // Realizar la lógica para enviar los datos al backend
        fetch('http://localhost:8081/users/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mail: email, pass: password }),
        })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito
            console.log('Registro exitoso:', data);
    
            // Limpiar el formulario después del éxito
            setEmail('');
            setPassword('');
    
            // Habilitar el botón y ocultar el mensaje después de un breve periodo (por ejemplo, 2 segundos)
            setTimeout(() => {
                setButtonDisabled(false);
                setShowMessage(false);
            }, 2000);
        })
        .catch(error => {
            // Manejar errores, por ejemplo, mostrar un mensaje de error
            console.error('Error en el registro:', error);
    
            // En caso de error, habilitar el botón y ocultar el mensaje inmediatamente
            setButtonDisabled(false);
            setShowMessage(false);
        });
    };
    return (
        <StyledRegistro>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">
                    <CardContent>
                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                            Nuevo registro
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
                                disabled={buttonDisabled}
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
                                disabled={buttonDisabled}
                            />
                        </div>
                        {showMessage && (
                            <div className='row1'>
                                <p>Se enviará un correo electrónico para completar la activación.</p>
                            </div>
                        )}
                        <div className='row1'>
                            <CardActions>
                                <Button size="small" onClick={handleRegister} disabled={buttonDisabled}>
                                    Registrar
                                </Button>
                            </CardActions>
                        </div>
                    </CardContent>
                </Card>
            </Box>
        </StyledRegistro>
    );
}

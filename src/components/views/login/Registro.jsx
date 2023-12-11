import * as React from 'react';
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import DialogTitle from '@mui/material/DialogTitle';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import config from '../../../config';

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
    const [nombre, setNombre] = React.useState('');
    const [apellido, setApellido] = React.useState('');
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [showMessage, setShowMessage] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleRegister = () => {
        if (!email || !password || !nombre || !apellido) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        setButtonDisabled(true);
        // setShowMessage(true);
        setError(null);

        fetch(config.host+'/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mail: email, pass: password, nombre: nombre, apellido: apellido}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Registro exitoso:', data);
            setEmail('');
            setPassword('');
            setNombre('');
            setApellido('');
            setShowMessage(true); // Mostrar el mensaje
        })
        .catch(error => {
            console.error('Error en el registro:', error);
            setError('Hubo un error en el registro. Por favor, inténtelo de nuevo.');
            setShowMessage(true);
        })
        .finally(() => {
            setButtonDisabled(false);
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
                                label="Nombre"
                                size="small"
                                variant="outlined"
                                onChange={(e) => setNombre(e.target.value)}
                                value={nombre}
                                disabled={buttonDisabled}
                            />
                            <TextField
                                id="outlined-controlled"
                                InputLabelProps={{ shrink: true }}
                                label="Apellido"
                                size="small"
                                variant="outlined"
                                onChange={(e) => setApellido(e.target.value)}
                                value={apellido}
                                disabled={buttonDisabled}
                            />
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
                        {error ? (
                            <div className='row1'>
                                <p>Error: {error}</p>
                            </div>
                        ) : (
                            showMessage && (
                                <div className='row1'>
                                    <p>Se enviará un correo electrónico para completar la activación.</p>
                                </div>
                            )
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
import React, { useState } from 'react';
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Autocomplete from '@mui/material/Autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import fetchWithToken from './login/Interceptor'


const StyledForm = styled.form`
    .row1{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .css-1u3bzj6-MuiFormControl-root-MuiTextField-root{
        width: 100%;
        margin: 8px;

    }
    .css-1xnbq41-MuiAutocomplete-root {
        width: 100%;
        margin: 8px;
    }
    .css-sghohy-MuiButtonBase-root-MuiButton-root{
        width: 100%;
        margin: 8px;
    }
    .row2{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .row3{
        display: flex;
    }

    .row4{
        display: flex;
        justify-content: flex-end;
        margin: 8px;
    }
`

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const FormCaracteristicas = ({ onCloseModal }) => {
    const [nombre, setNombre] = useState('');
    const [icono, setIcono] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            nombre,
            icono
        };

        try {

            const response = await fetchWithToken('http://localhost:8080/caracteristicas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('La característica se ha agregado exitosamente.', jsonResponse);
                onCloseModal();
            } else {
                console.error('Error al agregar caracteristica.');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
        
    };

    return (
        <>
        
        <StyledForm onSubmit={handleSubmit}>
        <div className='row1'>
                <TextField
                    id="outlined-controlled"
                    InputLabelProps={{ shrink: true }}
                    label="Característica"
                    size="small"
                    variant="outlined"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div className='row2'>
                <TextField
                    id="outlined-controlled"
                    InputLabelProps={{ shrink: true }}
                    label="Ícono Url"
                    size="small"
                    variant="outlined"
                    value={icono}
                    onChange={(e) => setIcono(e.target.value)} 
                />
            </div>
            <div className='row4'>
                <Button variant="outlined" type="submit">
                    Guardar
                </Button>
            </div>
        </StyledForm>
        </>
    );
}

export default FormCaracteristicas;

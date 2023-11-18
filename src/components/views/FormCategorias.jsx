import React, { useState } from 'react';
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

const FormCategorias = ({ onCloseModal }) => {
    const [nombre, setNombre] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            nombre
        };

        try {
            const response = await fetch('http://localhost:8080/categorias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('La categoría se ha agregado exitosamente.', jsonResponse);
                onCloseModal();
            } else {
                console.error('Error al agregar categoría.');
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
                    label="Categoría"
                    size="small"
                    variant="outlined"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
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

export default FormCategorias;
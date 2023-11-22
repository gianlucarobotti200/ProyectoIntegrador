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
import fetchWithToken from '../views/login/Interceptor'



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

const FormTours = ({ onCloseModal }) => {
    const [titulo, setTitulo] = useState('');
    const [provincia, setProvincia] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [duracion, setDuracion] = useState('');
    const [imagenes, setImagenes] = useState(null);
    const [id, setId] =useState('1')

    const handleFileChange = (e) => {
        setImagenes(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formDataImagenes = null;

        const formData = {
            provincia,
            titulo,
            descripcion,
            precio: parseInt(precio), 
            cantHoras: parseInt(duracion), 
        };

        try {
            const response = await fetchWithToken('http://localhost:8081/tours', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                setId(jsonResponse.id);
                console.log('El tour se ha agregado exitosamente.');
                onCloseModal();
            } else {
                console.error('Error al agregar el tour.');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
        if (imagenes && imagenes.length > 0) {
            formDataImagenes = new FormData();
            for (let i = 0; i < imagenes.length; i++) {
                formDataImagenes.append('file', imagenes[i]);
            }
        }
        try {
            const imageResponse = await fetch(`http://localhost:8081/tours/subirfotos/${id}`, {
                method: 'POST',
                body: formDataImagenes,
            });
            if (imageResponse.ok) {
                console.log('Las imágenes se han agregado exitosamente.');
            } else {
                console.error('Error al subir las imágenes.');}}
                catch (error) {
                    console.error('Error al subir las imágenes:', error);}    

    };

    return (
        <>
        
        <StyledForm onSubmit={handleSubmit}>
            <div className='row1'>

            <TextField id="outlined-controlled"  InputLabelProps={{shrink: true,}} label="Título" size="small" variant="outlined" value={titulo}
                onChange={(e) => setTitulo(e.target.value)} />
            </div>
            <div className='row2'>
                
                <Autocomplete
                    id="size-small-outlined"
                    size="small"
                    options={top100Films}
                    onChange={(e, newValue) => {
                        console.log(newValue.title)
                        setProvincia(newValue.title);
                    }}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                    <TextField {...params} label="Seleccionar Provincia" />
                    )}
                />

                <Autocomplete
                    id="size-small-outlined"
                    size="small"
                    options={top100Films}
                    onChange={(e, newValue) => {
                        console.log(newValue.title)
                        setProvincia(newValue.title);
                    }}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                    <TextField {...params} label="Seleccionar Categoría" />
                    )}
                />
            </div>
            <div className='row2'>
            
            
            <FormControl onChange={(e)=> setPrecio(e.target.value)}  size="small" fullWidth sx={{ m: 1 }}>
                <InputLabel onChange={(e)=> setPrecio(e.target.value)} htmlFor="outlined-adornment-amount">Precio</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Amount"
                />
            </FormControl>
            
            <FormControl onChange={(e)=> setDuracion(e.target.value)} size="small" fullWidth sx={{ m: 1 }}>
                <InputLabel  htmlFor="outlined-adornment-amount">Duración</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">hs</InputAdornment>}
                    label="Amount"
                    
                />
            </FormControl>
            <Button component="label" onChange={handleFileChange} variant="contained"  startIcon={<CloudUploadIcon />}>
                Subir archivo
                <VisuallyHiddenInput multiple type="file" />
            </Button>
            </div>
            <div className='row3'>

            <TextField
                id="outlined-multiline-static"
                label="Descripción"
                multiline
                rows={4}
                value={descripcion}
                InputLabelProps={{shrink: true,}} 
                onChange={(e) => setDescripcion(e.target.value)}
            />
            </div>
            <div className='row4'>

                <Button variant="outlined" type="submit">Guardar</Button>
            </div>
            
        </StyledForm>
        </>
    );
}

export default FormTours;

const top100Films = [
    { title: 'Buenos Aires'},
    { title: 'Santa Fe' },
    { title: 'Mendoza' },
    { title: 'Córdoba' },
    { title: 'Entre Ríos' },
    { title: "Corrientes"},
    { title: 'Misiones'},
    { title: 'Formosa'},
    { title: 'Chaco'},
    { title: 'Salta'},
    { title: 'Jujuy'},
    { title: 'Catamarca'},
    { title: 'La Rioja'},
    { title: 'San Juan'},
    { title: 'San Luis'},
    { title: 'Neuquén'},
    { title: 'La Pampa'},
    { title: 'Río Negro'},
    { title: 'Chubut'},
    { title: 'Santa Cruz'},
    { title: 'Tierra del Fuego'},
    { title: 'Tucumán'}
]
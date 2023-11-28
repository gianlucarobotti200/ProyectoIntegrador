import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Autocomplete from '@mui/material/Autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

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
    const [file, setFile] = useState([]);
    const [id, setId] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
    const [caracteristicasSeleccionadas, setCaracteristicasSeleccionadas] = useState([]);
    const [politicas, setPoliticas] = useState([]);
    const [politicasSeleccionadas, setPoliticasSeleccionadas] = useState([]);

    const getCaracteristicasYCategorias = async () => {
        try {
            const response1 = await fetch("http://localhost:8080/caracteristicas");
            const response2 = await fetch("http://localhost:8080/categorias");
            const response3 = await fetch("http://localhost:8080/politicas");
            const jsonData1 = await response1.json();
            const jsonData2 = await response2.json();
            const jsonData3 = await response3.json();
            setCaracteristicas(jsonData1);
            setCategorias(jsonData2);
            setPoliticas(jsonData3);

        } catch (error) {
            console.error("Error al obtener los datos de la API: ", error);
        }
    };

    useEffect(() => {
        getCaracteristicasYCategorias();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('provincia', provincia);
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('precio', parseInt(precio));
        formData.append('cantHoras', parseInt(duracion));

        if (file && file.length > 0) {
            for (let i = 0; i < file.length; i++) {
                formData.append('file', file[i]);
            }
        }
      
        try {
            const response = await fetch('http://localhost:8080/tours', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                if (response.ok) {
                    console.log('El formulario se ha enviado exitosamente.');
                }

                // Enviar categorías seleccionadas
                await fetch(`http://localhost:8080/tours/${response.id}/categorias`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(categoriasSeleccionadas.map((category) => category.id)),
                });

                // Enviar características seleccionadas
                await fetch(`http://localhost:8080/tours/${response.id}/caracteristicas`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(caracteristicasSeleccionadas.map((category) => category.id)),
                });

                console.log('El tour se ha agregado exitosamente.');
                onCloseModal();
            } else {
                console.error('Error al enviar el formulario.');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };
    

    

    return (
        <>
            <StyledForm onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='row1'>

                    <TextField id="outlined-controlled" InputLabelProps={{ shrink: true, }} label="Título" size="small" variant="outlined" value={titulo}
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

                    <div>
                        <h5>Categorías</h5>
                        <FormGroup>
                            {categorias.map((categoria) => (
                                <FormControlLabel
                                    key={categoria.id}
                                    control={
                                        <Checkbox
                                            inputProps={{ 'aria-label': `Checkbox ${categoria.nombre}` }}
                                            checked={categoriasSeleccionadas.some((seleccionada) => seleccionada.id === categoria.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setCategoriasSeleccionadas([...categoriasSeleccionadas, categoria]);
                                                } else {
                                                    setCategoriasSeleccionadas(categoriasSeleccionadas.filter((seleccionada) => seleccionada.id !== categoria.id));
                                                }
                                            }}
                                        />
                                    }
                                    label={categoria.nombre}
                                />
                            ))}
                        </FormGroup>
                    </div>

                    <div>
                        <h5>Características</h5>
                        <FormGroup>
                            {caracteristicas.map((caracteristica) => (
                                <FormControlLabel
                                    key={caracteristica.id}
                                    control={
                                        <Checkbox
                                            inputProps={{ 'aria-label': `Checkbox ${caracteristica.nombre}` }}
                                            checked={caracteristicasSeleccionadas.some((seleccionada) => seleccionada.id === caracteristica.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setCaracteristicasSeleccionadas([...caracteristicasSeleccionadas, caracteristica]);
                                                } else {
                                                    setCaracteristicasSeleccionadas(caracteristicasSeleccionadas.filter((seleccionada) => seleccionada.id !== caracteristica.id));
                                                }
                                            }}
                                        />
                                    }
                                    label={caracteristica.nombre}
                                />
                            ))}
                        </FormGroup>
                    </div>
                

                </div>
                    <div>
                        <h5>Politicas</h5>
                        <FormGroup>
                            {politicas.map((politica) => (
                                <FormControlLabel
                                    key={politica.id}
                                    control={
                                        <Checkbox
                                            inputProps={{ 'aria-label': `Checkbox ${politica.nombre}` }}
                                            checked={politicasSeleccionadas.some((seleccionada) => seleccionada.id === politica.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setPoliticasSeleccionadas([...politicasSeleccionadas, politica]);
                                                } else {
                                                    setPoliticasSeleccionadas(politicasSeleccionadas.filter((seleccionada) => seleccionada.id !== politica.id));
                                                }
                                            }}
                                        />
                                    }
                                    label={politica.nombre}
                                />
                            ))}
                        </FormGroup>
                    </div>


                <div className='row2'>


                    <FormControl onChange={(e) => setPrecio(e.target.value)} size="small" fullWidth sx={{ m: 1 }}>
                        <InputLabel onChange={(e) => setPrecio(e.target.value)} htmlFor="outlined-adornment-amount">Precio</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Amount"
                        />
                    </FormControl>

                    <FormControl onChange={(e) => setDuracion(e.target.value)} size="small" fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Duración</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">hs</InputAdornment>}
                            label="Amount"

                        />
                    </FormControl>
                    <Button component="label" onChange={handleFileChange} variant="contained" startIcon={<CloudUploadIcon />}>
                        Subir archivo
                        <VisuallyHiddenInput multiple type="file" name='file' />
                    </Button>
                </div>
                <div className='row3'>

                    <TextField
                        id="outlined-multiline-static"
                        label="Descripción"
                        multiline
                        rows={4}
                        value={descripcion}
                        InputLabelProps={{ shrink: true, }}
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
    { title: 'Buenos Aires' },
    { title: 'Santa Fe' },
    { title: 'Mendoza' },
    { title: 'Córdoba' },
    { title: 'Entre Ríos' },
    { title: "Corrientes" },
    { title: 'Misiones' },
    { title: 'Formosa' },
    { title: 'Chaco' },
    { title: 'Salta' },
    { title: 'Jujuy' },
    { title: 'Catamarca' },
    { title: 'La Rioja' },
    { title: 'San Juan' },
    { title: 'San Luis' },
    { title: 'Neuquén' },
    { title: 'La Pampa' },
    { title: 'Río Negro' },
    { title: 'Chubut' },
    { title: 'Santa Cruz' },
    { title: 'Tierra del Fuego' },
    { title: 'Tucumán' }
]
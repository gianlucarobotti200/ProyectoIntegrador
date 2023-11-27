import React from 'react'
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const AdminModificarTour = () => {

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
            const response = await fetch(`http://localhost:8080/tours/${id}`);
            const jsonData1 = await response.json();
            setTitulo(jsonData1.titulo);
            setProvincia(jsonData1.provincia);
            setDescripcion(jsonData1.descripcion);
            setPrecio(jsonData1.precio);
            setDuracion(jsonData1.duracion);
            setFile(jsonData1.file);
            setId(jsonData1.id);
            setCategorias(jsonData1.categorias);
            setCaracteristicas(jsonData1.caracteristicas);
            setPoliticas(jsonData1.politicas)

        } catch (error) {
            console.error("Error al obtener los datos de la API: ", error);
        }
    };



    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <h2>Modificar Tour</h2>
            </div>
            <div>
                <TextField
                    label="Titulo"
                    defaultValue={`${titulo}`}
                    variant="filled"
                />
                <TextField
                    id="multilineaDescripcion"
                    defaultValue={`${descripcion}`}
                    label="Descripcion"
                    multiline
                    maxRows={6}
                    variant="filled"
                />
                <TextField
                    label="Provincia"
                    defaultValue={`${provincia}`}
                    variant="filled"
                />
                <TextField
                    id="filled-number"
                    label="Precio $"
                    type="number"
                    defaultValue={`${precio}`}
                    variant="filled"
                    
                />
                <TextField
                    id="filled-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                <TextField
                    id="filled-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                />
                <TextField
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                />
                <TextField
                    id="filled-helperText"
                    label="Helper text"
                    defaultValue="Default Value"
                    helperText="Some important text"
                    variant="filled"
                />
            </div>

        </Box>
    );

}

export default AdminModificarTour
import React, { useState } from 'react';
import styled from "styled-components";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    background-image: linear-gradient(120deg, #ADC5DB, rgb(195 217 240) 90%);
    justify-content: space-around;

    input, button{
        background-color: #FAFAFA;
        color: black;
        font-size: 16px;
        font-weight: bold;
        padding: 10px 20px;
        border: 1px solid #ffffff;
        border-radius: 5px;
        margin: 2px 0;
        width: 20%;
    }

    select{
        background-color: #FAFAFA;
        color: black;
        font-size: 16px;
        font-weight: bold;
        padding: 10px 20px;
        border: 1px solid #ffffff;
        border-radius: 5px;
        margin: 2px 0;
        width: 23%;
    }

    textarea{
        background-color: #FAFAFA;
        color: black;
        font-size: 16px;
        font-weight: bold;
        padding: 10px 20px;
        border: 1px solid #ffffff;
        border-radius: 5px;
        width: 20%;
        margin: 2px 0;
        resize: none;
    }

    input, label, textarea{
        margin: 2rem 0;
    }
`

const FormTours = ({onCloseModal}) => {
    const [titulo, setTitulo] = useState('');
    const [provincia, setProvincia] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [duracion, setDuracion] = useState('');
    const [file, setFile] = useState([]);
    
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
    
        // Agregar imágenes al formulario
        for (let i = 0; i < file.length; i++) {
            formData.append('file', file[i]);
        }
    
        try {
            // Enviar todo el formulario al servidor en una sola solicitud
            const response = await fetch('http://localhost:8080/tours', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                console.log('El formulario se ha enviado exitosamente.');
                onCloseModal();
            } else {
                console.error('Error al enviar el formulario.');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };
    

    return (
        <StyledForm onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder='Título'
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />
            <select
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
            >
                <option value="">Seleccionar Provincia</option>
                <option value="Buenos Aires">Buenos Aires</option>
                <option value="Santa Fe">Santa Fe</option>
                <option value="Mendoza">Mendoza</option>
                <option value="Córdoba">Córdoba</option>
                <option value="Entre Ríos">Entre Ríos</option>
                <option value="Corrientes">Corrientes</option>
                <option value="Misiones">Misiones</option>
                <option value="Formosa">Formosa</option>
                <option value="Chaco">Chaco</option>
                <option value="Salta">Salta</option>
                <option value="Jujuy">Jujuy</option>
                <option value="Catamarca">Catamarca</option>
                <option value="La Rioja">La Rioja</option>
                <option value="San Juan">San Juan</option>
                <option value="San Luis">San Luis</option>
                <option value="Mendoza">Mendoza</option>
                <option value="Neuquén">Neuquén</option>
                <option value="La Pampa">La Pampa</option>
                <option value="Río Negro">Río Negro</option>
                <option value="Chubut">Chubut</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="Tierra del Fuego">Tierra del Fuego</option>
                <option value="Tucumán">Tucumán</option>
            </select>
            <input type="file" name="file" onChange={handleFileChange} placeholder='Subir imágenes' multiple/>
            <textarea
                type="text"
                placeholder='Descripción'
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />
            <input type="number" placeholder='Precio' onChange={(e)=> setPrecio(e.target.value)}/>
            <input type="number" placeholder='Duración(hs)' onChange={(e)=> setDuracion(e.target.value)}/>
            <button type="submit">Agregar Tour</button>
        </StyledForm>
    );
}

export default FormTours;
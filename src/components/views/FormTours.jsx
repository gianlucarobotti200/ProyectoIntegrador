import React, { useState } from 'react';
import styled from "styled-components";

const StyledForm = styled.form`
    
`

const FormTours = () => {
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
            const response = await fetch('http://localhost:8081/tours', {
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
            <input type="file" onChange={handleFileChange} placeholder='Subir imágenes' multiple/>
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
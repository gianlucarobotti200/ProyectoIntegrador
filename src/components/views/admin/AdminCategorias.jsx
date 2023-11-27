import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import CardCategoriaAdmin from './CardCategoriaAdmin';
import BasicModalCategorias from './BasicModalCategorias';

const StyledAdministracion = styled.div`
    div.header-table{
     
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 1rem;
        margin: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-around;
    }
`

const AdminCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const getCategorias = async () => {
        try {
            const response = await fetch("http://localhost:8080/categorias");
            const jsonData = await response.json();

            setCategorias(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.error("Error al obtener los datos de la API: ", error);
        }
    }

    const refreshCategorias = () => {
        getCategorias();
    }

    useEffect(() => {
        getCategorias();
    }, []);

    return (
        <StyledAdministracion>
            <h1>Administración Categorías</h1>
            <BasicModalCategorias onCategoriaAdded={refreshCategorias}/>
            <div className='header-table'>
                <span className='id'>ID</span>
                <span className='nombre'>Categoría</span>
                <span>GESTIÓN</span>
            </div>
            {categorias.map((categoria, index) => (
                <CardCategoriaAdmin
                    key={index}
                    id={categoria.id}
                    nombre={categoria.nombre}
                    onDelete={refreshCategorias}
                />
            ))}
        </StyledAdministracion>
    );
};

export default AdminCategorias;
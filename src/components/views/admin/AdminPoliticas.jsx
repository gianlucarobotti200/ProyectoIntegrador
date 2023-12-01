import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import CardPoliticasAdmin from './CardPoliticasAdmin';
import BasicModalPoliticas from './BasicModalPoliticas';



const StyledAdministracion = styled.div`
    div.header-table{
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 1rem;
        margin: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-around;
    }
`

const AdminPoliticas = () => {
    const [politicas, setPoliticas] = useState([]);
    const getPoliticas = async () => {
        try {
            const response = await fetch("http://localhost:8080/politicas");
            const jsonData = await response.json();

            setPoliticas(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.error("Error al obtener los datos de la API: ", error);
        }
    }

    const refreshPoliticas = () => {
        getPoliticas();
    }

    useEffect(() => {
        getPoliticas();
    }, []);

    return (
        <StyledAdministracion>
            <h1>Administración Politicas</h1>
            <BasicModalPoliticas onPoliticasAdded={refreshPoliticas}/>
            <div className='header-table'>
                <span className='id'>ID</span>
                <span className='titulo'>Titulo</span>
                <span className='contenido'>Contenido</span>
                <span>GESTIÓN</span>
            </div>
            {politicas.map((politica, index) => (
                <CardPoliticasAdmin
                    key={index}
                    id={politica.id}
                    nombre={politica.nombre}
                    contenido={politica.contenido}
                    onDelete={refreshPoliticas}
                />
            ))}
        </StyledAdministracion>
    );
};

export default AdminPoliticas;
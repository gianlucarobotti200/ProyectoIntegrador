import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import CardCaracteristicaAdmin from './CardCaracteristicaAdmin';
import BasicModalCaracteristicas from './BasicModalCaracteristicas';



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

const AdminCaracteristicas = () => {
    const [caracteristicas, setCaracteristicas] = useState([]);
    const getCaracteristicas = async () => {
        try {
            const response = await fetch("http://localhost:8081/caracteristicas");
            const jsonData = await response.json();

            setCaracteristicas(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.error("Error al obtener los datos de la API: ", error);
        }
    }

    const refreshCaracteristicas = () => {
        getCaracteristicas();
    }

    useEffect(() => {
        getCaracteristicas();
    }, []);

    return (
        <StyledAdministracion>
            <h1>Administración Características</h1>
            <BasicModalCaracteristicas onCaracteristicaAdded={refreshCaracteristicas}/>
            <div className='header-table'>
                <span className='id'>ID</span>
                <span className='icono'>Ícono</span>
                <span className='nombre'>Título</span>
                <span>GESTIÓN</span>
            </div>
            {caracteristicas.map((caracteristica, index) => (
                <CardCaracteristicaAdmin
                    key={index}
                    id={caracteristica.id}
                    iconoUrl={caracteristica.icono}
                    nombre={caracteristica.nombre}
                    onDelete={refreshCaracteristicas}
                />
            ))}
        </StyledAdministracion>
    );
};

export default AdminCaracteristicas;
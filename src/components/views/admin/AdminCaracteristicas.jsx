import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import CardCaracteristicaAdmin from './CardCaracteristicaAdmin';
import BasicModalCaracteristicas from './BasicModalCaracteristicas';
import './EstilosAdmin.css';
import fetchWithToken from '../login/Interceptor'

const StyledAdministracion = styled.div`

`

const AdminCaracteristicas = () => {
    const [caracteristicas, setCaracteristicas] = useState([]);
    const getCaracteristicas = async () => {
        try {
            const response = await fetchWithToken("http://localhost:8080/caracteristicas");
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
         
            <h1 className='adm-caracteristicas' >Administración Características</h1>
            <BasicModalCaracteristicas onCaracteristicaAdded={refreshCaracteristicas}/>
            <div className='header-table'>
                <span className='id'>ID</span>
                <span className='icono'>ÍCONO</span>
                <span className='nombre'>TÍTULO</span>
                <span>GESTIÓN</span>
            </div> 
            {caracteristicas.map((caracteristica, index) => (
                <div className='card-caract' >
                <CardCaracteristicaAdmin
                    key={index}
                    id={caracteristica.id}
                    iconoUrl={caracteristica.icono}
                    nombre={caracteristica.nombre}
                    onDelete={refreshCaracteristicas}
                />
                </div>
            ))}
        </StyledAdministracion>
    );
};

export default AdminCaracteristicas;
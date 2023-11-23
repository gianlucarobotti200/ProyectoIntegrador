import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import CardTourAdmin from './CardTourAdmin';
import BasicModal from './Basicmodal';
import fetchWithToken from '../login/Interceptor'
import { useNavigate } from 'react-router-dom';



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

const AdminTours = () => {
    const [tours, setTours] = useState([]);
    const navigate = useNavigate();
    let decodedData = null
    
    const decodeToken = (token) => {
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
            throw new Error('Token inválido');
        }
    
        const payloadBase64 = tokenParts[1];
        const decodedPayload = atob(payloadBase64);
    
        const parsedPayload = JSON.parse(decodedPayload);
        return parsedPayload;
    };

    

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); 
        } else {
            try {
                decodedData = decodeToken(localStorage.getItem('token'));
                console.log(decodedData.role)
                if (decodedData.role == 0) {
                    navigate('/inicio');
                } else {
                    getTours();
                }        
            } catch (error) {
                console.error('Error al decodificar el token:', error.message);
            }
        }
    }, [history]);

    const getTours = async () => {
        try {
            const response = await fetchWithToken("http://localhost:8081/tours");
            const jsonData = await response.json();

            setTours(jsonData);
        } catch (error) {
            console.error("Error al obtener los datos de la API: ", error);
        }
    }

    const refreshTours = () => {
        getTours();
    }

    useEffect(() => {
        getTours();
    }, []);

    return (
        <StyledAdministracion>
            <h1>Administración Tours</h1>
            <BasicModal onTourAdded={refreshTours}/>
            <div className='header-table'>
                <span className='id'>ID</span>
                <span className='nombre'>Título</span>
                <span>GESTIÓN</span>
            </div>
            {tours.map((tour, index) => (
                <CardTourAdmin
                    key={index}
                    id={tour.id}
                    linkFotos={tour.linkFotos}
                    titulo={tour.titulo}
                    provincia={tour.provincia}
                    descripcion={tour.descripcion}
                    precio={tour.precio}
                    cantHoras={tour.cantHoras}
                    onDelete={refreshTours}
                />
            ))}
        </StyledAdministracion>
    );
};

export default AdminTours;
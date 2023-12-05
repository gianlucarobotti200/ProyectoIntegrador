import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import CardTourAdmin from './CardTourAdmin';
import BasicModal from './Basicmodal';
import fetchWithToken from '../login/Interceptor'
import { useNavigate } from 'react-router-dom';
import decodeToken from '../login/DecodeToken';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './EstilosAdmin.css';

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

    div.pagination-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;  
    }
`

const AdminTours = () => {
    const [tours, setTours] = useState([]);

    const navigate = useNavigate();
    let decodedData = null
    
       

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); 
        } else {
            try {
                decodedData = decodeToken(localStorage.getItem('token'));
                console.log(decodedData.role)   
                getTours();

            } catch (error) {
                console.error('Error al decodificar el token:', error.message);
            }
        }
    }, [navigate]);

    const getTours = async () => {
        try {
            const response = await fetchWithToken("http://localhost:8080/tours/todos");
         } catch (error) {
                console.error("Error al obtener los datos de la API: ", error);
            }
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    let decodedData = null


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            try {
                decodedData = decodeToken(localStorage.getItem('token'));
                console.log(decodedData.role) 
                getTours();
            } catch (error) {
                console.error('Error al decodificar el token:', error.message);
            }
        }
    }, []);

   

        const handlePageChange = (event, newPage) => {
            setCurrentPage(newPage);
        };

        const toursPerPage = 5;
        const startIndex = (currentPage - 1) * toursPerPage;
        const endIndex = startIndex + toursPerPage;

        const getTours = async () => {
            try {
                const response = await fetchWithToken("http://localhost:8080/tours/todos");

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
                <BasicModal onTourAdded={refreshTours} />
                <div className='header-table'>
                    <span className='id'>ID</span>
                    <span className='nombre'>Título</span>
                    <span>GESTIÓN</span>
                </div>
                {tours.slice(startIndex, endIndex).map((tour, index) => (
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
                <div className="pagination-container">
                    <Stack spacing={2}>
                        <Pagination
                            count={Math.ceil(tours.length / toursPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            shape="rounded"
                        />
                    </Stack>
                </div>
            </StyledAdministracion>
        );
    }
}
export default AdminTours;
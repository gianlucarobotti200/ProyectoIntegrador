import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import CardTourAdmin from './CardTourAdmin';
import BasicModal from './Basicmodal';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



const StyledAdministracion = styled.div`

    .adm-tours {
        color: #24306E;
        padding: 2% 0% 2% 0%;
        margin: 4% 5% 0% 6%;
        font-weight: bolder;
        font: 2rem/1rem "Open Sans", sans-serif;
        border-bottom: 2px solid rgba(36, 48, 110, 1);
    }

    div.header-table{
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 2% 2% 2% 3%;
        margin: 0% 2% 3% 2%;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
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
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const toursPerPage = 10;
const startIndex = (currentPage - 1) * toursPerPage;
const endIndex = startIndex + toursPerPage;

    const getTours = async () => {
        try {
            const response = await fetch("http://localhost:8080/tours/todos");
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
            <h1 className='adm-tours'>Administración Tours</h1>
            <BasicModal onTourAdded={refreshTours}/>
            <div className='header-table'>
                <span className='id'>ID</span>
                <span className='nombre'>TÍTULO</span>
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
};

export default AdminTours;
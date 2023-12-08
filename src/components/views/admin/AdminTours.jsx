import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import CardTourAdmin from './CardTourAdmin';
import BasicModal from './Basicmodal';
import fetchWithToken from '../login/Interceptor'
import { useNavigate } from 'react-router-dom';
import decodeToken from '../login/DecodeToken';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

const StyledAdministracion = styled.div`
    
    div.pagination-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;  
    }

    div.loading-container{
        margin: 2rem 12vw;
        width: 100%;
    }
`

const AdminTours = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const [currentPage, setCurrentPage] = useState(1);



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
            setLoading(true);
            const response = await fetchWithToken("http://localhost:8080/tours/todos");

            const jsonData = await response.json();

            setTours(jsonData);
        } catch (error) {
            console.error("Error al obtener los datos de la API: ", error);
        } finally {
            setLoading(false);
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
            <h1 className='adm-categorias'>Administración Tours</h1>
            <BasicModal onTourAdded={refreshTours} />
            <TableContainer component={Paper} sx={{ width: "80vw", margin: "0 10vw" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>ID</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Título</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Gestión</TableCell>
                        </TableRow>
                    </TableHead>
                    {loading ? (
                        <div className='loading-container'>
                            <CircularProgress style={{ margin: '2rem 45%', display: "flex", justifyContent: "center" }} color="inherit" />
                        </div>
                    ) : (
                        <TableBody>
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
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
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
export default AdminTours;
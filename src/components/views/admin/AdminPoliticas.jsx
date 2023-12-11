import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardPoliticasAdmin from './CardPoliticasAdmin';
import BasicModalPoliticas from './BasicModalPoliticas';
import fetchWithToken from '../login/Interceptor';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import config from '../../../config';
import { useNavigate } from 'react-router-dom';
import decodeToken from '../login/DecodeToken';

const StyledAdministracion = styled.div`
    div.pagination-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;  
    }

    div.loading-container {
        margin: 2rem 12vw;
        width: 100%;
        display: flex;
        justify-content: center;
    }
`

const AdminPoliticas = () => {
    const [politicas, setPoliticas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            try {
                const decodedData = decodeToken(token);
                if (decodedData.role === 0) {
                    navigate('/inicio');
                } else {
                    getPoliticas();
                }
            } catch (error) {
                console.error('Error al decodificar el token:', error.message);
            }
        }
    }, [navigate]);

    const getPoliticas = async () => {
        try {
            setLoading(true);
            const response = await fetchWithToken(`${config.host}/politicas`);
            const jsonData = await response.json();

            setPoliticas(jsonData);
        } catch (error) {
            console.error("Error al obtener los datos de la API: ", error);
        } finally {
            setLoading(false);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const toursPerPage = 5;
    const startIndex = (currentPage - 1) * toursPerPage;
    const endIndex = startIndex + toursPerPage;

    const refreshPoliticas = () => {
        getPoliticas();
    }

    useEffect(() => {
        getPoliticas();
    }, []);

    return (
        <StyledAdministracion>
            <h1 className='adm-categorias'>Administración Políticas</h1>
            <BasicModalPoliticas onPoliticasAdded={refreshPoliticas} />
            <TableContainer component={Paper} sx={{ width: "80vw", margin: "0 10vw" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>ID</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Política</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Contenido</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Gestión</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <div className='loading-container'>
                                        <CircularProgress style={{ margin: '2rem auto' }} color="inherit" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            politicas.slice(startIndex, endIndex).map((politica, index) => (
                                <CardPoliticasAdmin
                                    key={index}
                                    id={politica.id}
                                    nombre={politica.nombre}
                                    contenido={politica.contenido}
                                    onDelete={refreshPoliticas}
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="pagination-container">
                <Stack spacing={2}>
                    <Pagination
                        count={Math.ceil(politicas.length / toursPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        shape="rounded"
                    />
                </Stack>
            </div>
        </StyledAdministracion>
    );
};

export default AdminPoliticas;

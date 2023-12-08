import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import CardCaracteristicaAdmin from './CardCaracteristicaAdmin';
import BasicModalCaracteristicas from './BasicModalCaracteristicas';
import './EstilosAdmin.css';
import fetchWithToken from '../login/Interceptor'
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

const AdminCaracteristicas = () => {
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [loading, setLoading] = useState(true);
    const getCaracteristicas = async () => {
        
        try {
            setLoading(true)
            const response = await fetchWithToken("http://localhost:8080/caracteristicas");
            const jsonData = await response.json();

            setCaracteristicas(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.error("Error al obtener los datos de la API: ", error);
        } finally{
            setLoading(false)
        }
    }

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const toursPerPage = 5;
    const startIndex = (currentPage - 1) * toursPerPage;
    const endIndex = startIndex + toursPerPage;

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
            <TableContainer component={Paper} sx={{ width: "80vw", margin: "0 10vw" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>ID</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Icono</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Nombre</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Gestión</TableCell>
                        </TableRow>
                    </TableHead>
                    {loading ? (
                        <div className='loading-container'>
                            <CircularProgress style={{ margin: '2rem 45%', display: "flex", justifyContent: "center" }} color="inherit" />
                        </div>
                    ):(
                       <TableBody>
                            {caracteristicas.slice(startIndex, endIndex).map((caracteristica, index) => (
                                <CardCaracteristicaAdmin
                                    key={index}
                                    iconoUrl={caracteristica.icono}
                                    id={caracteristica.id}
                                    nombre={caracteristica.nombre}
                                    onDelete={refreshCaracteristicas}
                                />
                            ))}
                        </TableBody> 
                    )}
                </Table>
            </TableContainer>
            <div className="pagination-container">
                <Stack spacing={2}>
                    <Pagination
                        count={Math.ceil(caracteristicas.length / toursPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        shape="rounded"
                    />
                </Stack>
            </div>
        </StyledAdministracion>
    );
};

export default AdminCaracteristicas;
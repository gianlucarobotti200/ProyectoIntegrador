import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import CardCategoriaAdmin from './CardCategoriaAdmin';
import BasicModalCategorias from './BasicModalCategorias';
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
    div.loading-container{
        margin: 2rem 12vw;
        width: 100%;
    }
    div.pagination-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;  
    }
`

const AdminCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const getCategorias = async () => {
        try {
            setLoading(true);
            const response = await fetchWithToken("http://localhost:8080/categorias");
            const jsonData = await response.json();

            setCategorias(jsonData);
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

    const refreshCategorias = () => {
        getCategorias();
    }

    useEffect(() => {
        getCategorias();
    }, []);

    return (
        <StyledAdministracion>
            <h1 className='adm-categorias' >Administración Categorías</h1>
            <BasicModalCategorias onCategoriaAdded={refreshCategorias} />
            <TableContainer component={Paper} sx={{ width: "80vw", margin: "0 10vw" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>ID</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Categoría</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Gestión</TableCell>
                        </TableRow>
                    </TableHead>
                    {loading ? (
                        <div className='loading-container'>
                        <CircularProgress style={{ margin: '2rem 45%', display: "flex", justifyContent: "center" }} color="inherit" />
                    </div>
                    ):(
                        <TableBody>
                            {categorias.slice(startIndex, endIndex).map((categoria, index) => (
                                <CardCategoriaAdmin
                                    key={index}
                                    id={categoria.id}
                                    nombre={categoria.nombre}
                                    onDelete={refreshCategorias}
                                />
                            ))}
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
            <div className="pagination-container">
                <Stack spacing={2}>
                    <Pagination
                        count={Math.ceil(categorias.length / toursPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        shape="rounded"
                    />
                </Stack>
            </div>
        </StyledAdministracion>
    );
};

export default AdminCategorias;
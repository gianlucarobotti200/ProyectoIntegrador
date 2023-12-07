import React, { useState } from 'react'
import styled from "styled-components"
import Delete from "@mui/icons-material/Delete"
import fetchWithToken from '../login/Interceptor'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const StyledButton = styled.button`
    background-color: #FAFAFA;
    color: black;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 20px;
    border: 1px solid #ffffff;
    border-radius: 5px;
    margin: 2px 0;
    width: 3%
    ;
`;

const CardCategoriaAdmin = ({ id, nombre, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);

        try {
            const response = await fetchWithToken(`http://localhost:8080/categorias/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                onDelete(); // Aquí deberías actualizar la lista después de la eliminación
            } else {
                console.error('Error al eliminar la característica:', response.status);
            }
        } catch (error) {
            console.error('Error al eliminar la característica:', error);
        }

        setIsDeleting(false);
        setShowConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                {id}
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>{nombre}</TableCell>
            <TableCell align="center">
                {isDeleting ? (
                    <span>Eliminando...</span>
                ) : showConfirmation ? (
                    <div>
                        <p>¿Estás seguro de querer eliminar esta categoría?</p>
                        <StyledButton onClick={handleConfirmDelete}>Sí</StyledButton>
                        <StyledButton onClick={handleCancelDelete}>No</StyledButton>
                    </div>
                ) : (<div>
                    <Delete onClick={handleDeleteClick} />
                </div>
                )}
            </TableCell>
        </TableRow>
    );
};

export default CardCategoriaAdmin;
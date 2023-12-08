import React, { useState } from 'react'
import styled from "styled-components"
import Delete from "@mui/icons-material/Delete"
import fetchWithToken from '../login/Interceptor'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const StyledCardUsuarioAdmin = styled.article`
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;

  img{
	width: 5rem;
	border-radius: 50px
  }

  button{
    background-color: #FAFAFA;
    color: black;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 20px;
    border: 1px solid #ffffff;
    border-radius: 5px;
    margin: 2px 0;
    width: 20%;
  }
`;

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

const CardCaracteristicaAdmin = ({ id, iconoUrl, nombre, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);

        try {

            const response = await fetchWithToken(`http://localhost:8080/caracteristicas/${id}`, {
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
            <TableCell align="center" sx={{ fontWeight: 'bold' }}><img src={iconoUrl} alt={nombre} style={{width: "5rem", borderRadius: "50px"}} /></TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>{nombre}</TableCell>
            <TableCell align="center">
                {isDeleting ? (
                    <span>Eliminando...</span>
                ) : showConfirmation ? (
                    <div>
                        <p>¿Estás seguro de querer eliminar esta característica?</p>
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

export default CardCaracteristicaAdmin;
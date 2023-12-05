import React, { useState } from 'react'
import styled from "styled-components"
import Delete from "@mui/icons-material/Delete"

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

const CardPoliticaAdmin = ({ id, nombre, contenido, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);

        try {
            const response = await fetchWithToken(`http://localhost:8080/politicas/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                onDelete(); // Aquí deberías actualizar la lista después de la eliminación
            } else {
                console.error('Error al eliminar la politica:', response.status);
            }
        } catch (error) {
            console.error('Error al eliminar la politica:', error);
        }

        setIsDeleting(false);
        setShowConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    return (
        <StyledCardUsuarioAdmin>
            <h4>{id}</h4>
            <h4>{nombre}</h4>
            <h4>{contenido}</h4>
            {isDeleting ? (
                <span>Eliminando...</span>
            ) : showConfirmation ? (
                <div>
                    <p>¿Estás seguro de querer eliminar esta politica?</p>
                    <button onClick={handleConfirmDelete}>Sí</button>
                    <button onClick={handleCancelDelete}>No</button>
                </div>
            ) : (
                <Delete onClick={handleDeleteClick} />
            )}
        </StyledCardUsuarioAdmin>
    );
};

export default CardPoliticaAdmin;
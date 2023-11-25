import React, {useState} from 'react'
import styled from "styled-components"
import Delete from "@mui/icons-material/Delete"
import EditIcon from '@mui/icons-material/Edit'
import Swal from 'sweetalert2'


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

const CardTourAdmin = ({id, linkFotos, titulo, provincia, descripcion, precio, cantHoras, onDelete}) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
   

    const handleDeleteClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);

        try {
            const response = await fetch(`http://localhost:8080/tours/eliminarTour/${id}`, {
                method: 'DELETE',
            });

            if (response.status === 200) {
                onDelete();
            } else {
                console.error('Error al eliminar el tour:', response.status);
            }
        } catch (error) {
            console.error('Error al eliminar el tour:', error);
        }

        setIsDeleting(false);
        setShowConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    const handleEditClick = () => {
        Swal.fire({
            title: "Desea Modificar el Tour?",
            text: "Usted Esta Por modificar el Tour!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Modificar!"
          }).then((result) => {
            if (result.isConfirmed) {
               
              
            }
          });
        console.log(`Editando tour con ID: ${id}`);
    };
    

    return (
        <StyledCardUsuarioAdmin>
            <h4>{id}</h4>
            <h4>{titulo}</h4>
            {isDeleting ? (
                <span>Eliminando...</span>
            ) : showConfirmation ? (
                <div>
                    <p>¿Estás seguro de querer eliminar este tour?</p>
                    <button onClick={handleConfirmDelete}>Sí</button>
                    <button onClick={handleCancelDelete}>No</button>
                </div>
            ) : (<div>
                <EditIcon onClick={handleEditClick} />
                <Delete onClick={handleDeleteClick} />
            
             </div>
            )}
            
        </StyledCardUsuarioAdmin>
    );
}

export default CardTourAdmin;
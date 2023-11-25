import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
// import Box from '@mui/material/Box';
import FormCategorias from '../FormCategorias';
// Importa el archivo CSS de estilos externos
import './EstilosModal.css';

// const StyledDetalles  = styled.div `
// display: flex;
// width: 100%;

// .cont-ppal {
//   display: flex;
//   width: 100%;
//   margin: 2rem;
//   flex-direction: row;
//   justify-content: space-around;
// }

// .btn-adm {
//   /* Estilos para el botón Admin Tours */
//   background-color: #4caf50; 
//   color: white; 
//   margin-right: 10px;
// }

// /* Estilos para el segundo botón en cont-ppal */
// .cont-ppal button:nth-child(2) {
//   background-color: #2196f3;
//   color: white;
// }

// /* Estilos para el botón "Agregar Categoría" */
// button:nth-child(3) {
//   background-color: #ff9800;
//   color: white;
// }

// `
// ;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function BasicModalCategorias({onCategoriaAdded}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    onCategoriaAdded();

  };

  return (
    <>
    <StyledDetalles>
    <React.Fragment>
       <div className='cont-ppal'>
      <Button className='btn-adm' variant="outlined" component={Link} to="/admintours">
        Admin Tours
      </Button>
      <Button  variant="outlined" component={Link} to="/admincaracteristicas">
        Admin Caracteristica
      </Button>
      </div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Agregar Categoría
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Nueva Categoría
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        {/* <Box > */}
            <FormCategorias onCloseModal={handleClose}/>   
        {/* </Box> */}
          
        </DialogContent>
        
      </BootstrapDialog>
    </React.Fragment>
    </StyledDetalles>
    </>
  );
}
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
import './EstilosBasicModal.css';
import './EstilosModal.css';



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
    <React.Fragment>
       <div className='cont-ppal'>
        <div>
      <Button className='btn-car1' variant="outlined" component={Link} to="/admintours">
        ADMIN TOURS
      </Button>
      </div>
      <div>
      <Button className='btn-car1'  variant="outlined" component={Link} to="/admincaracteristicas">
        ADMIN CARACTERÍSTICAS
      </Button>
      </div>
      <div>
      <Button className='btn-car1'  variant="outlined" component={Link} to="/adminpoliticas">
        ADMIN POLITICAS
      </Button>
      </div>
      <div>
      <Button className='btn-car1'  variant="outlined" onClick={handleClickOpen}>
        Agregar Categoría
      </Button>
      </div>
       </div>
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
    
  );
}
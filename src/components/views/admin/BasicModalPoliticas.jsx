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
import FormPoliticas from '../FormPoliticas';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function BasicModalPoliticas({onPoliticasAdded}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    onPoliticasAdded();

  };

  return (
    <React.Fragment>
      <div>
      <Button variant="outlined" component={Link} to="/admintours">
        Admin Tours
      </Button>
      <Button variant="outlined" component={Link} to="/admincategorias">
        Admin Categorías
      </Button>
      </div>
      <div>
      <Button variant="outlined" component={Link} to="/admincaracteristicas">
        Admin Caracteristicas
      </Button>
      </div>

      <Button variant="outlined" onClick={handleClickOpen}>
        Agregar Politica
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Nueva Politica
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
            <FormPoliticas onCloseModal={handleClose}/>   
        {/* </Box> */}
          
        </DialogContent>
        
      </BootstrapDialog>
    </React.Fragment>
  );
}

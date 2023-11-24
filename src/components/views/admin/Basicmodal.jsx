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
import FormTours from '../FormTours';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function BasicModal({onTourAdded}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    onTourAdded();

  };

  return (
    <React.Fragment>
      <div>
      <Button variant="outlined" component={Link} to="/admincaracteristicas">
        Admin Características
      </Button>
      <Button variant="outlined" component={Link} to="/admincategorias">
        Admin Categorías
      </Button>
      </div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Agregar tour
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Nuevo tour
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
            <FormTours onCloseModal={handleClose}/>   
        {/* </Box> */}
          
        </DialogContent>
        
      </BootstrapDialog>
    </React.Fragment>
  );
}






// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Fab from '@mui/material/Fab';
// import AddIcon from '@mui/icons-material/Add';
// import FormTours from '../FormTours'; 

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: "70%",
//     height: "70%",
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//     backgroundImage: "linear-gradient(120deg, #ADC5DB, rgb(195 217 240) 90%)",
// };

// export default function BasicModal({onTourAdded}) {
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     const closeModal = () => {
//         handleClose();
//         onTourAdded();
//     };

//     return (
//         <div>
//             <Fab color="primary" aria-label="add" onClick={handleOpen}>
//                 <AddIcon/>
//             </Fab>
//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={style}>
//                     <FormTours onCloseModal={closeModal}/>   
//                 </Box>
//             </Modal>
//         </div>
//     );
// }
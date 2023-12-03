import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import FormTours from '../FormTours'; 

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    height: "70%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    backgroundImage: "linear-gradient(120deg, #ADC5DB, rgb(195 217 240) 90%)",
};

export default function BasicModal({onTourAdded}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const closeModal = () => {
        handleClose();
        onTourAdded();
    };

    return (
        <div>
            <Fab color="primary" aria-label="add" onClick={handleOpen}>
                <AddIcon/>
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <FormTours onCloseModal={closeModal}/>   
                </Box>
            </Modal>
        </div>
    );
}

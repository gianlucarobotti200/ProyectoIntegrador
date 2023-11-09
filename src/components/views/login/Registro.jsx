import * as React from 'react';
import styled from "styled-components"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import DialogTitle from '@mui/material/DialogTitle';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const StyledRegistro = styled.div `
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;

    .row1{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .css-1u3bzj6-MuiFormControl-root-MuiTextField-root{
        margin: 8px
    }
    .css-46bh2p-MuiCardContent-root:last-child{
        padding-bottom:0px
    }

`


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


export default function OutlinedCard() {
  return (
    <StyledRegistro>
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined"><CardContent>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Nuevo registro
                </DialogTitle>
                <div className='row1'>

                    <TextField id="outlined-controlled"  InputLabelProps={{shrink: true,}} label="Email" size="small" variant="outlined" 
                        onChange={(e) => setTitulo(e.target.value)} />
                    <TextField id="outlined-controlled"  InputLabelProps={{shrink: true,}} label="Contraseña" size="small" type='password' variant="outlined" 
                        onChange={(e) => setTitulo(e.target.value)} />
                </div>
                <div className='row1'>
                    <CardActions>
                    <Button size="small">Registrar</Button>
                    </CardActions>

                </div>
                </CardContent>
            </Card>
        </Box>
    </StyledRegistro>
  );
}
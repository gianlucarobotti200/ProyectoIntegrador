import React from 'react';
import styled from "styled-components"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const StyledRecomendaciones = styled.div `

    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;

.div-h2{
    display: flex;
    justify-content: flex-start;
  }
.div-recomendaciones{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.recomendaciones{
    display: flex;
    justify-content: space-between;
    width: 1330px;
}
`


function Recomendaciones () {
  return (
    <>
    <StyledRecomendaciones>
        <div className='div-recomendaciones'>

        <div className='div-h2'>
            <h2>Recomendaciones</h2>
            
        </div>
        <div className='recomendaciones'>

            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
            </Card>
        </div>
        </div>
    </StyledRecomendaciones>
    </>
  );
}

export default Recomendaciones;
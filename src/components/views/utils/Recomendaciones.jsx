
import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardRecomendacion from './CardRecomendacion';

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
    }
    .img-recomendado{
      width: 100%;
    }

    .card-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }
    
    .card-item {
      width: calc(50% - 8px);
    }

    h6{
      display: flex;
      justify-content: flex-start;
      margin-left: 10px;
    }

    .precio-duracion{
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: space-between; 
    }

    CardContent{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
`

function Recomendaciones () {
  const [data, setData] = useState([]); 

  useEffect(() =>{
    const getTours = async () => {
      try {
        const response = await fetch('http://localhost:8080/tours/todos');
        const jsonData = await response.json();
  
        setData(jsonData);
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    };
    
    getTours();
  }, [])
  console.log(data);

  console.log("Datos obtenidos.");

  return (
    <>

    <StyledRecomendaciones>
      <div className='div-recomendaciones'>
        <div className='div-h2'>
          <h2>Recomendaciones</h2>
        </div>
        <div className='recomendaciones'>
          <div className='card-row'>
            {data.map((tour, index) => (
              <div key={index} className='card-item'>
                <Card>
                  <Typography variant="h6">{tour.titulo}</Typography>
                  <CardMedia
                    component="img"
                    alt={tour.titulo}
                    height="140"
                    image={tour.linkFotos[0]}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {tour.descripcion}
                    </Typography>
                    <div className='precio-duracion'>

                    <Typography variant="body1" color="textPrimary">
                      Precio: ${tour.precio}
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                      Duración: {tour.cantHoras}hs
                    </Typography>
                    </div>

                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StyledRecomendaciones>

    </>
  );
}

export default Recomendaciones;



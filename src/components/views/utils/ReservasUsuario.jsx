import fetchWithToken from '../login/Interceptor'
import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import decodeToken from '../login/DecodeToken';
import RefreshIcon from '@mui/icons-material/Refresh';
import config from '../../../config';

const StyledRecomendaciones = styled.div`

    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    
    .div-recomendaciones{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between; 
      gap: 1px;
      flex-direction: column;
      width: 100%;
      max-width: 1225px;
  }

    .div-h2{
      display: flex;
      justify-content: flex-start;
      text-align: left;
      font-size: 1.2rem;
      margin: 1% 1% 0% 3%;       
      color: #24306E;
      padding: 2% 0% 2% 0%;
      margin: 4% 5% 0% 4%;
      font-weight: bolder;
      font: 2rem/1rem "Open Sans", sans-serif;
      border-bottom: 2px solid rgba(36, 48, 110, 1);
      h2{
        font-size: 1.2rem;
      }
  }

    .recomendaciones{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;  
      margin: 0% 3% 6% 3%;
      padding: 0% 0% 0% 0%;
  }

    .card-row {
      display: flex;
      width: 100%;
      justify-content: center;
      flex-direction: column;
  }
    
    .card-item {
      
      border-radius: 7px;
      box-shadow: #00000033 3px 3px 5px 0px;
      border: 1px solid rgba(230, 230, 230);
      margin-top: 15px;
  }

    .card-img{
      border-radius: 0px;
    }

    .card-title{
      margin: 20px 20px 0px 20px;
      text-align: left;
      font-size: 2rem;
      color: #232323;
      font-weight: bold;
      cursor: pointer
  }

  .card-desc{
    margin: 20px 20px 0px 20px;
    text-align: left;
    font-size: 1rem;
    color: #232323;
}



    .precio-duracion{
      margin: 45px 20px 0px 20px;
      background: #24306E;
      width: fit-content;
      padding: 5px;
      border-radius: 5px;
      color: white;
  }

    .cardContent{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 5% 0% 2% 4%;
      padding: 0% 5% 10% 0%;
      color: rgba(36, 48, 110, 1);
      font-size: 11px;
  }
  .infoReserva{
    display: flex !important;
    align-items: center;
    justify-content: space-between;
  }
  
  .contenedorInfo{
    margin-bottom: 20px;
  }


    @media (max-width: 600px) {

    .recomendaciones{
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
  }
  
    .card-row {
      width: 50vw;   
      justify-content: center;
      flex-direction: column;
      align-items: center;
  }

    .div-h2{
      width: 95vw;
      font-size: 6vw;
      margin: 1% 1% 1% 10%
  }
     
    .card-item {
      display: flex;
      width: calc(70vw);
      justify-content: center;
      margin: 0% 0% 5% -20%;
      padding: 0% 0% 0% 0%;
      border-radius: 5px;
      box-shadow: #80808047 3px 3px 3px 2px;
      border: 1px solid rgba(230, 230, 230);
  }

  .favorite{
    color: gray;
    cursor: pointer;
    font-size: 2rem;
    position: absolute;
    z-index: 2;
    background: white;
    padding: 5px;
    border-radius: 50%;
    border: 1px solid gray;
  }

  
}`

function ReservasUsuario() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const getReservasUsuario = async () => {
      try {
        const idUsuario = decodeToken(localStorage.getItem('token')).id;

        const reservasResponse = await fetchWithToken(`${config.host}/reserva/${idUsuario}`);
        const reservasData = await reservasResponse.json();

        reservasData.sort((a, b) => {
          const dateA = new Date(a.fechaInicio);
          const dateB = new Date(b.fechaInicio);
          return dateA - dateB;
        });
        
        setData(reservasData);
       
      } catch (error) {
        console.error('Error al obtener las reservas del usuario:', error);
        setError('Algo salió mal al obtener las reservas. Vuelve a cargar nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    getReservasUsuario();
  }, []);

  const handleReload = () => {
    setLoading(true);
    setError(null);
    getTours();
  };


  return (
    <StyledRecomendaciones>
      <div className='div-recomendaciones'>
        <div className='div-h2'>
          <h2>Mis reservas</h2>
        </div>
        {!loading && !error && (
          <div className='recomendaciones'>
            <div className='card-row'>

              {data.map((reserva) => (
                <div key={reserva.id} className='card-item'>
                  <Card>
                    <div className='contenedorInfo'>
                      <div className='card-title'>{reserva.tituloTour}</div>
                      <div className='infoReserva'>

                        <div>
                          <div className='card-desc'>Fecha de reserva: {reserva.fechaInicio}</div>
                          <div className='card-desc'>Cantidad de personas: {reserva.cantidadPersonas}</div>
                        </div>

                        <div className='precio-duracion'>Precio de la reserva: ${reserva.precioTotal}</div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </StyledRecomendaciones>
  );
}

export default ReservasUsuario;


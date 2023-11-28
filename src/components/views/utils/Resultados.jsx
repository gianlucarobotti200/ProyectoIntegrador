import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Buscador from './Buscador';

const StyledRecomendaciones = styled.div`

    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    text-align: center;
    
    .div-recomendaciones{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between; 
      gap: 1px;
      flex-direction: column;
  }

    .div-h2{
      display: flex;
      justify-content: flex-start;
      text-align: left;
      font-size: 2vw;
      margin: 1% 1% 0% 3%;       
      color: rgba(36, 48, 110, 1);
  }

    .recomendaciones{
      display: flex;
      width: 90vw;
      flex-wrap: wrap;
      justify-content: space-between;  
      margin: 0% 3% 6% 3%;
      padding: 0% 0% 0% 0%;
  }

    .card-row {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      gap: 8%;        
  }
    
    .card-item {
      display: flex;
      width: calc(39vw - 8px);
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 1% 0% 5% 0%;
      padding: 0% 0% 0% 0%;
      border-radius: 5px;
      box-shadow: #80808047 3px 3px 3px 2px;
      border: 1px solid rgba(230, 230, 230);
  }

    .card-img{
      width: 90%;
      margin: 2% 4% 2% 4%;
      padding: 0% 0% 0% 0%;
  }

    h6{
      display: flex;
      justify-content: flex-start;
      margin-left: 10px;
      text-align: left;
      font-size: 2vw;
      margin: 1% 1% 2% 5%;       
      color: rgba(36, 48, 110, 1);
  }

    .precio-duracion{
      display: flex;
      width: 90%;
      flex-direction: row;
      justify-content: space-between; 
      margin: 3% 2% 1% 1%; 
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
}`

const Resultados = () => {
    const { search } = useParams();
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchTours = async () => {
        try {
          setLoading(true);
          const response = await fetch('http://localhost:8080/tours/todos');
          if (!response.ok) {
            throw new Error(`Error al cargar los tours: ${response.statusText}`);
          }
  
          const data = await response.json();
          const filteredTours = data.filter(
            (tour) =>
              tour.titulo.toLowerCase().includes(search.toLowerCase()) ||
              tour.provincia.toLowerCase().includes(search.toLowerCase())
          );
          setTours(filteredTours);
        } catch (error) {
          console.error('Error fetching tours:', error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchTours();
    }, [search]);
  
    const handleBuscadorChange = (newValue) => {
      // No necesitas hacer nada aquí, ya que la lógica de búsqueda se maneja en el efecto de useEffect
    };
  
    return (
      <StyledRecomendaciones>
        <Buscador value={search} onChange={handleBuscadorChange} />
        <div className='div-recomendaciones'>
          <h2>Resultados para "{search}"</h2>
          {loading ? (
            <div className='loading-container'>
              <CircularProgress color="inherit" />
            </div>
          ) : (
            <div className='recomendaciones'>
              {tours.length > 0 ? (
                <div className='card-row'>
                  {tours.map((tour) => (
                    <div key={tour.id} className='card-item'>
                    <Card>
                      <Typography variant="h6">{tour.titulo}</Typography>
                      <Link to={`/detalles/${tour.id}`}>
                        <CardMedia className='card-img'
                          component="img"
                          alt={tour.titulo}
                          height="140"
                          image={tour.linkFotos[0]}
                        />
                      </Link>
                      <CardContent className='cardContent'>
                        <Typography variant="body3">
                          {tour.descripcion}
                        </Typography >
                        <div className='precio-duracion'>
                          <Typography variant="body1">
                            Precio: $ {tour.precio}
                          </Typography>
                          <Typography variant="body1">
                            Duración: {tour.cantHoras}hs
                          </Typography>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  ))}
                </div>
              ) : (
                <h2>No se encontraron resultados para "{search}"</h2>
              )}
            </div>
          )}
        </div>
      </StyledRecomendaciones>
    );
  };
  
  export default Resultados;
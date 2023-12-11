import fetchWithToken from '../login/Interceptor'
import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import decodeToken from '../login/DecodeToken';
import RefreshIcon from '@mui/icons-material/Refresh';
import config from '../../../config';

const StyledLink = styled(Link)`
  text-decoration: none;
`

const StyledRecomendaciones = styled.div`

    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    
    .div-recomendaciones{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between; 
      width: 90vw;
      gap: 1px;
      flex-direction: column;
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
      border-radius: 20px;
      box-shadow: #80808047 3px 3px 3px 2px;
      border: 1px solid rgba(230, 230, 230);
    }

    h6{
      display: flex;
      justify-content: flex-start;
      margin-left: 10px;
      text-align: left;
      font-size: 2rem;
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

  .cabecera-card{
    display: flex;
    align-items: center;
    justify-content: space-between;
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

function Recomendaciones() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [fetchingFavorite, setFetchingFavorite] = useState(false);


  useEffect(() => {
    const getToursAndFavorites = async () => {
      try {
        const toursResponse = await fetchWithToken(config.host+'/tours/todos');
        const toursData = await toursResponse.json();

        const idUsuario = decodeToken(localStorage.getItem('token')).id;
        const favoritesResponse = await fetchWithToken(`${config.host}/favoritos/buscarFavoritos/${idUsuario}`);
        const favoritesData = await favoritesResponse.json();

        const favoriteIds = {};
        favoritesData.forEach(favorite => {
          favoriteIds[favorite.idTour] = true;
        });

        setData(toursData); 
        setFavorites(favoriteIds);
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        setError('Algo ha salido mal. Vuelve a cargar nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    getToursAndFavorites();
  }, []);

  const handleReload = () => {
    setLoading(true);
    setError(null);
    getTours();
  };

  console.log(data);
  console.log('Datos obtenidos.');

  const handleFavoriteToggle = async (idTour) => {
    try {
      const idUsuario = decodeToken(localStorage.getItem('token')).id;
      let response;

      setFetchingFavorite((prevFetching) => ({
        ...prevFetching,
        [idTour]: true, // Establecer fetching para la tarjeta específica en true al hacer clic
      }));

      if (favorites[idTour]) {
        response = await fetchWithToken(`${config.host}/favoritos/eliminarFavoritos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idUsuario: idUsuario,
            idTour: idTour,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al eliminar de favoritos');
        }
      } else {
        response = await fetchWithToken(`${config.host}/favoritos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idUsuario: idUsuario,
            idTour: idTour,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al marcar como favorito');
        }
      }

      setFavorites((prevFavorites) => {
        const updatedFavorites = { ...prevFavorites };
        updatedFavorites[idTour] = !updatedFavorites[idTour];
        return updatedFavorites;
      });

      setFetchingFavorite((prevFetching) => ({
        ...prevFetching,
        [idTour]: false,
      }));

    } catch (error) {
      console.error('Error al manejar favorito:', error);
      setFetchingFavorite((prevFetching) => ({
        ...prevFetching,
        [idTour]: false,
      }));
    }
  };

  const truncateDescription = (description) => {
    const itinerarioIndex = description.indexOf('Itinerario');

    if (itinerarioIndex !== -1) {
      return description.substring(0, itinerarioIndex);
    } else if (description == null) {
      return "No contiene descripción";
    } else{
      return description;
    }
  };

  return (
    <StyledRecomendaciones>
      <div className='div-recomendaciones'>
        <div className='div-h2'>
          <h2>Recomendaciones</h2>
        </div>
        {loading ? (
          <div className='loading-container' >
            <CircularProgress color="inherit" />
          </div>
        ) : error ? (
          <div className='error-container'>
            <p>{error}</p>
            <RefreshIcon onClick={handleReload} />
          </div>
        ) : (
          <div className='recomendaciones'>
            <div className='card-row'>
              {data.map((tour) => (
                  <div key={tour.id} className='card-item'>
                    <Card>
                      <div className='cabecera-card'>
                        <StyledLink  to={`/detalles/${tour.id}`}><Typography variant="h6">{tour.titulo}</Typography></StyledLink>
                        {fetchingFavorite[tour.id] ? (
                          <CircularProgress size={23} style={{ color: 'gray', cursor: 'default' }} />
                        ) : (
                          favorites[tour.id] ? (
                            <FavoriteIcon
                              style={{ color: 'red', cursor: 'pointer', margin: "0 2rem", fontSize: "2rem" }}
                              onClick={() => handleFavoriteToggle(tour.id)}
                            />
                          ) : (
                            <FavoriteBorderIcon
                              style={{ color: 'gray', cursor: 'pointer', margin: "0 2rem", fontSize: "2rem" }}
                              onClick={() => handleFavoriteToggle(tour.id)}
                            />
                          )
                        )}

                      </div>
                      <CardMedia className='card-img'
                        component="img"
                        alt={tour.titulo}
                        height="140"
                        image={tour.linkFotos[0]}
                      />
                      <CardContent className='cardContent'>
                        <Typography variant="body3" sx={{ fontSize: "1.3rem" }}>{truncateDescription(tour.descripcion)}</Typography>
                        <div className='precio-duracion'>
                          <Typography variant="body1" sx={{ fontWeight: "bolder", fontSize: "1.5rem" }}>$ {tour.precio} c/u</Typography>
                        </div>
                      </CardContent>
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

export default Recomendaciones;

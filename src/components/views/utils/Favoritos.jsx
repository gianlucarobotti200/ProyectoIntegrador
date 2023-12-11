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
import config from '../../../config';

const StyledLink = styled(Link)`
  text-decoration: none;
`

const StyledFavoritos = styled.div`

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
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card-item {
  display: flex;
  width: calc(50% - 16px);
  flex-wrap: wrap;
  justify-content: space-between;
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
  margin-top: 45px;
  margin-left: 20px;
  margin-bottom: 20px;
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

.cabecera-card{
  position: relative
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

function Favoritos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [fetchingFavorite, setFetchingFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getFavoriteTours = async () => {
      try {
        
        const idUsuario = decodeToken(localStorage.getItem('token')).id;
        const favoritesResponse = await fetchWithToken(`${config.host}/favoritos/buscarFavoritos/${idUsuario}`);
        const favoritesData = await favoritesResponse.json();

        const favoriteIds = {};
        favoritesData.forEach(favorite => {
          favoriteIds[favorite.idTour] = true;
        });

        setFavorites(favoriteIds);

        // Filtrar solo los tours que están marcados como favoritos
        const favoriteTours = await Promise.all(favoritesData.map(async (favorite) => {
          const tourResponse = await fetchWithToken(`${config.host}/tours/${favorite.idTour}`);
          const tourData = await tourResponse.json();
          return tourData;
        }));

        setData(favoriteTours);
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      } finally {
        setLoading(false);
      }
    };

    getFavoriteTours();
  }, []);

  const handleFavoriteToggle = async (idTour) => {
    try {
      const idUsuario = decodeToken(localStorage.getItem('token')).id;
      let response;

      setFetchingFavorite((prevFetching) => ({
        ...prevFetching,
        [idTour]: true,
      }));

      if (favorites[idTour]) {
        // Eliminar de favoritos
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
      } else {
        // Agregar a favoritos
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
      }

      if (!response.ok) {
        throw new Error('Error al manejar favorito');
      }

      // Actualizar lista de tours favoritos después de cambiar el estado del favorito
      const favoritesResponse = await fetchWithToken(`${config.host}/favoritos/buscarFavoritos/${idUsuario}`);
      const updatedFavoritesData = await favoritesResponse.json();

      const updatedFavoriteIds = {};
      updatedFavoritesData.forEach((favorite) => {
        updatedFavoriteIds[favorite.idTour] = true;
      });

      setFavorites(updatedFavoriteIds);

      // Filtrar y actualizar los tours marcados como favoritos
      const favoriteTours = await Promise.all(updatedFavoritesData.map(async (favorite) => {
        const tourResponse = await fetchWithToken(`${config.host}/tours/${favorite.idTour}`);
        const tourData = await tourResponse.json();
        return tourData;
      }));

      setData(favoriteTours);
      console.log(data);

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
    }
    return description;
  };

  const handleClickNavigate = (tour) => {
    
    navigate(`/detalles/${tour.id}`);
  };

  return (
    <StyledFavoritos>
      <div className='div-recomendaciones'>
      <div className='div-h2'>
          <h2>Mis favoritos</h2>
        </div>
        {loading ? (
          <div className='loading-container' style={{paddingTop: "15%"}}>
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <div className='recomendaciones'>
            <div className='card-row'>
              {data && data.map((tour) => (
                
                  <div className='card-item' key={tour.id}>
                    <Card>
                      <div className='cabecera-card'>
                        
                        {fetchingFavorite[tour.id] ? (
                          <CircularProgress size={23} style={{ color: 'gray', cursor: 'default' }} />
                        ) : (
                          favorites[tour.id] ? (
                            <FavoriteIcon
                            style={{
                              color: 'red',
                              cursor: 'pointer',
                              fontSize: '1.2rem',
                              position: 'absolute',
                              background: 'white',
                              padding: '5px',
                              borderRadius: '50%',
                              right: '5px',
                              top: '5px',
                              boxShadow: '0px 3px 7px #00000085',
                            }}
                              onClick={() => handleFavoriteToggle(tour.id)}
                            />
                          ) : (
                            <FavoriteBorderIcon
                            style={{
                              color: 'gray',
                              cursor: 'pointer',
                              fontSize: '1.2rem',
                              position: 'absolute',
                              zIndex: 2,
                              background: 'white',
                              padding: '5px',
                              borderRadius: '50%',
                              boxShadow: '0px 3px 7px #00000085',
                              right: 5,
                              top: 5
                            }}
                              onClick={() => handleFavoriteToggle(tour.id)}
                            />
                          )
                        )}

                      </div>
                      {/* <StyledLink to={`/detalles/${tour.id}`}> */}
                      <CardMedia className='card-img'
                        component="img"
                        alt={tour.titulo}
                        height="190"
                        image={tour.linkFotos[0]}
                      />
                      {/* </StyledLink> */}
                      {/* <CardContent className='cardContent'>
                        <Typography variant="body3" sx={{ fontSize: "1.3rem" }}>{truncateDescription(tour.descripcion)}</Typography>
                        <div className='precio-duracion'>
                          <Typography variant="body1" sx={{ fontWeight: "bolder", fontSize: "1.5rem" }}>$ {tour.precio}</Typography>
                        </div>
                      </CardContent> */}
                      <div onClick={() => handleClickNavigate(tour)}  className='card-title'>
                        {tour.titulo}
                      </div>

                      <div class="card-desc">
                        {truncateDescription(tour.descripcion)}
                      </div>

                      <div className='precio-duracion'>
                        $ {tour.precio} por persona
                      </div>

                    </Card>
                  </div>
                
              ))}
            </div>
          </div>
        )}
      </div>
    </StyledFavoritos>
  );
}


export default Favoritos;
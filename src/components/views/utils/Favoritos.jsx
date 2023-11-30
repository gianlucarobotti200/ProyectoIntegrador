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

const StyledRecomendaciones = styled.div `

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
  }

    .div-h2{
      display: flex;
      justify-content: flex-start;
      text-align: left;     
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

function Favoritos() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState({});
    const [fetchingFavorite, setFetchingFavorite] = useState(false);
  
    useEffect(() => {
      const getFavoriteTours = async () => {
        try {
          const idUsuario = decodeToken(localStorage.getItem('token')).id;
          const favoritesResponse = await fetchWithToken(`http://localhost:8080/favoritos/buscarFavoritos/${idUsuario}`);
          const favoritesData = await favoritesResponse.json();
    
          const favoriteIds = {};
          favoritesData.forEach(favorite => {
            favoriteIds[favorite.idTour] = true;
          });
    
          setFavorites(favoriteIds);
  
          // Filtrar solo los tours que están marcados como favoritos
          const favoriteTours = await Promise.all(favoritesData.map(async (favorite) => {
            const tourResponse = await fetchWithToken(`http://localhost:8080/tours/${favorite.idTour}`);
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
            response = await fetchWithToken(`http://localhost:8080/favoritos/eliminarFavoritos`, {
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
            response = await fetchWithToken(`http://localhost:8080/favoritos`, {
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
          const favoritesResponse = await fetchWithToken(`http://localhost:8080/favoritos/buscarFavoritos/${idUsuario}`);
          const updatedFavoritesData = await favoritesResponse.json();
      
          const updatedFavoriteIds = {};
          updatedFavoritesData.forEach((favorite) => {
            updatedFavoriteIds[favorite.idTour] = true;
          });
      
          setFavorites(updatedFavoriteIds);
      
          // Filtrar y actualizar los tours marcados como favoritos
          const favoriteTours = await Promise.all(updatedFavoritesData.map(async (favorite) => {
            const tourResponse = await fetchWithToken(`http://localhost:8080/tours/${favorite.idTour}`);
            const tourData = await tourResponse.json();
            return tourData;
          }));
      
          setData(favoriteTours);
      
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
      

//   const handleFavoriteToggle = async (idTour) => {
//     try {
//       const idUsuario = decodeToken(localStorage.getItem('token')).id;
//       let response;
  
//       if (favorites[idTour]) {
        
//         response = await fetchWithToken(`http://localhost:8080/favoritos/eliminarFavoritos`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             idUsuario: idUsuario,
//             idTour: idTour,
//           }),
          
//         });

  
//         if (!response.ok) {
//           throw new Error('Error al eliminar de favoritos');
//         }

//         const favoritesResponse = await fetchWithToken(`http://localhost:8080/favoritos/buscarFavoritos/${idUsuario}`);
//         const favoritesData = await favoritesResponse.json();

//         const favoriteIds = {};
//         favoritesData.forEach(favorite => {
//           favoriteIds[favorite.idTour] = true;
//         });
  
//         setFavorites(favoriteIds);

//         // Filtramos nuevamente los tours según los favoritos actualizados
//         const favoriteTours = await Promise.all(favoritesData.map(async (favorite) => {
//           const tourResponse = await fetchWithToken(`http://localhost:8080/tours/${favorite.idTour}`);
//           const tourData = await tourResponse.json();
//           return tourData;
//         }));
  
//         setData(favoriteTours);

//       } else {
//         response = await fetchWithToken(`http://localhost:8080/favoritos`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             idUsuario: idUsuario,
//             idTour: idTour,
//           }),
//         });
  
//         if (!response.ok) {
//           throw new Error('Error al marcar como favorito');
//         }
//       }
  
//       setFavorites((prevFavorites) => {
//         const updatedFavorites = { ...prevFavorites };
//         updatedFavorites[idTour] = !updatedFavorites[idTour];
//         return updatedFavorites;
//       });
  
//     } catch (error) {
//       console.error('Error al manejar favorito:', error);
//     }
//   };
  

  return (
    <StyledRecomendaciones>
      <div className='div-recomendaciones'>
        <div className='div-h2'>
          <h2>Mis favoritos</h2>
        </div>

        {loading ? ( 
          <div className='loading-container'>
            <CircularProgress color="inherit" style={{position: "absolute", top: "95%", right: "50%"}}/>
          </div>
        ) : (
          <div className='recomendaciones'>
            <div className='card-row'>
              {data.map((tour, index) => (
                <div key={index} className='card-item'>
                  <Card>
                    <div className='cabecera-card'>
                      <Typography variant="h6">{tour.titulo}</Typography>
                      {fetchingFavorite[tour.id] ? (
                      <CircularProgress size={23} style={{ color: 'gray', cursor: 'default' }} />
                      ) : (
                        favorites[tour.id] ? (
                          <FavoriteIcon
                            style={{ color: 'red', cursor: 'pointer' }}
                            onClick={() => handleFavoriteToggle(tour.id)}
                          />
                        ) : (
                          <FavoriteBorderIcon
                            style={{ color: 'gray', cursor: 'pointer' }}
                            onClick={() => handleFavoriteToggle(tour.id)}
                          />
                        )
                      )}

                    </div>
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
          </div>
        )}
      </div>
    </StyledRecomendaciones>
  );
}


export default Favoritos;

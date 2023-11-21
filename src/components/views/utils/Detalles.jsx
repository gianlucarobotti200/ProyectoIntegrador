import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const StyledDetalles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  section{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .description{
    text-align: center;
    margin: 2rem 20%
  }
`

const StyledImageList = styled(ImageList)`
  
`

const Detalles = () => {
  const [tourDetails, setData] = useState([]);
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  const openGallery = () => {
    setSelectedImage([...tourDetails.linkFotos]);
  };

  useEffect(() => {
    const getTourDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/tours/${id}`);
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    getTourDetails();
  }, [id]);

  const closeGallery = () => {
    setSelectedImage(null);
  };

  return (
    <StyledDetalles>
      <h2 className="h2-title">{tourDetails.titulo}</h2>
      {tourDetails.linkFotos && tourDetails.linkFotos.length > 0 && (
        <StyledImageList sx={{ width: '70%', height: 'auto', margin: 'auto' }} cols={2} rowHeight={300}>
          <ImageListItem style={{ width: '100%', height: '100%' }} onClick={openGallery}>
            <img src={tourDetails.linkFotos[0]} alt="" />
          </ImageListItem>
          <Grid container spacing={2}>
            {tourDetails.linkFotos.slice(1, 5).map((imageSrc, index) => (
              <ImageListItem
                key={index}
                style={{ width: '50%', height: '50%' }}
                onClick={() => setSelectedImage([...tourDetails.linkFotos.slice(1, 5)])}
              >
                <img src={imageSrc} alt="" />
              </ImageListItem>
            ))}
          </Grid>
        </StyledImageList>
      )}
      <p className="description">{tourDetails.descripcion}</p>
      <p className="price">{"$ " + tourDetails.precio}</p>
      <section>
        <div>
          <Stack direction="row" spacing={1}>
            <h6>Características:</h6>
            {tourDetails.caracteristicas &&
              tourDetails.caracteristicas.map((caracteristica) => (

                <Chip key={caracteristica.id} label={caracteristica.nombre} variant="outlined" />

              ))}
          </Stack>
        </div>
        <div>
          <Stack direction="row" spacing={1}>
            <h6>Características:</h6>
            {tourDetails.categorias &&
              tourDetails.categorias.map((categoria) => (
                <Chip key={categoria.id} label={categoria.nombre} />
              ))}
          </Stack>
        </div>
      </section>

    </StyledDetalles>
  );
};

export default Detalles;
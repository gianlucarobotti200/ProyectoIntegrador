import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';

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

const ImageModal = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  return (
    <Modal open={true} onClose={onClose}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <img
          src={images[currentIndex]}
          alt=""
          style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
        />
        <button onClick={prevImage}>Anterior</button>
        <button onClick={nextImage}>Siguiente</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </Modal>
  );
};
const Detalles = () => {
  const [tourDetails, setData] = useState([]);
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openGallery = () => {
    setSelectedImage([...tourDetails.linkFotos]);
    setIsModalOpen(true);
  };

  const closeGallery = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
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



  return (
    <StyledDetalles>
      <h2 className="h2-title">{tourDetails.titulo}</h2>
      {tourDetails.linkFotos && tourDetails.linkFotos.length > 0 && (
        <StyledImageList sx={{ width: '70%', height: 'auto', margin: 'auto' }} cols={2} rowHeight={600} onClick={openGallery}>
          <ImageListItem style={{ width: '100%', height: '100%' }} >
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
          {isModalOpen && (
        <ImageModal images={tourDetails.linkFotos} />
      )}
        </StyledImageList >
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
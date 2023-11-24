import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faSquareTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';



const StyledDetalles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;

  section{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .description{
    text-align: center;
    margin: 2rem 20%;
    color: #24306E;
    font-weight: bolder;
  }
  
  .h2-title{
    color: #24306E;
    background-color: #F1F2ED;
    padding: 2rem 0;
    margin: 0 0 2rem 0;
    font-weight: bolder;
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
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: "flex" }}>
        <ArrowBackIosIcon style={{ color: 'white', position: 'absolute', top: '50%', transform: 'translate(-60%, -50%)' }} onClick={prevImage} />
        <img
          src={images[currentIndex]}
          alt=""
          style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', width: '70vw' }}
        />
        <ArrowForwardIosIcon style={{ color: 'white', position: 'absolute', top: '50%', left: '100%', transform: 'translate(-10%, -50%)' }} onClick={nextImage} />
        <CloseIcon style={{ color: 'white', position: 'absolute', left: '100%', transform: 'translate(0%, -80%)' }} onClick={onClose} />
      </div>
    </Modal>
  );
};

const Detalles = () => {
  const [tourDetails, setData] = useState([]);
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    getTourDetails();
  }, [id]);

  const handleTwitterShare = () => {
    const shareText = `Descubre el tour "${tourDetails.titulo}" en ${tourDetails.provincia}. ¡Una experiencia única por solo $${tourDetails.precio}! #SectArg #Tour`;
    const shareUrl = `http://localhost:5173/detalles/${tourDetails.id}`;
    const imageUrl = tourDetails.linkFotos && tourDetails.linkFotos.length > 0 ? tourDetails.linkFotos[0] : '';

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(imageUrl)}&data-card2=true`;


    window.open(twitterUrl, '_blank');
  };

  return (
    <StyledDetalles>
      {loading ? (
        <div className="loading-container">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <><div style={{display:'flex'}}>
          <h2 className="h2-title">{tourDetails.titulo}</h2>
            <div>
            <FontAwesomeIcon icon={faShareNodes} style={{ color: "#1d5cc9" }} />
            </div>        
            <div onClick={handleTwitterShare}><FontAwesomeIcon icon={faFacebook} /></div>
            
              <div className="fb-share-button"
                data-href={`https://tu-sitio-web.com/detalles/${tourDetails.id}`}
                data-layout=""
                data-size="">
                <a target="_blank"
                  href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftu-sitio-web.com%2Fdetalles%2F${tourDetails.id}&amp;src=sdkpreparse`}
                  className="fb-xfbml-parse-ignore">
                  <FontAwesomeIcon icon={faSquareTwitter} style={{color: "#557ab9",}} />
                </a>
              </div>
            <a href={`https://wa.me/?text=Hola%20te%20comparto%20este%20tour%20a%20${tourDetails.provincia}%20por%20${tourDetails.precio}%20`} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} style={{ color: "#15933b" }} />
            </a>
          </div>
          {tourDetails.linkFotos && tourDetails.linkFotos.length > 0 && (
            <StyledImageList
              sx={{ width: "70%", height: "auto", margin: "auto" }}
              cols={2}
              rowHeight={600}
              onClick={openGallery}
            >
              <ImageListItem style={{ width: "100%", height: "100%" }}>
                <img
                  src={tourDetails.linkFotos[0]}
                  alt=""
                  style={{ borderRadius: "8px" }}
                />
              </ImageListItem>
              <Grid container spacing={2}>
                {tourDetails.linkFotos.slice(1, 5).map((imageSrc, index) => (
                  <ImageListItem
                    key={index}
                    style={{ width: "50%", height: "50%" }}
                    onClick={() => setSelectedImage([...tourDetails.linkFotos.slice(1, 5)])}
                  >
                    <img
                      src={imageSrc}
                      alt=""
                      style={{ borderRadius: "8px" }}
                    />
                  </ImageListItem>
                ))}
              </Grid>
              {isModalOpen && (
                <ImageModal images={tourDetails.linkFotos} onClose={closeGallery} />
              )}
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
          <Button style={{ margin: "0 45vw" }} variant="contained">
            RESERVAR
          </Button>
        </>
      )}
    </StyledDetalles>
  );
};

export default Detalles;
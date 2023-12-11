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
import fetchWithToken from '../login/Interceptor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faSquareTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import config from '../../../config';

const StyledDetalles = styled.div`

  .div-modal1 {

  }
 
  .cont-icons {
      display: flex;
      width: 15vw;
      height: 2vh;
      flex-wrap: nowrap;
      justify-content: space-between;
      margin: 2% 2% 2% 3%;
      padding: 1% 1% 0% 1%;
      border-radius: 5px;
    }

  .h2-title {
    /* Estilos para el título */
    color: #24306E;
    padding: 2% 0% 2% 0%;
    margin: 2% 9% 3% 12%;
    font-weight: bolder;
    font: 2rem/1rem "Open Sans", sans-serif;
    border-bottom: 2px solid rgba(36, 48, 110, 1);
  }

  .contenedor-img-ppal {
    display: flex;
    width: 90vw;
    height: 90vh;
    padding: 0% 1% 0% 0%;
    margin: -2.2% 1.5% 1% 0%;
  }

  .img-ppal {
    display: flex;
    width: 50vw;
    height: 95vh;
    padding: 0% 0% 0% 1%;
    margin: 0% 0% 0% 0%;
    border-radius: 2%;
    box-shadow: #80808047 3px 3px 3px 2px;
    border: 1px solid rgba(230, 230, 230);
  }

  .contenedor-imgs {
    display: flex;
    width: 85vw;
    height: 80vh;
    padding: 3% 0% 1% 0%;
    margin: 1% 0% 1% 9%;
  }

  .img-list {
    display: flex;
    width: 17vw;
    height: 17vh;
    padding: 0% 0% 2% 2%;
    margin: 0% 0% 0% 0%;
  }

  .img-unit {
    border-radius: 3%;
    box-shadow: #80808047 3px 3px 3px 2px;
    border: 1px solid rgba(230, 230, 230);
  }

  .h2-caracteristicas {
    color: #24306E;
    padding: 2% 0% 2% 0%;
    margin: 2% 9% 3% 12%;
    font-weight: bolder;
    font: 2rem/1rem "Open Sans", sans-serif;
    border-bottom: 2px solid rgba(36, 48, 110, 1);
  }

  .price {
    display: flex;
    font-size: 1.2rem;
    width: 12em;
    height: 2em;
    margin: 1% 5% 0% 20%;
  }

  .btn-reservar {
    display: flex;
    justify-content: center;
    align-items: center;
    text-aling: right;
    font-size: 1rem;
    background-color: #B3D6E1;
    width: 10em;
    height: 2em;
    padding: 1%;
    margin: -4% 0% 0% 62%;
    border-radius: 5px;
  }

  .button btn-reservar:hover {
    border-color: 2px #79B1D6;
 }

  /* Contenedor principal */
    display: flex;
    flex-direction: column;
    width: 95%;
    margin-bottom: 2rem;

  section {
    display: flex;
    justify-content: left;
    width: 90vw;
   
  }

  .description {
    text-align: left;
    margin: 2rem 20%;
    color: #24306E;
    font-weight: bolder;
  }

  .politicas {
    display: flex;
    font: 1.9rem/1rem "Open Sans", sans-serif;
    align-items: center;
    text-align: center; 
    padding: 5% 0% 1% 0%;
    margin: 0% 5% 1% 45%;
    border-bottom: 3px solid rgba(36, 48, 110, 1);
  }

  ul {
    /* Estilos para las listas */
    display: flex;
    margin: auto 0;
    
  }

  .li-fecha,
  .li-noIncluido,
  .li-documentacion {
    /* Estilos comunes para los elementos de la lista */
    display: flex;
    width: 24%;
    align-items: center;
    text-align: center; 
    padding: 4% 0% 1% 1%;
    margin: 0% 6% 2% 5%;
    border-bottom: 2px solid rgba(36, 48, 110, 1);
  }

  .li-fecha1,
  .li-noIncluido1,
  .li-documentacion1 {
    /* Estilos comunes para otros elementos de la lista */
    display: flex;
    width: 24%; 
    text-align: left;
    padding: 1% 0% 0% 0%;
    margin: 0% 3% 0% 6%;
    
  .cont-icons {
    display: flex;
    width: calc(15vw - 15px);
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 2% 10% 0% 2%;
    padding: 0% 0% 0% 0%;
    border-radius: 5px;
    
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
    <StyledDetalles>
      <Modal open={true} onClose={onClose}>
        <div className='div-modal1' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: "flex" }}>
          <ArrowBackIosIcon style={{ color: 'white', position: 'absolute', top: '50%', transform: 'translate(-60%, -50%)' }} onClick={prevImage} />
          <img
            src={images[currentIndex]}
            alt=""
            style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '1px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', width: '80vw' }}
          />
          <ArrowForwardIosIcon style={{ color: 'white', position: 'absolute', top: '50%', left: '100%', transform: 'translate(-10%, -50%)' }} onClick={nextImage} />
          <CloseIcon style={{ color: 'white', position: 'absolute', left: '100%', transform: 'translate(0%, -80%)' }} onClick={onClose} />
        </div>
      </Modal>
    </StyledDetalles>
  );
};

const Detalles = () => {
  const [tourDetails, setData] = useState([]);
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [politicasData, setPoliticasData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReservaOpen, setIsReservaOpen] = useState(false);
  const [calificacion, setCalificacion] = useState(0);

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
        const response = await fetchWithToken(`${config.host}/tours/${id}`);
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
          setPoliticasData(jsonData.politicas);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    const getCalificacion = async () => {
      try {
        const response = await fetchWithToken(`${config.host}/api/tours/${id}/calificacion`);
        if (response.ok) {
          const calificacion = await response.json();
          setCalificacion(calificacion);
        }
      } catch (error) {
        console.error("Error al obtener la calificación:", error);
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
  const handleReserveClick = () => { 
  setIsReservaOpen(true);
  };

  return (
    <StyledDetalles>
      {loading ? (
        <div className="loading-container">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div>
          <div className='cont-icons'>
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
                <FontAwesomeIcon icon={faSquareTwitter} style={{ color: "#557ab9", }} />
              </a>
            </div>
            <a href={`https://wa.me/?text=Hola%20te%20comparto%20este%20tour%20a%20${tourDetails.provincia}%20por%20${tourDetails.precio}%20`} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} style={{ color: "#15933b" }} />
            </a>
          </div>
          <h2 className="h2-title">{tourDetails.titulo}</h2>
          {tourDetails.linkFotos && tourDetails.linkFotos.length > 0 && (
            <StyledImageList
              className='contenedor-imgs'
              onClick={openGallery}
            >
              <ImageListItem className='contenedor-img-ppal' >
                <img className='img-ppal'
                  src={tourDetails.linkFotos[0]}
                />
              </ImageListItem>
              <Grid container spacing={2}>
                {tourDetails.linkFotos.slice(1, 5).map((imageSrc, index) => (
                  <ImageListItem className='img-list'
                    key={index}
                    onClick={() => setSelectedImage([...tourDetails.linkFotos.slice(1, 5)])}
                  >
                    <img className='img-unit'
                      src={imageSrc}
                    />
                  </ImageListItem>
                ))}
              </Grid>
              {isModalOpen && (
                <ImageModal images={tourDetails.linkFotos} onClose={closeGallery} />
              )}
            </StyledImageList>
          )}
          <h2 className='h2-caracteristicas'>Características</h2>
          <p className="description">{tourDetails.descripcion}</p>
          <p className="price">{"Precio: $ " + tourDetails.precio}</p>
          <section>
            <div>
              <Stack>
                {tourDetails.caracteristicas &&
                  tourDetails.caracteristicas.map((caracteristica) => (
                    <Chip key={caracteristica.id} label={caracteristica.nombre} variant="outlined" icon={<img src={caracteristica.icono} alt="Icono de característica" style={{width: "1.2rem"}}/>}/>
                  ))}
              </Stack>
            </div>
            <div>
              <Stack>
                {tourDetails.categorias &&
                  tourDetails.categorias.map((categoria) => (
                    <Chip key={categoria.id} label={categoria.nombre}  />
                  ))}
              </Stack>
            </div>
          </section>
          <Link to={`/reservartour/${id}`}>
          <Button className='btn-reservar'>
            RESERVAR
          </Button>
          </Link>
          <div>
          <h3 className='politicas'>Políticas</h3>
          <ul>
            {politicasData.map((politica, index) => (
              <li key={index}>
                <strong>{politica.nombre}</strong>: {politica.contenido}
              </li>
            ))}
          </ul>
        </div>
        </div>
      )
      }
    </StyledDetalles>
  )
}
export default Detalles;
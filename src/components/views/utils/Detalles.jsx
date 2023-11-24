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

const StyledDetalles = styled.div`

  .div-modal1 {

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
    margin: -1.7% 1% 1% 0%;
  }

  .img-ppal {
    display: flex;
    width: 50vw;
    height: 90vh;
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
    width: 27%;
    align-items: center;
    text-align: center; 
    padding: 3% 0% 0% 0%;
    margin: 0% 5% 1% 5%;
    border-bottom: 2px solid rgba(36, 48, 110, 1);
  }

  .li-fecha1,
  .li-noIncluido1,
  .li-documentacion1 {
    /* Estilos comunes para otros elementos de la lista */
    display: flex;
    width: 27%; 
    text-align: left;
    padding: 1% 0% 1% 0%;
    margin: 0% 5% 1% 5%;
  }
`;


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
        <ArrowBackIosIcon style={{ color: 'white', position: 'absolute', top: '50%', transform: 'translate(-60%, -50%)'}} onClick={prevImage}/>
        <img
          src={images[currentIndex]}
          alt=""
          style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '1px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', width: '80vw'}}
        />
        <ArrowForwardIosIcon style={{ color: 'white', position: 'absolute', top: '50%', left: '100%', transform: 'translate(-10%, -50%)'}} onClick={nextImage}/>
        <CloseIcon style={{ color: 'white', position: 'absolute', left: '100%', transform: 'translate(0%, -80%)'}} onClick={onClose} />
      </div>
    </Modal>
    </StyledDetalles>
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

  return (
    <StyledDetalles>
      {loading ? (
        <div className="loading-container">
          <CircularProgress color="inherit"/>
        </div>
      ) : (
        <>
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
                    <Chip key={caracteristica.id} label={caracteristica.nombre} variant="outlined" />
                  ))}
              </Stack>
            </div>
            
          </section>
          <Button className='btn-reservar'>
            RESERVAR
          </Button>
          <div>
              <Stack direction="row" spacing={1}>
                <h3 className='politicas'>Políticas</h3>            
                <p>{tourDetails.politicas}</p>
              </Stack>
            </div>
          <ul className='ul-politicas'>
                  <li className='li-fecha'>Fecha tope</li>
                  <li className='li-noIncluido'>No incluido</li>
                  <li className='li-documentacion'>Documentación</li>      
          </ul>
                  
          <ul>
                  <li className='li-fecha1'>
                  El tour tiene fecha tope de saldo: 15 días antes de la fecha de salida seleccionada en su reserva
                   (pasado dicho plazo se dará de baja a la reserva sin derecho a reembolso o reclamo alguno).
                  </li>
                 
                  <li className='li-noIncluido1'>
                   NO incluye entradas a Museos, Parques Nacionales, medios de elevación, actividades de montaña, etc
                   No incluye canon turístico BUS 2023 ($ 3500 se abona al momento de embarcar) 
                   No incluye Honorarios guías locales / parques nacionales BUS ($ 3500 se abona al momento de embarcar) 
                  </li>
                 
                  <li className='li-documentacion1'>
                  La documentación (DNI/Pasaportes/Visas/Permisos de Menores) es exclusiva responsabilidad de los pasajeros.
                   La misma debe estar en regla y en excelente estado para poder transitar dentro de nuestras fronteras o salir del país.  
                   En caso de no tenerla correctamente, los gastos que existieran correrán por cuenta de los pasajeros.
                  </li>
          </ul>
        </>
      )}
    </StyledDetalles>
  );
};

export default Detalles;
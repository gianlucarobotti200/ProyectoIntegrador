import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid, Paper } from '@mui/material';
import BasicDatePicker from './Calendar'
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
import moment from 'moment';
import TextField from '@mui/material/TextField';
import decodeToken from '../login/DecodeToken';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledDetalles = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;



  .container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 80%;
  }

  .descripcion{
    text-align: left;
  }

  .titulos{
    display: flex;
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


  .price {
      background: #24306E;
      width: fit-content;
      padding: 5px;
      border-radius: 5px;
      color: white;
  }

  .total{
    margin-top: 5px;
    background: #8db0ce;
    padding: 5px;
    border-radius: 5px;
    color: white;
  }

  .especificaciones{
    display: flex;
    align-items: center;
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

  .politicas {
    display: flex;
    font: 1.9rem/1rem "Open Sans", sans-serif;
    align-items: center;
    text-align: center; 
    padding: 5% 0% 1% 0%;
    margin: 0% 5% 1% 45%;
    border-bottom: 3px solid rgba(36, 48, 110, 1);
  }


  .cont-icons {
    display: flex;
    width: calc(15vw - 15px);
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 2% 10% 0% 2%;
    padding: 0% 0% 0% 0%;
    border-radius: 5px;
    
  }

  .cont{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%
  }
`

const calcularDiasEntreFechas = (fechaInicio, fechaFin) => {
  const fechas = [];
  let fechaActual = moment(fechaInicio);

  while (fechaActual.isSameOrBefore(fechaFin, 'day')) {
    fechas.push(fechaActual.format('YYYY-MM-DD'));
    fechaActual.add(1, 'day');
  }

  return fechas;
};



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
  const [personas, setPersonas] = useState("1");
  const [total, setTotal] = useState(0);
  const [fecha, setFecha] = useState(null);
  const [reservaStatus, setReservaStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });
  const [usuarioData, setUsuarioData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [datosUsuarioListos, setDatosUsuarioListos] = useState(false);
  const [fechas, setFechas] = useState([]);
  const navigate = useNavigate();

  // Suponiendo que obtienes fechaInicio y fechaFin de un endpoint
  const obtenerFechasDesdeEndpoint = async () => {
    try {
      const response = await fetchWithToken(`${config.host}/reserva/fechasOcupadas/${id}`);
    
      if (response.ok) {
        
        const fechasOcupadas = await response.json();
        const ocupadas = []
        for (let i = 0; i < fechasOcupadas.length; i++) {
          const e = fechasOcupadas[i];
          const fechaInicio = e.fechaInicio
          const fechaFin = e.fechaFin
          const fechasCalculadas = calcularDiasEntreFechas(fechaInicio, fechaFin);
          for (let j = 0; j < fechasCalculadas.length; j++) {
            const fecha = fechasCalculadas[j];
            if(!ocupadas.includes(fecha)){
              ocupadas.push(fecha)
            }
          }
        }
        setFechas(ocupadas)
        
        
        
        
      }
    } catch (error) {
      console.error('Error al obtener fechas:', error);
    }
  };

  useEffect(() => {
    obtenerFechasDesdeEndpoint();
  }, []);

  const obtenerDetallesUsuario = async (userId) => {
    try {
      const response = await fetchWithToken(`${config.host}/user/getusuario/${userId}`);
      if (response.ok) {
        const usuarioData = await response.json();
        setUsuarioData(usuarioData); 
        setDatosUsuarioListos(true);
        return usuarioData; 
      }
    } catch (error) {
      console.error('Error al obtener detalles del usuario:', error);
    }
    return null;
  };
  
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
          setTotal(jsonData.precio)
          setPoliticasData(jsonData.politicas);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    getTourDetails();
    getCalificacion();
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

  const handleDateChange = (date) => {
    const currentDate = date.toISOString().split("T")[0];
    setFecha(currentDate)

};

const handleInputPersonas = (event) => {
  const value = event.target.value;
  setPersonas(value);
  setTotal(tourDetails.precio * value)
  
}

const reservar = async () => {
  setReservaStatus({ loading: true, success: false, error: false });

  const clienteID = decodeToken(localStorage.getItem('token')).id;

  const reservaData = {
      idCliente: clienteID,
      idTour: tourDetails.id,
      fechaInicio: fecha,
      fechaFin: fecha,
      cantidadPersonas: parseInt(personas),
      precioTotal: total
  };

  try {
      const response = await fetchWithToken(config.host+'/reserva', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(reservaData)
      });

      if (response.ok) {
          setReservaStatus({ loading: false, success: true, error: false });
          setDialogOpen(true);
          const usuarioData = await obtenerDetallesUsuario(clienteID);
          if (usuarioData) {
            setUsuarioData(usuarioData);
           
          }
        } else {
          setReservaStatus({ loading: false, success: false, error: true });
        }
  } catch (error) {
      console.error('Error al realizar la reserva:', error);

  }

}

const handleDialogClose = () => {
  setDialogOpen(false); 
  navigate('/inicio');
};



  return (
    <StyledDetalles>
      {loading ? (
        <div className="loading-container">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
        <div className='container'>  
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
        <div >
          
          <h2 className="h2-title">{tourDetails.titulo}</h2>
          {tourDetails.linkFotos && tourDetails.linkFotos.length > 0 && (
            <div className='imagenes'>
              <ImageList onClick={openGallery} sx={{ width: '100%' }} cols={4} rowHeight={225}>

                {tourDetails.linkFotos.slice(0, 1).map((imageSrc, index) => (
                  <ImageListItem key={index} cols={2} rows={2}>
                    <img
                      src={imageSrc}
                      alt={`Imagen ${index + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </ImageListItem>
                ))}

                {tourDetails.linkFotos.slice(1, 5).map((imageSrc, index) => (
                  <ImageListItem key={index + 1} cols={1} rows={1}>
                    <img
                      src={imageSrc}
                      alt={`Imagen ${index + 2}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />

                  </ImageListItem>
                ))}
              </ImageList>
              {isModalOpen && (
                <ImageModal images={tourDetails.linkFotos} onClose={closeGallery} />
              )}
            </div>
          )}
          <div>
            <div>
              <div className='titulos'>
                <h2>Sobre {tourDetails.titulo}</h2>
              </div>
              <p className='descripcion'>{tourDetails.descripcion}</p>
              
            </div>
            <div>
              <div className='titulos'>
                <h2>Disponibilidad y tarifa</h2>
              </div>
              <div className="cont">
                <div>
                <BasicDatePicker style={{display: "flex", justifyContent: 'center',alignItems: 'center' }} tourId={id} onDateChange={handleDateChange} ocupadas={fechas}/>
                <TextField onInput={handleInputPersonas} value={personas} style={{marginLeft: 15}} type='number' id="outlined-basic" label="Cantidad de personas" variant="outlined" />
                </div>
                <div style={{textAlign: 'left'}}>
                  <div className="price">{"Precio por persona: $ " + tourDetails.precio}</div>
                  <div className="total">Total: $ {total}</div>
                </div>

              </div>
            </div>
          </div>
          <section>
            <div className='especificaciones'>
            <Stack direction="row" spacing={1}>
                                <h3>Características:</h3>
                                {tourDetails.caracteristicas &&
                                    tourDetails.caracteristicas.map((caracteristica) => (
                                        <Chip key={caracteristica.id} label={caracteristica.nombre} variant="outlined" />
                                    ))}
                            </Stack>
            </div>
            <div className='especificaciones'>
              <Stack direction="row" spacing={1}>
                                <h3>Categorías:</h3>
                                {tourDetails.categorias &&
                                    tourDetails.categorias.map((categoria) => (
                                        <Chip key={categoria.id} label={categoria.nombre} />
                                    ))}
                            </Stack>
            </div>
          </section>
          
  
          <Button className='btn-reservar' onClick={reservar} disabled={reservaStatus.loading}>
          {reservaStatus.loading ? 'Procesando...' : 'RESERVAR'}
            {/* RESERVAR */}
          </Button>
          <Dialog open={dialogOpen && datosUsuarioListos} onClose={handleDialogClose}>
            <DialogTitle>¡Reserva exitosa!</DialogTitle>
            <DialogContent>
              <p>Tu reserva se ha efectuado con éxito. ¡Disfruta tu experiencia!</p>
              <p>Se ha enviado el detalle de tu reserva a tu correo: {usuarioData && usuarioData.mail}</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
          {reservaStatus.error && (
            <div>Error al realizar la reserva</div>
          )}
          <div>

          <h3 style={{textAlign: 'left'}}>Políticas</h3>
          <ul style={{textAlign: 'left'}}>
            {politicasData.map((politica, index) => (
              <li key={index}>
                <strong>{politica.nombre}</strong>: {politica.contenido}
              </li>
            ))}
          </ul>
          </div>
        </div>
        </div>
        </>
      )
      }
    </StyledDetalles>
  )
}
export default Detalles;
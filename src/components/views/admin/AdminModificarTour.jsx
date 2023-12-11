import React from 'react'
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import { Link, Navigate} from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import fetchWithToken from '../login/Interceptor';
import config from '../../../config';
import CircularProgress from '@mui/material/CircularProgress';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const StyledFormModificar = styled(Box)`
 
.row1{
  display: flex;
  flex-direction: row;
  justify-content: center ;
}
.css-1u3bzj6-MuiFormControl-root-MuiTextField-root{
  width: 100%;
  margin: 8px;

}
.css-1xnbq41-MuiAutocomplete-root {
  width: 100%;
  margin: 8px;
}
.css-sghohy-MuiButtonBase-root-MuiButton-root{
  width: 100%;
  margin: 8px;
}
.row2{
  display: flex;
  flex-direction: row;
  justify-content: center ;
  align-items: center;
  margin: 0 4%;
}
.row3{
  display: flex;
  justify-content: center ;
  margin: 2rem 0;
}

.row4{
  display: flex;
  justify-content: center ;
  margin: 8px;
}

.borde{
  border: 1px solid grey;
  padding: 1rem;
  border-radius: 7px;
}

.update{
  justify-content: center;
  width: 10%;
  margin: 0 45%;
}

.loading-container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 1; /* Coloca el círculo de carga encima del contenido */
  height: 100%;
}

h5{
  margin: 0;
}
`

const AdminModificarTour = () => {
  const [titulo, setTitulo] = useState('');
  const [provincia, setProvincia] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [duracion, setDuracion] = useState('');
  const [file, setFile] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [caracteristicasSeleccionadas, setCaracteristicasSeleccionadas] = useState([]);
  const [politicas, setPoliticas] = useState([]);
  const [politicasSeleccionadas, setPoliticasSeleccionadas] = useState([]);
  const [tour, setTour] = useState([]);
  const [imagenesSubidas, setImagenesSubidas] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getTour = async () => {
    try {
      if (!id) {
        console.error('ID is undefined');
        return;
      }
      const response = await fetchWithToken(`${config.host}/tours/${id}`);
      const jsonData1 = await response.json();
      console.log("Traer tour", jsonData1);
      setTour(jsonData1);
      setTitulo(jsonData1.titulo);
      setDescripcion(jsonData1.descripcion);
      setProvincia(jsonData1.provincia);
      setPrecio(jsonData1.precio);
      setDuracion(jsonData1.cantHoras);
      setImagenesSubidas(jsonData1.linkFotos);
      setPoliticasSeleccionadas(jsonData1.politicas);
      setCaracteristicasSeleccionadas(jsonData1.caracteristicas);
      setCategoriasSeleccionadas(jsonData1.categorias);
    } catch (error) {
      console.error("Error al obtener los datos de la API: ", error);
    }
  };

  const getCaracteristicasYCategorias = async () => {
    try {
      const responseCaracteristica = await fetchWithToken(config.host + "/caracteristicas");
      const responseCategorias = await fetchWithToken(config.host + "/categorias");
      const responsePoliticas = await fetchWithToken(config.host + "/politicas");
      const jsonCaracteristica = await responseCaracteristica.json();
      const jsonCategorias = await responseCategorias.json();
      const jsonPoliticas = await responsePoliticas.json();
      setCaracteristicas(jsonCaracteristica);
      setCategorias(jsonCategorias);
      setPoliticas(jsonPoliticas);
      console.log("Traer Caracteristica", jsonCaracteristica);
      console.log("Traer Categorias", jsonCategorias);
      console.log("Traer Politicas", jsonPoliticas)

    } catch (error) {
      console.error("Error al obtener los datos de la API: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getTour();
        await getCaracteristicasYCategorias();
      } catch (error) {
        console.error('Error al obtener datos:', error);
      } finally {
        setLoading(false); // Actualiza el estado de carga al finalizar la carga
      }
    };

    fetchData();
  }, [id]);

  const handleDeleteImage = async (imagen) => {
    console.log(imagen);

    try {
      const fileNameToDelete = getFileNameFromUrl(imagen);

      if (!fileNameToDelete) {
        console.error('No se pudo obtener el nombre del archivo desde la URL:', imagen);
        return;
      }

      const response = await fetch(`${config.host}/tours/eliminarfoto?id=${id}&url=${imagen}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('File deleted successfully');
        setImagenesSubidas(imagenesSubidas.filter((img) => img !== imagen));
      } else {
        console.error('Error deleting file:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getFileNameFromUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const pathnameParts = urlObj.pathname.split('/');
      const fileNamePart = pathnameParts[pathnameParts.length - 1];
      return decodeURIComponent(fileNamePart);
    } catch (error) {
      console.error('Error al obtener el nombre del archivo desde la URL:', error);
      return null;
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('provincia', provincia);
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('precio', parseInt(precio));
    formData.append('cantHoras', parseInt(duracion));
    formData.append('id', id);
    uploadImage();

    try {
      const response = await fetchWithToken(config.host + '/tours/modificarTour', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('El formulario se ha enviado exitosamente.');

        // Enviar categorías seleccionadas
        await fetchWithToken(`${config.host}/tours/${id}/categorias`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoriasSeleccionadas.map((category) => category.id)),
        });

        // Enviar características seleccionadas
        await fetchWithToken(`${config.host}/tours/${id}/caracteristicas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(caracteristicasSeleccionadas.map((characteristic) => characteristic.id)),
        });
        // Enviar politicas seleccionadas
        await fetchWithToken(`${config.host}/tours/${id}/politicas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(politicasSeleccionadas.map((policy) => policy.id)),
        });

        console.log('El tour se ha agregado exitosamente.');
      } else {
        console.error('Error al enviar el formulario.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    } finally{
      navigate("/admintours");
    }
  };

  const uploadImage = async (e) => {
    if (file.length > 0) {
      try {
        const formData = new FormData();
        formData.append('id', id);

        for (let i = 0; i < file.length; i++) {
          formData.append('file', file[i]);
        }

        const response = await fetch(config.host + '/s3/uploadFile', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Imágenes subidas exitosamente');
        } else {
          console.error('Error al subir las imágenes:', response.status);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    } else {
      console.log('No hay nuevas imágenes para subir.');
    }
  };

  return (
    <StyledFormModificar
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
      {loading ? (
        <div className='loading-container'>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <div>
            <h2>Modificar Tour</h2>
          </div>
          <div className='row1'>
            <TextField
              label="ID"
              value={id}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              label="Titulo"
              value={titulo}
              variant="outlined"
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className='row2'>
            <TextField
              label="Provincia"
              value={provincia}
              variant="outlined"
              onChange={(e) => setProvincia(e.target.value)}
            />
            <TextField
              label="Precio"
              type="number"
              value={precio}
              variant="outlined"
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>
          <div className='row2'>
            <TextField
              id="filled-multiline-flexible"
              label="Descripcion"
              multiline
              maxRows={10}
              variant="outlined"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <TextField
              label="Duracion"
              type="number"
              value={duracion}
              variant="outlined"
              onChange={(e) => setDuracion(e.target.value)}
            />
          </div>
          <div className='row3'>
            <FormGroup className='borde' style={{ display: 'flex', flexDirection: "column", margin: "0 1rem" }}>
              <h5>Categorías</h5>
              {categorias.map((categoria) => (
                <FormControlLabel
                  key={categoria.id}
                  control={
                    <Checkbox
                      inputProps={{ 'aria-label': `Checkbox ${categoria.nombre}` }}
                      checked={categoriasSeleccionadas.some((seleccionada) => seleccionada.id === categoria.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCategoriasSeleccionadas([...categoriasSeleccionadas, categoria]);
                        } else {
                          setCategoriasSeleccionadas(categoriasSeleccionadas.filter((seleccionada) => seleccionada.id !== categoria.id));
                        }
                      }}
                    />
                  }
                  label={categoria.nombre}
                />
              ))}
            </FormGroup>
            
            <FormGroup className='borde' style={{ display: 'flex', flexDirection: "column", margin: "0 1rem"}}>
              <h5>Características</h5>
              {caracteristicas.map((caracteristica) => (
                <FormControlLabel
                  key={caracteristica.id}
                  control={
                    <Checkbox
                      inputProps={{ 'aria-label': `Checkbox ${caracteristica.nombre}` }}
                      checked={caracteristicasSeleccionadas.some((seleccionada) => seleccionada.id === caracteristica.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCaracteristicasSeleccionadas([...caracteristicasSeleccionadas, caracteristica]);
                        } else {
                          setCaracteristicasSeleccionadas(caracteristicasSeleccionadas.filter((seleccionada) => seleccionada.id !== caracteristica.id));
                        }
                      }}
                    />
                  }
                  label={caracteristica.nombre}
                />
              ))}
            </FormGroup>
            
            <FormGroup className='borde' style={{ display: 'flex', flexDirection: "column", margin: "0 1rem"}}>
              <h5>Politicas</h5>
              {politicas.map((politica) => (
                <FormControlLabel
                  key={politica.id}
                  control={
                    <Checkbox
                      inputProps={{ 'aria-label': `Checkbox ${politica.nombre}` }}
                      checked={politicasSeleccionadas.some((seleccionada) => seleccionada.id === politica.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPoliticasSeleccionadas([...politicasSeleccionadas, politica]);
                        } else {
                          setPoliticasSeleccionadas(politicasSeleccionadas.filter((seleccionada) => seleccionada.id !== politica.id));
                        }
                      }}
                    />
                  }
                  label={politica.nombre}
                />
              ))}
            </FormGroup>
          </div>
          {Array.isArray(imagenesSubidas) && imagenesSubidas.length > 0 && (
            <div className='row2'>
              <h3>Imágenes</h3>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', }}>
                {imagenesSubidas.map((imagen, index) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column', marginRight: '10px', textAlign: 'center' }}>
                    <img src={imagen} alt={`Imagen ${index + 1}`} style={{ width: '250px', height: 'auto' }} />
                    <button onClick={() => handleDeleteImage(imagen)}>Eliminar</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className='update'>
            <Button component="label" onChange={handleFileChange} variant="contained" startIcon={<CloudUploadIcon />} >
              Upload file
              <VisuallyHiddenInput multiple type="file" name='file' />
            </Button>
          </div>

          <Button onClick={handleSubmit} variant="contained" color="success">
            Modificar
          </Button>

          <div>
            <Link to={`/admintours`}>
              <Button variant="outlined" color="error">
                Cancelar
              </Button>
            </Link>
          </div>
        </>
      )}
    </StyledFormModificar>
  );
}

export default AdminModificarTour;
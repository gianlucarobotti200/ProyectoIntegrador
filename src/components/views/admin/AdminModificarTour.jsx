import React from 'react'
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

const AdminModificarTour = () => {

  const [titulo, setTitulo] = useState('')
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
  const [tour, setTour] = useState([])
  const { id } = useParams();



  const getTour = async () => {
    try {
      if (!id) {
        console.error('ID is undefined');
        return;
      }

      const response = await fetch(`http://localhost:8080/tours/${id}`);
      const jsonData1 = await response.json();
      console.log("Traer tour", jsonData1);
      setTour(jsonData1);
      setTitulo(jsonData1.titulo);
      setDescripcion(jsonData1.descripcion);
      setProvincia(jsonData1.provincia);
      setPrecio(jsonData1.precio);
      setDuracion(jsonData1.cantHoras);
      setFile(jsonData1.linkFotos);
      setPoliticasSeleccionadas(jsonData1.politicas);
      setCaracteristicasSeleccionadas(jsonData1.caracteristicas);
      setCategoriasSeleccionadas(jsonData1.categorias);
    } catch (error) {
      console.error("Error al obtener los datos de la API: ", error);
    }
  };

  const getCaracteristicasYCategorias = async () => {
    try {
      const responseCaracteristica = await fetch("http://localhost:8080/caracteristicas");
      const responseCategorias = await fetch("http://localhost:8080/categorias");
      const responsePoliticas = await fetch("http://localhost:8080/politicas");
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
    getTour();
    getCaracteristicasYCategorias();
  }, [id]);


  const handleDeleteImage = async (imagen) => {
    const fileNameToDelete = getFileNameFromUrl(imagen);
    try {
      const response = await fetch(`http://localhost:8080/deleteObject?fileName=${fileNameToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('File deleted successfully');
      } else {
        console.error('Error deleting file:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getFileNameFromUrl = (url) => {

    const parts = url.split('fotosTours/');

    if (parts.length < 2) {
      console.error('URL no válida para extraer el nombre del archivo');
      return null;
    }

    const fileNamePart = parts[1];

    return fileNamePart;
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

    



    try {
      const response = await fetch('http://localhost:8080/tours/modificarTour', {
        method: 'PUT',
        body: formData,


      });

      if (response.ok) {
        if (response.ok) {
          console.log('El formulario se ha enviado exitosamente.');
        }

        // Enviar categorías seleccionadas
        await fetch(`http://localhost:8080/tours/${id}/categorias`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoriasSeleccionadas.map((category) => category.id)),
        });

        // Enviar características seleccionadas
        await fetch(`http://localhost:8080/tours/${id}/caracteristicas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(caracteristicasSeleccionadas.map((category) => category.id)),
        });

        console.log('El tour se ha agregado exitosamente.');
        onCloseModal();
      } else {
        console.error('Error al enviar el formulario.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };


  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <h2>Modificar Tour</h2>
      </div>
      <div>
        <TextField
          label="Titulo"
          value={titulo}
          variant="filled"
          onChange={(e) => setTitulo(e.target.value)}
        />
        <TextField
          id="filled-multiline-flexible"
          label="Descripcion"
          multiline
          maxRows={10}
          variant="filled"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <TextField
          label="Provincia"
          value={provincia}
          variant="filled"
          onChange={(e) => setProvincia(e.target.value)}
        />
        <TextField
          label="Precio"
          type="number"
          value={precio}
          variant="filled"
          onChange={(e) => setPrecio(e.target.value)}
        />
        <TextField
          label="ID"
          value={id}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <TextField
          label="Duracion"
          type="number"
          value={duracion}
          variant="filled"
          onChange={(e) => setDuracion(e.target.value)}
        />
        <div>
          <h5>Categorías</h5>
          <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
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
        </div>
      </div>
      <div>
        <h5>Características</h5>
        <FormGroup>
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
      </div>
      <div>
        <h5>Politicas</h5>
        <FormGroup>
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
      {file && file.length > 0 && (
        <div>
          <h3>Imágenes:</h3>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-arund', }}>
            {file.map((imagen, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', marginRight: '10px', textAlign: 'center' }}>
                <img src={imagen} alt={`Imagen ${index + 1}`} style={{ width: '250px', height: 'auto' }} />
                <button onClick={() => handleDeleteImage(imagen)}>Eliminar</button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
      <Button component="label" onChange={handleFileChange} variant="contained" startIcon={<CloudUploadIcon />}>
      Upload file
      <VisuallyHiddenInput type="file" name='file' />
    </Button>
      </div>
      <div>
        <Button onClick={handleSubmit} variant="contained" color="success">
          Modificar
        </Button>
        <Link to={`/admintours`}>
          <Button variant="outlined" color="error">
            Cancelar
          </Button>
        </Link>
      </div>
    </Box>
  );

}

export default AdminModificarTour
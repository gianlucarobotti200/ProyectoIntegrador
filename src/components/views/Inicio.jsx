import React from 'react'
import Buscador from './utils/Buscador'
import Categorias from './utils/Categorias'
import Recomendaciones from './utils/Recomendaciones'
import Productos from './utils/Productos'
import styled from "styled-components"

// Define un nuevo componente StyledInicio
const StyledInicio = styled.main`
    /* Agrega estilos según tus necesidades */
`

// Estiliza el componente Buscador para agregar una imagen
const StyledBuscador = styled.div`

    img {
        width: 20%;
        height: auto; /* Esto asegura que la proporción de la imagen se mantenga */
        display: block; /*
    }
`;
const ContenedorDeImagenes = styled.div`
  display: flex;
`;

const Imagen = styled.img`
  width: 100%;
  height: auto;
  border: 2px solid #f8af1c ;
`;

const Inicio = () => {
    return (
        <StyledInicio>
            {/* Utiliza el componente estilizado Buscador */}
            <StyledBuscador>
                <ContenedorDeImagenes>
                <Imagen className='portada' src='./src/components/img/portada.jpeg'  alt='Portada' /> 
                 <Imagen className='portada2'src='./src/components/img/portada2.jpeg'  alt='Portada2' />  
                 <Imagen className='portada3' src='./src/components/img/portada3.jpeg'  alt='Portada3' /> 
                 <Imagen className='portada4'  src='./src/components/img/portada4.jpeg'  alt='Portada4' /> 
                 <Imagen className='portada5'  src='./src/components/img/portada5.jpeg'  alt='Portada5' /> 
      {/* Agrega más imágenes según sea necesario */}
                </ContenedorDeImagenes>
                <Buscador />
            </StyledBuscador>
            <Categorias />
            <Recomendaciones />
            {/* <Productos/> */}
        </StyledInicio>
    )
}
export default Inicio;
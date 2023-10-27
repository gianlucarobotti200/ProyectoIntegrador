import React from 'react';
import styled from "styled-components"

const StyledCategorias = styled.div`
    
`

const Categorias = () => {
  const categorias = ['Destinos', 'Categoria 2', 'Categoria 3'];

  return (
    <StyledCategorias>
      <h2>Categorías</h2>
      <ul>
        {categorias.map((categoria, index) => (
          <li key={index}>{categoria}</li>
        ))}
      </ul>
    </StyledCategorias>
  );
}

export default Categorias;
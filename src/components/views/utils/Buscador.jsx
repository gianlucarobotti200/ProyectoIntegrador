import React, { useState } from 'react';
import styled from "styled-components";

const StyledBuscador = styled.div`

    background-color: #75AADB;
    input{
        background-color: #FFFFFF;
        padding: 0.5rem;
        border-radius: 5px;
        border-style: none;
        box-shadow: 5px 5px 3px 0px rgba(0, 0, 0, 0.5);
        margin: 2rem 0.5rem;
    }

    button{
        background-color: #FFFFFF;
        color: black;
        padding: 0.5rem;
        border-radius: 5px;
        border-style: none;
        box-shadow: 5px 5px 3px 0px rgba(0, 0, 0, 0.5);
    }

`

const Buscador = () => {
  const [busqueda, setBusqueda] = useState('');

  const handleInputChange = (event) => {
    setBusqueda(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Realizando búsqueda:', busqueda);
  }

  return (
    <StyledBuscador>
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          value={busqueda}
          onChange={handleInputChange}
          placeholder= "Ciudad de Argentina..."
        />
        <input
          type="date"
          value={busqueda}
          onChange={handleInputChange}
          placeholder= "Fecha..."
        />
        
        <button type="submit">Buscar</button>
      </form>
    </StyledBuscador>
  );
}

export default Buscador;

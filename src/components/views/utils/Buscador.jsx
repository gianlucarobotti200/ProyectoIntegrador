import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StyledBuscador = styled.div`
  background-color: #75AADB;
  position: relative;
  padding: 2rem 0.5rem; /* Ajusta el padding según sea necesario */
  input {
    background-color: #FFFFFF;
    padding: 0.5rem;
    border-radius: 5px;
    border-style: none;
    box-shadow: 5px 5px 3px 0px rgba(0, 0, 0, 0.5);
    margin: 0 0.5rem; /* Ajusta el margin según sea necesario */
  }

  button {
    background-color: #FFFFFF;
    color: black;
    padding: 0.5rem;
    border-radius: 5px;
    border-style: none;
    box-shadow: 5px 5px 3px 0px rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 2rem; 
    right: 30rem;
  }
`;


const Buscador = () => {
  const [ciudad, setCiudad] = useState('');
  const [fecha, setFecha] = useState(null);

  const handleCiudadChange = (event) => {
    setCiudad(event.target.value);
  };

  const handleFechaChange = (date) => {
    setFecha(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Realizando búsqueda:', ciudad, fecha);
  };

  // Obtén la fecha actual
  const fechaActual = new Date();

  return (
    <StyledBuscador>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ciudad}
          onChange={handleCiudadChange}
          placeholder="Ciudad de Argentina..."
        />
        <DatePicker
          selected={fecha}
          onChange={handleFechaChange}
          placeholderText="Selecciona una fecha"
          minDate={fechaActual} // Establece la fecha mínima como la fecha actual
        />
        <button type="submit">Buscar</button>
      </form>
    </StyledBuscador>
  );
};

export default Buscador;


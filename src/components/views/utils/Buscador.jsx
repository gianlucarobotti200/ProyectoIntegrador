import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledBuscador = styled.div`
  background-image: linear-gradient(120deg, rgb(248 248 248), rgb(195 217 240) 60%);
  padding: 2rem 0.5rem;
  input {
    background-color: #FFFFFF;
    padding: 0.5rem;
    border-radius: 5px;
    border-style: none;
    box-shadow: 5px 5px 3px 0px rgba(0, 0, 0, 0.5);
    margin: 0 0.5rem;
  }

  button {
    background-color: #FFFFFF;
    color: black;
    padding: 0.5rem;
    border-radius: 5px;
    border-style: none;
    box-shadow: 5px 5px 3px 0px rgba(0, 0, 0, 0.5);
  }
`;


const Buscador = ({ value, onChange }) => {
  const [search, setSearch] = useState(value);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() !== '') {
      navigate(`/resultados/${search}`);
    }
  };

  return (
    <StyledBuscador>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="¿A donde viajás?..."
      />
      <button type="button" onClick={handleSearch}>
        Buscar
      </button>
    </StyledBuscador>
  );
};

export default Buscador;


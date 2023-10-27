import React from 'react'
import styled from "styled-components";

const CardProducto = ({ imgUrl, provincia, titulo, descripcion, precio, duracion }) => {

    
    const StyledProduct = styled.article`
        
        border.style: solid 1px black;
    `

    return (
        <StyledProduct>
            <img src={imgUrl} alt="" />
            <h3>{titulo}</h3>
            <h5>Provincia de {provincia}</h5>
            <p>{descripcion}</p>
            <span>desde $ {precio}</span>
            <span>{duracion}</span>
        </StyledProduct>
    )
}

export default CardProducto
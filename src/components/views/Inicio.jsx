import React from 'react'
import Buscador from './utils/Buscador'
import Categorias from './utils/Categorias'
import Recomendaciones from './utils/Recomendaciones'
import Productos from './utils/Productos'
import styled from "styled-components"

const StyledInicio = styled.main`
    
`

const Inicio = () => {
    return (
        <StyledInicio>
            <Buscador />
            <Categorias />
            <Recomendaciones />
            <Productos/>
        </StyledInicio>
    )
}

export default Inicio
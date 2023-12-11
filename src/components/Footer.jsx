import React from 'react'
import styled from "styled-components"

const StyledFooter = styled.footer`


    background-color: #8DB0CE;  
    width: 100%;
    height: 15vh;
    bottom: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 40px;

    .footer-content{
        display: flex;
        align-items: center;
        height: 100%;    
    }

    .footer-content div{
        height: 50%;
        margin: 2px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .footer-content img{
        height: 100%;
    }

    .footer-content p{
        margin: 0;
        color: white;
    }

    @media only screen and (max-width: 600px) {

        .footer-content{
            flex-direction: column;
            align-items: center;
            height: 100%;    
        }

        .footer-content div{
            justify-content: flex-end;
        }

        .footer-content img{
            height: 80%;
        }

    }
`

const Footer = () => {
  return (
    <StyledFooter>
      <div className="footer-content">
        <div>
          <img src="http://localhost:5173/src/components/img/logo-vector-blanco.png" alt='logo-sectArgTour'/>
        </div>
        <div>
          <p>© 2023 - Equipo 2</p>
        </div>
      </div>
    </StyledFooter>
  )
}

export default Footer
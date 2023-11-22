import React from 'react';
import styled from "styled-components"
import ImageListItem from '@mui/material/ImageListItem';


const StyledCardRecomendacion = styled.div `

    .card-grid{
      display: grid;
      width: 40vw;
      grid-template-columns: 1fr 1fr;
      gap: 3%;
      margin: 0% 0% 0% 2%;
  }

   .recomendacion{
      border-radius: 5px;
      box-shadow: grey 0px 0px 5px,  0px 4px 8px;
      border: 2px solid grey;
      height: auto;
  }

   .recomendacion img{
      width: 34vw;
      height: 70vh;
      padding: 2% 2% 5% 2%;
  }

    h2.card-reco{
      display: flex;
      text-align: left;
      font-size: 1.6vw;
      margin: 3% 0% 1% 9%;       
      color: rgba(36, 48, 110, 1);
  }

    p.card-desc{
      display: flex;
      text-align: left;
      font-size: 1.6vw;
      margin: 0% 0% 0% 9% ;
      color: rgba(36, 48, 110, 1);
  }

   .card-footer{
      display: flex;
      aling-items: center;
      justify-content: space-around;
      width: 40vw;
      padding: 1% 1% 4% 8%;
      margin: 0% 0% 0% -8%;
      color: rgba(36, 48, 110, 1);
      font-weight: bold;
      font-size: 1.5vw;
  }


   @media (max-width: 600px) {

    .card-grid{
      display: grid;
      grid-template-columns: 1fr;
      width: 90vw;
      gap: 5%; 
      margin: 0%;
    }

    .recomendacion img{
      display: grid;
      grid-template-columns: 1fr;
      width: 80vw;
      height: 40vh;
      border-radius: 5px;
      box-shadow: grey 0px 0px 5px,  0px 4px 11px;
      border: 1px solid grey;
      padding:0%;
      margin: 15% 1% 1% 5%;
    }

    h2.card-reco{
      font-size: 6vw;     
      color: rgba(36, 48, 110, 1);

    }

    p.card-desc{
      display: flex;
      text-align: left;
      font-size: 5vw;
      margin: 1%;
      padding: 1%;
      color: rgba(36, 48, 110, 1);
    }

    .card-footer{  
       font-size: 6vw;
       margin: 0vh;
       width: 80vw;
       padding: 1vh;
     }
  
    p.card-desc{
      position: absolute;
      width: 40vw;
      top: 1%;
      left: 68%;
      transform: translate(-50%, -50%);
      color: black;
      font-weight: bold;
      font-size: 2vw;
   }


`


const CardRecomendacion = ({ id, provincia, titulo, descripcion, linkFotos, precio, cantHoras }) => {
  return (
<StyledCardRecomendacion>
          <div className='recomendacion'>
                  <h2 className='card-reco'>{titulo}</h2>
                  <p className='card-desc'>{descripcion}</p>
                  <img src='./src/components/img/1/foto1.jpg'/>       
             <div className='card-footer'>
                <span>Cant Horas: {cantHoras}:00 hs</span>
                <span>Precio: ${precio}</span>
             </div>
          </div>
        </StyledCardRecomendacion>
  )
}

export default CardRecomendacion;
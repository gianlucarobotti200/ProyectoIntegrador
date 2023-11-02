import React from 'react';
import styled from "styled-components"
import ImageListItem from '@mui/material/ImageListItem';


const StyledCardRecomendacion = styled.div `

    .card-grid{
     display: grid;
     grid-template-columns: 1fr 1fr;
     gap: 3%;
     margin: 0% 0% 0% 2%;
     whidth: 50%;
   }


    h2.reco{
      display: flex;
      text-align: left;
      font-size: 2.5vw;
      margin: 4% 2% 4% 8%;       
      color: rgba(36, 48, 110, 1);
  }

   h2{
     display: flex;
     text-align: left;
     font-size: 2.5vw;
     margin: 0% 0% 0% 0% ;
     color: rgba(36, 48, 110, 1);
   }

   img.foto-rec{
     width: 80%;
     height: 40vh;
     border-radius: 5px;
     box-shadow: grey 0px 0px 5px,  0px 4px 11px;
     border: 1px solid grey;
     padding: 5% 5% 5% 5%;
     margin: 0% 0% 0% 5%;
     background-color: white;
     position: relative;
   }

   li{
    width: 40vw;
   }

   .texto-imagen{
     position: absolute;
     width: 40vw;
     top: 5%;   
     transform: translate(-50%, -50%);
     color: rgba(36, 48, 110, 1);
     font-weight: bold;
     font-size: 5vw;
   }
   .precio{
     font-size: 1.3vw;
     color: rgba(36, 48, 110, 1);
     font-weight: bold;
     position: absolute;
     bottom: 5%;
     top: 860%;
     right: -20%;
   }
   .foto-rec{
     position: relative;
   }
   .reloj{
     position: absolute;
     bottom: left;
     left: 10%;
     font-size: 1.2vw;
     color: white;
     background-color: rgba(36, 48, 110, 0.8);
     border-radius: 3px;
     padding: 5px;
     top: 84%;
   }
  
   .horario{
     margin-left: 10px;
   }


   @media (max-width: 600px) {

     .recomendacion{
       display: grid;
       grid-template-columns: 1fr;
       width: 90vw;
       gap: 0%; 
       margin: 5%;
     }

     img.foto-rec{
       width: 90vw;
       height: 40vh;
       border-radius: 5px;
       box-shadow: grey 0px 0px 5px,  0px 4px 11px;
       border: 1px solid grey;
       padding: 1%;
       margin: 0%;
     }

     h2{  
       font-size: 8vw;
       margin: 6vh;
       padding: 1vh;
     }
  
     li{
       width: 30vw;
     }

   .texto-imagen{
     position: absolute;
     width: 40vw;
     top: 1%;
     left: 68%;
     transform: translate(-50%, -50%);
     color: black;
     font-weight: bold;
     font-size: 2vw;
   }

   .precio{
     font-size: 3vw;
     color: black;
     font-weight: bold;
     position: absolute;
     bottom: 5%;
     top: 1400%;
     right: -95%;
   }

`


const CardRecomendacion = ({ id, provincia, titulo, descripcion, linkFotos, precio, cantHoras }) => {
  return (
<StyledCardRecomendacion>
          <div className='recomendacion'>
            <div>
              <h2 className='reco'>{titulo}</h2>
            </div>
            <div>
                <ImageListItem  key={id}>
                  <img className='foto-rec'alt={titulo} src={linkFotos[0]} />
                </ImageListItem>
            </div>
            <div>
              <span>{cantHoras}</span>
              <span>{precio}</span>
            </div>
            </div>
        </StyledCardRecomendacion>
  )
}

export default CardRecomendacion;
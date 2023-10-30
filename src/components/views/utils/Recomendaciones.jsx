import React from 'react';
import styled from "styled-components"
import ImageListItem from '@mui/material/ImageListItem';



const StyledRecomendaciones = styled.div `

.recomendacion{
    display: grid;
    width: 85vw;
    height: 163vh;
    grid-template-columns: 1fr 1fr;
    gap: 7%;
    margin: 0% 0% 0% 7%;
  }

  h2{
    text-align: left;
    font-size: 2.5vw;
    margin: 4% 2% 4% 8% ;
    color: rgba(36, 48, 110, 1);
  }

  .title{
    background: none;
  }

  img.foto-rec{
    width: 98%;
    height: 49vh;
    border-radius: 5px;
    box-shadow: grey 0px 0px 5px,  0px 4px 11px;
    border: 1px solid grey;
    padding: 15% 5% 15% 5%;
    margin: 0% 0% 0% 4%;
    background-color: white;
    position: relative;
  }

  li{
   width: 34vw;
  }

  .texto-imagen{
    position: absolute;
    width: 27vw;
    top: 5%;
    left: 48%;
    transform: translate(-50%, -50%);
    color: rgba(36, 48, 110, 1);
    font-weight: bold;
    font-size: 1.4vw;
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

function Recomendaciones() {

    return (
        <StyledRecomendaciones>
          <div>
            <h2>Recomendaciones</h2>
          </div>
          <div className='recomendacion'>
            { Recomendacion.map((item) => (
              <ImageListItem  key={item.img}>
                <img className='foto-rec'alt={item.title} data-horario={item.horario}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  loading="lazy"
                />
                <p className='texto-imagen'>{item.title}<span className='precio'>${item.price}</span></p>
                <p><span className='reloj'>{item.horario}</span></p>
              </ImageListItem>
            ))}
            </div>
        </StyledRecomendaciones>
    );
  };
    
    const Recomendacion = [
      {
        img: 'https://www.guiadecabanias.com/imgs/galerias/postal_1030.jpg',
        title: 'Paseos en lanchas - conociendo las garras del Tigre ',
        price: '85000,00',
        horario:'De 09:00 a 17:00 hrs.',

      },
      {
        img: 'https://cdn.discordapp.com/attachments/1162206131888869456/1167551418647982151/a8GQ9c_x_1256x620__2.webp?ex=654e89fe&is=653c14fe&hm=ef549287ff4b50f3ff80b9d8b12212f4dd2347e5d000bdf144c3f1f985fcf3aa&',
        title: 'Visita guiada - visitando los viñedos del Valle de Uco',
        price: '95000,50',
        horario:'De 07:00 a 18:00 hrs.',

      },
      {
        img: 'https://i.pinimg.com/736x/74/e5/55/74e5557fce67fffa50e3eaf128a550e8.jpg',
        title: 'Experimente del micro clima - dentro de una colonia Suiza en La Cumbrecita  ',
        price: '65000,50',
        horario:'De 10:00 a 19:00 hrs.',

      },
      {
        img: 'https://cdn.pixabay.com/photo/2015/05/28/22/54/argentina-patagonia-788744_1280.jpg',
        title: 'El sur majestuoso - donde encontrar paisajes de ensueño',
        price: '185000,00',
        horario:'De 07:00 a 19:30 hrs.',

      }, 
      
    ];
   

export default Recomendaciones;
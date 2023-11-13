import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Card from "@mui/material/Card";
import { useParams } from 'react-router-dom';  
import Typography from "@mui/material/Typography"; 



const StyledGaleria= styled.div `


    .div-h2{
      display: flex;
      justify-content: flex-start;
      margin: 1% 0% 1% 3%;       
      color: rgba(36, 48, 110, 1);
  }

    // .img-container-1 {
    //   display: flex;
    //   flex-direction: column;
    //   width: 41vw;
    //   heigth: 50vh;
    //   border-radius: 5px;
    //   margin: 0% 0% 0% 0%;
    // }

    .card-1 {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    .card-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }
    
    .card-item {
      width: calc(50% - 8px);
    }

    .img-container-2 {
      display: flex;
      flex-direction: column 1fr 1fr;
      width: 28vw;
      border-radius: 5px;
      margin: 0% 0% 0% 0%;
    }

    .img-container-2-1 {
      display: flex;
      flex-direction: column 1fr 1fr;
      width: 18vw;
      height: 30vh;
      border-radius: 5px;
      margin: 2% 2% 0% 0%;
    }

  img{
    display: flex;
    width: 40vw;
    height: 80vh;
    margin: 1%;
    border-radius: 5px;
    border: 2px solid grey;
    box-shadow: grey 0px 0px 5px,  0px 4px 11px;
    border: 1px solid grey;
  }

    p.card-desc{
      display: flex;
      text-align: left;
      font-size: 1.6vw;
      color: rgba(36, 48, 110, 1);
      box-shadow: red 0px 0px 5px,  0px 4px 11px;
      border: 1px solid grey;
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


function Galeria() {
  const [data, setData] = useState([]);
  const { id } = useParams();  // Usa useParams dentro del componente funcional

  useEffect(() => {
    const getTours = async () => {
      try {
        const response = await fetch(`http://localhost:8080/tours/${id}`);
        const jsonData = await response.json();

        setData(jsonData);
        console.log(data);
        console.log("Datos obtenidos.");
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    };

    getTours();
  }, [id]);  // Asegúrate de incluir id en la lista de dependencias

  console.log(data);
  console.log("Datos obtenidos.");

  return (
    <StyledGaleria>
      <div>
        <div className='div-h2'>
          <h2>Galeria</h2>
        </div>
        {data.linkFotos && data.linkFotos.map((tour, index) => (
          <div key={index} className='card-item'>
            <div className='card-row'>
              <Card className='img-princ'>
                <img src={tour} alt={`Image ${index}`} />
              </Card>
            </div>
          </div>
        ))}
      </div>
    </StyledGaleria>
  );
}

export default Galeria;
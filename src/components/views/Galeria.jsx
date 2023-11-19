import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Card from "@mui/material/Card";



const StyledGaleria= styled.div `

     display: flex;
     flex-direction: row;
     width: 100%;
     justify-content: center;


    .div-galeria{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between; 
      width: 100vw;
  }

    .h2-title{
      display: flex;
      text-align: left;
      font-size: 1rem;
      margin: 2% 1% 0% 9%;        
      color: rgba(36, 48, 110, 1);
  }

    .card-gral{
      display: flex;
      flex-wrap: wrap;
      aling-items: center:
      justity-content: center;
      width: 100%;
      margin: 1% 0% 0% 0%;
      padding: 2%;
  }

    .img-container-1{
      display: flex;
      flex-direction: column;
      margin: 0% 1% 0% 1%;
  }

    .img-princ{
      display: flex;
      width: 45vw;
      height: 85vh;
      margin: 0% 0% 0% 0%;
      padding: 0% 0% 0% 0%;
      border-radius: 5px;
      box-shadow: #80808047 5px 5px 5px 5px;
      border: 1px solid grey;
  }

    .img-container-2 {
      display: flex;
      flex-wrap: wrap;
      width: 45vw;
      border-radius: 3px;
      margin: 0% 0% 0% 0%;
      padding: 0% 0% 0% 0%;
      gap: 2%;
     
  }
    
    .img-container-2-1{
      display: flex;
      width: 20vw;
      height: 41vh;
      border-radius: 5px;
      margin: 0% 0% 0% 0%;
      padding: 0% 0% 0% 0%;
      box-shadow: #80808047 5px 5px 5px 5px;
      border: 1px solid grey;
  }

  @media (min-width: 768px) {
    .h2-title {
      font-size: 2.5rem;
    }
  }

  @media (min-width: 1024px) {
    .img-princ {
      max-width: 600px;
    }

    .img-container-2-1 {
      max-width: 300px;
    }
  }
  
`

const Galeria = () => {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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
  }, [id]);  

  const openGallery = (image) => {
    setSelectedImage(image);
  };

  const closeGallery = () => {
    setSelectedImage(null);
  };

  console.log(data);
  console.log("Datos obtenidos.");

  return (
    <StyledGaleria>
      <div className='div-galeria'>     
          <h2 className='h2-title'>Galeria</h2>
            <div className='card-gral'>
              <div className='img-container-1'>
                {data.linkFotos && 
                 data.linkFotos.slice(0, 1).map((tour, index) => (               
                  <div key={index} onClick={() => openGallery(tour)}>                                       
                      <Card>
                        <img className='img-princ' 
                        src={tour} 
                        alt={`Image ${index}`} 
                      />
                      </Card>
                  </div>
                ))}             
              </div>              
              <div className="img-container-2">
                {data.linkFotos && 
                 data.linkFotos.slice(1, 5).map((tour, index) => (
                  <div key={index} onClick={() => openGallery(index + 1)}>
                    <Card>
                      <img className="img-container-2-1" 
                      src={tour} 
                      alt={`Image ${index}`} 
                      />
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        {selectedImage && <Modal image={selectedImage} onClose={closeGallery} />}
        </StyledGaleria>
      );
    }

export default Galeria;


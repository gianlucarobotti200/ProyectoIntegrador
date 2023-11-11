 import React, { useState, useEffect } from 'react';
 import styled from 'styled-components';
 import { Link, useParams } from 'react-router-dom';


 const StyledDetalles = styled.div `

   display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;

  h2.detail{
    display: flex;
    text-align: left;
    font-size: 2.5vw;
    margin: 4% 2% 4% 8%;       
    color: rgba(36, 48, 110, 1);
  }

  .card-grid{
    display: grid;
    width: 45vw;
    grid-template-columns: 1fr 1fr;
    gap: 5%;
    margin: 0% 5% 15% 5%;

  }

  @media (max-width: 600px) {
    display: grid;
    aling-items: center;
    justify-content: center;

    .card-grid{
      grid-template-columns: 1fr;
      width: 90vw;
      gap: 1%;
      margin: 0% 5% 15% 2%;
    }

    h2.detail{
      width: 90vw;
      font-size: 9vw;
      margin: 8% 0% 6% 3%
    }

  }

  `


 const Detalles = () => {
    const [tourDetails, setData] = useState([]);
    const { id } = useParams(); 
    console.log('Valor de id:', id);
   

   useEffect(() =>{
    const getTourDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/tours/${id}`);
        if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
  
    getTourDetails();
  }, []);
  console.log(tourDetails);


  if (!tourDetails) {

   return <div>Cargando...</div>
  }


  return (
    <StyledDetalles>
      <>
        <h1 className="title">{tourDetails.titulo}</h1>
        <div>
          {tourDetails.linkFotos && tourDetails.linkFotos.length > 0 && (
            <>
              <img src={tourDetails.linkFotos[0]} alt="Left Image" />
              <div>
                {tourDetails.linkFotos.slice(1, 5).map((image, index) => (
                  <img key={index} src={image} alt={`Right Image ${index + 1}`} />
                ))}
              </div>
            </>
          )}
        </div>
        <h3 className="description">{tourDetails.descripcion}</h3>
        <p className="price">{tourDetails.precio}</p>
        <Link to={`/galeria`}>
          <button>Ver más</button>
        </Link>
      </>
    </StyledDetalles>
  );
  
  };



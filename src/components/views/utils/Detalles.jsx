 import React, { useState, useEffect } from 'react';
 import styled from 'styled-components';
 import { useParams } from 'react-router-dom';
 import StyledGaleria from './Galeria/StyledGaleria';

 const StyledDetalles = styled.div `

    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;

  .div-detalles{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; 
    width: 90vw;
    gap: 1px;
  }

  .h2-title{
    display: flex;
    text-align: left;
    font-size: 3vw;
    margin: 3% 1% 0% 9%;       
    color: rgba(36, 48, 110, 1);
  }

  .card-gral{
    display: grid;
    aling-items: center:
    justity-content: center;
    width: 100%;
    grid-template-columns: 1fr;
    gap: 1%;
    margin: 0% 1% 1% 1%;
  }

  .card-ppal{
    display: flex;
    width: 75vw;
    height: 80vh;
    margin: 4% 0% 0% 8%;
    padding: 0% 0% 0% 0%;
    border-radius: 5px;
    box-shadow: #80808047 3px 3px 3px 2px;
    border: 1px solid rgba(230, 230, 230);
  }

  .card-sec{
    display:inline-flex;
    width: 18vw;
    height: 28vh;
    margin: 4% 0% 0% 1%;
    padding: 0% 0% 0% 0%;
    border-radius: 5px;
    box-shadow: #80808047 3px 3px 3px 2px;
    border: 1px solid rgba(230, 230, 230);
  }

  .description{
    display: flex;
    justify-content: flex-start;
    text-align: left;
    width: 76vw;
    margin: 2% 0% 1% 10%;       
    color: rgba(36, 48, 110, 1);
  }

  .price{
    display: flex;
    flex-direction: row;
    margin: 1% 0% 3% 10%;
    color: rgba(36, 48, 110, 1); 
  }

  .button{
    color: #F2F2F2;
    font-size: 12px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    width: 80px;
    height: 20px;
    align-items: center;
    justify-content: center;
    margin: 10% 10% 0% -161%;
    background-color: rgb(161, 235, 206);
    box-shadow: rgba(0, 212, 255, 0.75) 0px 0px 4px, rgb(91, 91, 229) 0px 4px 11px;
    border: 0.5px solid rgb(183, 197, 242);
  }

  @media (max-width: 600px) {
    display: grid;
    aling-items: center;
    justify-content: center;

    .h2-title{
      width: 90vw;
      font-size: 9vw;
      margin: 8% 0% 6% 3%
  }

    .card-ppal{
      grid-template-columns: 1fr;
      width: 85vw;
      height: auto;
      gap: 1%;
      margin: 0% 5% 5% 2%;
  }
    .card-sec{
      display:inline-flex;
      width: 19vw;
      height: 13vh;
      margin: -1% 1% 1% 2%;
      padding: 0% 0% 0% 0%;
      border-radius: 5px;
      box-shadow: #80808047 3px 3px 3px 2px;
      border: 1px solid rgba(230, 230, 230);
  }

    .description{
      display: flex;
      justify-content: flex-start;
      font-size: 4vw;
      text-align: left;
      width: 85vw;
      margin: 3% 0% 5% 4%;       
      color: rgba(36, 48, 110, 1);
  }

    .price{
      display: flex;
      flex-direction: row;
      margin: 0% 0% 3% 5%;
      color: rgba(36, 48, 110, 1); 
  }
  
    .button{
      margin: 0% 0% 20% -40%;
      padding: 0% 0% 0% 0%;
      width: 30vw;
      height: 3vh;
  } 
}

  `


 const Detalles = () => {
    const [tourDetails, setData] = useState([]);
    const { id } = useParams(); 
    const [selectedImage, setSelectedImage] = useState(null);
    const openGallery = () => {
      setSelectedImage([...tourDetails.linkFotos]);
    };
   

   useEffect(() =>{
    const getTourDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/tours/${id}`);
        if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData)};
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
  
    getTourDetails();
  }, [id]);
  console.log(tourDetails);

  const closeGallery = () => {
    setSelectedImage(null);
  };

  return (
    <StyledDetalles>
      <div className='div-detalles'>
        <h2 className="h2-title">{tourDetails.titulo}</h2>
          <div className='card-gral'>
           {tourDetails.linkFotos && tourDetails.linkFotos.length > 0 && (
            <>
              <img className='card-ppal' 
              src={tourDetails.linkFotos[0]} 
              alt="Imagen Principal" 
              onClick={openGallery}
              />
              <div>
                {tourDetails.linkFotos.slice(1, 5).map((image, index) => (
                  <img className='card-sec' 
                  key={index} 
                  src={image} 
                  alt={`Imagenes Secundarias ${index + 1}`}
                  onClick={() => openGallery()} 
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <h5 className="description">{tourDetails.descripcion}</h5>
        <p className="price"> Precio: $ {tourDetails.precio}</p>
        {selectedImage && (
             <StyledGaleria>
             {selectedImage.map((image, index) => (
              <Card key={index}>
                <img className='img-container-2-1' 
                src={image} 
                alt={`Image ${index}`} />
              </Card>
             ))}
               <button className='button' 
               onClick={closeGallery}>
              Cerrar Galería
            </button>
        </StyledGaleria>
         )}
      </div>
    </StyledDetalles>
  );
  
  };

  export default Detalles;

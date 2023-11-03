import React, { useEffect, useState } from 'react';
import CardRecomendacion from './CardRecomendacion';
import styled from 'styled-components';


const StyledRecomendaciones = styled.div `

h2.reco-reco{
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

  h2.reco-reco{
    width: 90vw;
    font-size: 9vw;
    margin: 8% 0% 6% 3%
  }

}

`

function Recomendaciones() {
  const [data, setData] = useState([]); 

useEffect(() =>{
  const getTours = async () => {
    try {
      const response = await fetch('http://localhost:8081/tours/todos');
      const jsonData = await response.json();

      setData(jsonData);
      console.log(data);
      console.log("Datos obtenidos.");
    } catch (error) {
      console.error('Error al obtener los datos de la API:', error);
    }
  };

  getTours();
}, [])


  return (
    <StyledRecomendaciones>
      <>
        <div>
          <h2 className='reco-reco'>Recomendaciones</h2>
        </div>
        <div className='card-grid'>
          {data.map((tour) => (
            <CardRecomendacion key={tour.id}
              provincia={tour.name}
              titulo={tour.titulo}
              descripcion={tour.descripcion}
              linkFotos={tour.linkFotos[0]}
              precio={tour.precio}
              cantHoras={tour.cantHoras}
              id={tour.id}
            />
          )
          )}
        </div>
      </>
    </StyledRecomendaciones>
  );
};


export default Recomendaciones;


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
  width: 45;
  grid-template-columns: 1fr 1fr;
  gap: 5%;
  margin: 0% 5% 15% 5%;

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


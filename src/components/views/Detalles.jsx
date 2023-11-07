import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Galeria from './Galeria';




const StyledDetalles = styled.div `

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
   const [tourDetails, setTourDetails] = useState(null);
   const { id } = useParams(); 
   console.log('Valor de id:', id);

  useEffect(() =>{
   const getTourDetails = async () => {
     try {
       const response = await fetch(`http://localhost:8081/tours/todos`);
       if (response.ok) {
       const jsonData = await response.json();
        setTourDetails(jsonData);
       } else {
        console.error('Error al obtener los detalles del tour');
       }
     } catch (error) {
       console.error("Error al obtener datos:", error);
     }
   };

   getTourDetails();
 }, [id]);

 if (!tourDetails) {

  return <div>Cargando...</div>
 }


   return (
     <StyledDetalles>
     <>
       <div className='card-grid'>
         <h2 className='detail'>{tourDetails.titulo}</h2>
         <p>{tourDetails.descripcion}</p>
         <img src={tourDetails.imagenUrl} alt={tourDetails.titulo} />
         <Link to = {`/galeria`}>
         <button>Ver mas</button>
         </Link>
       </div>
       </>
     </StyledDetalles>   
   );
 };

 export default Detalles;
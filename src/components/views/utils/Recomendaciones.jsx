import React from 'react';
import styled from "styled-components"
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';



const StyledRecomendaciones = styled.div `



`


const Recomendaciones = () => {


    return (
        <StyledRecomendaciones>
          <div>
            <h2>Recomendaciones</h2>
          </div>
          <div className='recomendaciones'>
            { Recomendacion.map((item) => (
              <ImageListItem  key={item.img}>
                <img className='foto'
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  loading="lazy"
                />
                  <ImageListItemBar className='title2'
                  title={item.title} 
                />
              </ImageListItem>
            ))}
            </div>
        </StyledRecomendaciones>
      );
    }
    
    const Recomendacion = [
      {
        img: 'https://www.guiadecabanias.com/imgs/galerias/postal_1030.jpg',
        title: 'Este',
    
      },
      {
        img: 'https://cdn.discordapp.com/attachments/1162206131888869456/1167551418647982151/a8GQ9c_x_1256x620__2.webp?ex=654e89fe&is=653c14fe&hm=ef549287ff4b50f3ff80b9d8b12212f4dd2347e5d000bdf144c3f1f985fcf3aa&',
        title: 'Oeste',
       
      },
      {
        img: 'https://i.pinimg.com/736x/74/e5/55/74e5557fce67fffa50e3eaf128a550e8.jpg',
        title: 'Norte',
    
      },
      {
        img: 'https://cdn.pixabay.com/photo/2015/05/28/22/54/argentina-patagonia-788744_1280.jpg',
        title: 'Sur',
    
      }, 
      
    ];

export default Recomendaciones;
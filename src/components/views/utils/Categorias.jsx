import React from 'react';
import styled from "styled-components"
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';


const StyledCategorias = styled.div `

  .categorias{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 70vw;
    gap: 2%; 
    margin: 0% 0% 0% 9%;
  }

  h2{
    text-align: left;
    font-size: 2.5vw;
    margin: 4% 2% 4% 9%;
    color: rgba(36, 48, 110, 1);
  }

  .title{
    background: none;
  }

  .css-dasnyc-MuiImageListItemBar-title{
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0% 5% 5% 9%;
  }

  img.foto{
    width: 19vw;
    height: 45vh;
    border-radius: 5px;
    box-shadow: grey 0px 0px 5px,  0px 4px 11px;
    border: 1px solid grey;
    padding: 1%;
  }

  li{
    width: 25%;
    margin: 0%;
  }

  @media (max-width: 600px) {

    .categorias{
      display: grid;
      grid-template-columns: 1fr;
      width: 90vw;
      gap: 1%; 
      margin: 5%;
    }

    img.foto{
      width: 90vw;
      height: 40vh;
      border-radius: 5px;
      box-shadow: grey 0px 0px 5px,  0px 4px 11px;
      border: 1px solid grey;
      padding: 1%;
      margin: 2%;
    }

  h2{  
    font-size: 8vw;
    margin: 3vh;
  }

  .css-dasnyc-MuiImageListItemBar-title{
    font-size: 6vw;
    padding: 0 auto;
    margin: 0 auto;
  }

  li{
    width: 30vw;
  }
}

`

function Categorias() {

  return (
    <StyledCategorias>
      <div>
        <h2>Categorías</h2>
      </div>
      <div className='categorias'>
        { Categoria.map((item) => (
          <ImageListItem  key={item.img}>
            <img className='foto'
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              loading="lazy"
            />
              <ImageListItemBar className='title'
              title={item.title} 
            />
          </ImageListItem>
        ))}
        </div>
    </StyledCategorias>
  );
}

const Categoria = [
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

export default Categorias;



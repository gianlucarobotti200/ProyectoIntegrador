import React from 'react';
import styled from "styled-components"
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';


const StyledCategorias = styled.div `

.categorias{
  display: flex;
  height: 330px; 
}

h2{
  text-align: left;
  font-size: 30px;
  margin: 30px;
}

.title{
  background: none;
}

.css-dasnyc-MuiImageListItemBar-title{
  display: flex;
  color: white;
  font-size: 40px;
  texAlign: center;
  justify-content: center;
  margin: 0 auto;
  padding: 0px 0px 120px;
  font-weight: bold;
}

img.foto{
  border-radius: 5px;
  box-shadow: grey 0px 0px 5px,  0px 4px 11px;
  border: 1px solid grey;
}

li{
  width: 25%;
  margin: 1%;
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



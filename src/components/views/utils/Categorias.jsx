import React from 'react';
import styled from "styled-components"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


const StyledCategorias = styled.div`
    
`

function Categorias() {

  return (
    <StyledCategorias>
      <h2>Categorías</h2>
      <ImageList sx={{ width: 600, height: 550 }} cols={4} rowHeight={164}>
        { Categoria.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </StyledCategorias>
  );
}

const Categoria = [
  {
    img: 'https://cdn.pixabay.com/photo/2015/05/28/22/54/argentina-patagonia-788744_1280.jpg',
    title: 'Patagonia',
  },
  {
    img: 'https://i.pinimg.com/736x/74/e5/55/74e5557fce67fffa50e3eaf128a550e8.jpg',
    title: 'Cordoba',
  },
  {
    img: 'https://cdn.discordapp.com/attachments/1162206131888869456/1167551418647982151/a8GQ9c_x_1256x620__2.webp?ex=654e89fe&is=653c14fe&hm=ef549287ff4b50f3ff80b9d8b12212f4dd2347e5d000bdf144c3f1f985fcf3aa&',
    title: 'Mendoza',
  },
   {
    img: 'https://lp-cms-production.imgix.net/2021-09/La%20Boca%2C%20Buenos%20Aires%2C%20Argentina.jpg',
    title: 'Buenos Aires',
  },
];

export default Categorias;



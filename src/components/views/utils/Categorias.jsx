import React from 'react';
import styled from "styled-components"
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from 'react-router-dom';
import { Key } from '@mui/icons-material';

const StyledCategorias = styled.div`

  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;  

  .categorias{
    display: flex;
    justify-content: space-between;
    gap: 16px
  }

  .div-h2{
    display: flex;
    justify-content: flex-start;
    text-align: left;
    font-size: 1.2rem;
    margin: 1% 1% 0% 3%;       
    color: #24306E;
    padding: 2% 0% 2% 0%;
    font-weight: bolder;
    border-bottom: 2px solid rgba(36, 48, 110, 1);
    h2{
      font-size: 1.5rem;
    }
  }

  .div-categorias{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .title-categoria{
    background: #0000002b;
    font-weight: 700;
    height: 100%;
    border-radius: 5px;
  }

  .css-dasnyc-MuiImageListItemBar-title {
    font-size: 40px;
    line-height: normal !important;
  }
  
  .image-categoria{
    font-size: 40px;
    font-weight: 700;
  }

  img.foto{
    border-radius: 5px;
    box-shadow: #80808047 2px 2px 2px 1px;
  }

  li{
    width: 272px;
    height: 150px !important;
  }

  @media (max-width: 1340px) {
  
    .categorias{
      display: flex;
      justify-content: space-between;
    }
  }
  @media (max-width: 600px) {
    .categorias{
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
    }
    

    li{
      width: 50vw;
      
    }
}`

function Categorias() {
  return (
      <StyledCategorias>
        <div className='div-categorias'>
          <div className='div-h2'>
          </div>
          <div className='categorias'>
            {Categoria.map((item, index) => (
              <Link to={`/resultados/${item.title}`} key={index}>
                <ImageListItem key={item.img}>
                  <img className='foto'
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    loading="lazy"
                  />
                  <ImageListItemBar className='title-categoria' title={item.title} />
                </ImageListItem>
              </Link>
            ))}
          </div>
        </div>
      </StyledCategorias>
  );
}

const Categoria = [
  {
    img: 'https://i.pinimg.com/736x/74/e5/55/74e5557fce67fffa50e3eaf128a550e8.jpg',
    title: 'Norte',

  },
  {
    img: 'https://cdn.pixabay.com/photo/2015/05/28/22/54/argentina-patagonia-788744_1280.jpg',
    title: 'Sur',
  },
  {
    img: 'https://www.guiadecabanias.com/imgs/galerias/postal_1030.jpg',
    title: 'Este',

  },
  {
    img: 'https://cdn.discordapp.com/attachments/1162206131888869456/1167551418647982151/a8GQ9c_x_1256x620__2.webp?ex=654e89fe&is=653c14fe&hm=ef549287ff4b50f3ff80b9d8b12212f4dd2347e5d000bdf144c3f1f985fcf3aa&',
    title: 'Oeste',
  }
];

export default Categorias;



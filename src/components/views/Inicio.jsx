import React, { useEffect, useRef, useState } from 'react'
import Buscador from './utils/Buscador'
import Categorias from './utils/Categorias'
import Recomendaciones from './utils/Recomendaciones'
import Productos from './utils/Productos'
import styled from "styled-components"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const StyledInicio = styled.main`
    margin-top: 4.5%;
`

const StyledBuscador = styled.div`
`

const Imagen = styled.img`
  width: 55%;
  height: 30vh;
  `

const SvgOverlay = styled.img`
  position: absolute;
  top: 50%;
  left: 30%;
  pointer-events: none;
  z-index: 999;
`


const Inicio = () => {

    return (
        <StyledInicio>
            <StyledBuscador>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                    >
                        {imagenes.map((item) => {
                            return (<SwiperSlide key={item.id}><Imagen src={item.imgUrl} /><SvgOverlay src="./src/components/img/lema.svg" alt="Overlay SVG" /></SwiperSlide>)
                        })}

                    </Swiper>
                    <Buscador />
                </StyledBuscador>
                <Categorias />
                <Recomendaciones />
        </StyledInicio>
    )
}
export default Inicio;

const imagenes = [
    {
        id: 1,
        imgUrl: "./src/components/img/banner1.jpg"
    },
    {
        id: 2,
        imgUrl: "./src/components/img/banner2.png"
    },
    {
        id: 3,
        imgUrl: "./src/components/img/banner3.jpg"
    },
    {
        id: 4,
        imgUrl: "./src/components/img/banner4.jpg"
    }
]



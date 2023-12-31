import React, { useState, useEffect} from 'react'
import CardProducto from './CardProducto'
import fetchWithToken from '../login/Interceptor'
import config from '../../../config';


const Productos = () => {

  const [productos, setProductos] = useState([]);

  const getProductos = async () => {

    const res = await fetchWithToken(config.host+"/tours/todos")
    const data = await res.json()
    setProductos(data)
  }

  useEffect(() => {
    getProductos()
  },[])
  console.log(productos)
  return (
    <>
      <div>Productos</div>

      {productos.map((producto) => 
        
        <CardProducto
          key={producto.id} 
          imgUrl={producto.linkFotos}  
          provincia={producto.provincia} 
          titulo={producto.titulo} 
          descripcion={producto.descripcion} 
          precio={producto.precio} 
          duracion={producto.cantHoras} 
        />
      )}

    </>

  )
}

export default Productos
import React, { useState, useEffect} from 'react'
import CardProducto from './CardProducto'

const Productos = () => {

  const [productos, setProductos] = useState([]);

  const getProductos = async () => {
    const res = await fetch("http://localhost:8080/tours/todos")
    const data = await res.json()
    setProductos(data)
  }

  useEffect(() => {
    getProductos()
  },[])

  return (
    <>
      <div>Productos</div>

      {productos.map((producto) => 
        <CardProducto
          key={producto.id} 
          imgUrl={`./src/components/img/fotosTours/${producto.id}/foto1.jpeg`}  
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
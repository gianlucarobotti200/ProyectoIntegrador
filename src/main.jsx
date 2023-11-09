import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Admin from './components/views/admin/Admin.jsx'
import Inicio from './components/views/Inicio.jsx' 
import Detalles from './components/views/Detalles.jsx' 
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Galeria from './components/views/Galeria.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}>
        <Route path='/inicio' element={<Inicio/>} />
        <Route path='/admintours' element={<FormTours/>}/>
        <Route path='/detalles/:id' element={<Detalles/>}/>
        <Route path='/galeria' element={<Galeria/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
)

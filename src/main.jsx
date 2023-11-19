import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import FormTours from './components/views/FormTours.jsx';
import Inicio from './components/views/Inicio.jsx'; 
import Galeria from './components/views/Galeria.jsx';
import Detalles from './components/views/utils/Detalles.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}>
        <Route path='/inicio' element={<Inicio/>} />
        <Route path='/admintours' element={<FormTours/>}/>
        <Route path='/detalles/:id' element={<Detalles/>}/>
        <Route path='/galeria/:id' element={<Galeria/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
)

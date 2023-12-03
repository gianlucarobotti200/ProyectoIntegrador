import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Registro from './components/views/login/Registro.jsx'
import Inicio from './components/views/Inicio.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminCategorias from './components/views/admin/AdminCategorias.jsx'
import AdminCaracteristicas from './components/views/admin/AdminCaracteristicas.jsx'
import AdminTours from './components/views/admin/AdminTours.jsx'
import Login from './components/views/login/Login.jsx'
import Detalles from './components/views/utils/Detalles.jsx';
import AdminModificarTour from './components/views/admin/AdminModificarTour.jsx'
import AdminPoliticas from './components/views/admin/AdminPoliticas.jsx'
import ReservaTour from './components/views/utils/ReservarTour.jsx'
import Favoritos from'./components/views/utils/Favoritos.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/inicio' element={<Inicio />} />
        <Route path='/admintours' element={<AdminTours />} />
        <Route path='/admincaracteristicas' element={<AdminCaracteristicas />} />
        <Route path='/admincategorias' element={<AdminCategorias />} />
        <Route path='/adminpoliticas' element={<AdminPoliticas />} />
        <Route path='/detalles/:id' element={<Detalles/>} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/detalles/:id' element={<Detalles/>}/>
        <Route path='/tours/:id' element={<AdminModificarTour/>}/>
        <Route path='/modificartour/:id' element={<AdminModificarTour/>}/>
        <Route path='/reservartour/:id' element={<ReservaTour/>}/>
        <Route path='/favoritos' element={<Favoritos/>}/>

      </Route>
    </Routes>
  </BrowserRouter>
)
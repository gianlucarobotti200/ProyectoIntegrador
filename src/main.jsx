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


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/inicio' element={<Inicio />} />
        <Route path='/admintours' element={<AdminTours />} />
        <Route path='/admincaracteristicas' element={<AdminCaracteristicas />} />
        <Route path='/admincategorias' element={<AdminCategorias />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/login' element={<Login/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
)

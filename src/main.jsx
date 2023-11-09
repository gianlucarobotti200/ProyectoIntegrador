import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Admin from './components/views/admin/Admin.jsx'
import Registro from './components/views/login/Registro.jsx'
import Inicio from './components/views/Inicio.jsx' 
import {BrowserRouter, Routes, Route} from "react-router-dom"


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}>
        <Route path='/inicio' element={<Inicio/>} />
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/registro' element={<Registro/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
)

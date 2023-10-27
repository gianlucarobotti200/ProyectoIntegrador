import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import FormTours from './components/views/FormTours.jsx'
import Inicio from './components/views/Inicio.jsx' 
import {BrowserRouter, Routes, Route} from "react-router-dom"


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}>
        <Route path='/inicio' element={<Inicio/>} />
        <Route path='/admintours' element={<FormTours/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
)

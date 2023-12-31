import React, { useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './componenets/Header'
import MainPage from './pages/MainPage'
import ServicesPage from './pages/ServicesPage'
import Footer from './componenets/Footer'
import WhatsApp from './componenets/WhatsApp'
import '@splidejs/react-splide/css/skyblue';
import Login from './pages/Login'
import RandevuPage from './pages/RandevuPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
     <div className='app'>
      <ToastContainer/>
       <BrowserRouter>
         <Header/>
        <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/services' element={<ServicesPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/randevu' element = {<RandevuPage/>}/>
        </Routes>
        <WhatsApp/>
        <Footer/>
      </BrowserRouter>
     </div>
  )
}

export default App
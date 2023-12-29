import React, { useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './componenets/Header'
import MainPage from './pages/MainPage'
import ServicesPage from './pages/ServicesPage'
import Footer from './componenets/Footer'
import WhatsApp from './componenets/WhatsApp'
import '@splidejs/react-splide/css/skyblue';
import Login from './pages/Login'

const App = () => {
  return (
     <div className='app'>
       <BrowserRouter>
         <Header/>
        <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/services' element={<ServicesPage/>}/>
        <Route path='/login' element={<Login/>}/>
        </Routes>
        <WhatsApp/>
        <Footer/>
      </BrowserRouter>
     </div>
  )
}

export default App
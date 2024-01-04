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
import AdminPage from './pages/AdminPage'


const App = () => {
  //state de kullanıcının giriş yapıp yapmadığını tutuyoruz 
  const [stateUser,setStateUser]= useState(null)

  return (
     <div className='app'>
      <ToastContainer/>
       <BrowserRouter>
         <Header stateUser={stateUser}/>
        <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/services' element={<ServicesPage/>}/>
        <Route path='/login' element={<Login setStateUser={setStateUser}/>}/>
        <Route path='/randevu' element = {<RandevuPage setStateUser={setStateUser}/>}/>
        <Route path='/admin' element={<AdminPage/>} />
        </Routes>
        <WhatsApp/>
        <Footer/>
      </BrowserRouter>
     </div>
  )
}

export default App
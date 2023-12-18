import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './componenets/Header'
import MainPage from './pages/MainPage'
import ServicesPage from './pages/ServicesPage'
import Footer from './componenets/Footer'

const App = () => {
  return (
      <BrowserRouter>
         <Header/>
        <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/services' element={<ServicesPage/>}/>
        </Routes>
        <Footer/>
      
      </BrowserRouter>
  )
}

export default App
import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './componenets/Header'
import MainPage from './pages/MainPage'

const App = () => {
  return (
      <BrowserRouter>
         <Header/>
        <Routes>
        <Route path='/' element={<MainPage/>}/>
        </Routes>
      
      </BrowserRouter>
  )
}

export default App
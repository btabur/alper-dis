import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './componenets/Header'

const App = () => {
  return (
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route/>
        </Routes>
      
      </BrowserRouter>
  )
}

export default App
import React from 'react'

import Services from '../componenets/Services/Services'
import About from '../componenets/About/About'
import Info from '../componenets/Info'
import Staff from '../componenets/Staff/Staff'
import Questions from '../componenets/Questions/Questions'
import Comments from '../componenets/Comments/Comments'
import Contact from '../componenets/Contact'
import Banner from '../componenets/Banner'
import Slider from '../componenets/Slider/Slider'

const MainPage = () => {
  return (
    <main>
      <Slider/>
      <Services/>
      <About/>
      <Info/>
      <Staff/>
      <Questions/>
      <Comments/>
      <Contact/>
    </main>
  )
}

export default MainPage

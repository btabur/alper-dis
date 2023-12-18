import React from 'react'
import Banner from '../componenets/Banner'
import Services from '../componenets/Services/Services'
import About from '../componenets/About/About'
import Info from '../componenets/Info'
import Staff from '../componenets/Staff/Staff'
import Questions from '../componenets/Questions/Questions'
import Comments from '../componenets/Comments/Comments'
import Contact from '../componenets/Contact'
import Footer from '../componenets/Footer'

const MainPage = () => {
  return (
    <main>
      <Banner/>
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

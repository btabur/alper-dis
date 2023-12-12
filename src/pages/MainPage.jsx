import React from 'react'
import Banner from '../componenets/Banner'
import Services from '../componenets/Services/Services'
import About from '../componenets/About/About'
import Info from '../componenets/Info'
import Staff from '../componenets/Staff/Staff'
import Questions from '../componenets/Questions/Questions'
import Comments from '../componenets/Comments/Comments'

const MainPage = () => {
  return (
    <div>
      <Banner/>
      <Services/>
      <About/>
      <Info/>
      <Staff/>
      <Questions/>
      <Comments/>
    </div>
  )
}

export default MainPage

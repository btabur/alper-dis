import React from 'react'
import Banner from '../componenets/Banner'
import Services from '../componenets/Services/Services'
import About from '../componenets/About/About'
import Info from '../componenets/Info'
import Staff from '../componenets/Staff/Staff'

const MainPage = () => {
  return (
    <div>
      <Banner/>
      <Services/>
      <About/>
      <Info/>
      <Staff/>
    </div>
  )
}

export default MainPage

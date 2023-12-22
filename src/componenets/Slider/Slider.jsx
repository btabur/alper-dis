import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Banner from '../Banner';
const Slider = () => {
  return (
   <div>
     <Splide className='slider' aria-label="My Favorite Images">
    <SplideSlide>
     <Banner/>
    </SplideSlide>
    <SplideSlide>
      <img src="protez.jpeg" alt="Image 2"/>
    </SplideSlide>
  </Splide>
   </div>
  )
}

export default Slider

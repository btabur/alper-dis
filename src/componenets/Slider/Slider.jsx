import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Banner from '../Banner';
import Slider_1 from './Slider_1';
import Slide_2 from './Slide_2';
const Slider = () => {
  const options = {
    type         : 'loop',
    autoplay     : true,
    interval: 2000, // 2 saniye
  
  };
  return (
   <div>
     <Splide  options={options}
     className='slider' aria-label="My Favorite Images">
    <SplideSlide>
     <Banner/>
    </SplideSlide>
    <SplideSlide>
      <Slider_1/>
    </SplideSlide>
    <SplideSlide>
      <Slide_2/>
    </SplideSlide>
  </Splide>
   </div>
  )
}

export default Slider

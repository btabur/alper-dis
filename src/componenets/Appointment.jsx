import React from 'react'
import { TbClockHour4 } from "react-icons/tb";
const Appointment = () => {
  return (
    <section className='appointment'>
      <p className='header'>
        Randevu Al
      </p>
      <div className='body'>
        <p>Hemen Ara</p>
        <span>555 55 55</span>
      </div>
      <div className='hour'>
      <TbClockHour4 />
      <p>09:00 - 17:00</p>
      <p>Hafta İçi</p>
      </div>
      <div className='footer'></div>
    </section>
  )
}

export default Appointment

import React from 'react'
import Card from './Card'

const Staff = () => {
    const doctors = [
        {
            photo:'./profil.png',
            name: 'Alper Karadağ',
            branch: ' Diş Hekimi'
        }, 
        {
            photo:'./public/doctor-2.png',
            name: 'Ahmet Çalışkan',
            branch: 'Diş Hekimi'
        },
        {
            photo:'./public/doctor-3.png',
            name: 'Ahmet Çalışkan',
            branch: 'Asistan'
        },
        {
            photo:'./public/doctor-4.png',
            name: 'Fatma Aktaş',
            branch: 'Hemşire'
        },
    ]
  return (
    <section className='staff'>
        <h3>Çalışanlarımız</h3>
        <h2>Uzmanlarımızla Tanışın </h2>
        <div className="cards">
            {doctors.map((item,i) => (
                <Card key={i} doctor = {item}/>
            ))}
        </div>

    </section>
  )
}

export default Staff

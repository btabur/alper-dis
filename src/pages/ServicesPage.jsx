import React, { useState } from 'react'
import Services from '../componenets/Services/Services'
import { ServicesListAll } from '../componenets/Services/ServisList'
import Card from '../componenets/Services/Card'
import { Link } from 'react-router-dom'
import ServicesDetail from '../componenets/Services/ServicesDetail'

const ServicesPage = () => {
  const [id,setId]=useState(1);
  
  return (
    <main>
      <ServicesDetail id={id}/>
       <section className="services">
    <h3>Hizmetlerimiz</h3>
    <h2>Tedavi Listemiz</h2>
    <div className='cards'>
        {ServicesListAll.map((item,index)=> (
                <Card setId={setId}  key={index} service={item}/>
        ))}
    </div>
   </section>
    </main>
  )
}

export default ServicesPage
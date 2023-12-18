import React from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'
import { serviceList } from './ServisList'

const Services = () => {
  return (
   <section className="services">
    <h3>Hizmetlerimiz</h3>
    <h2>Tedavi Listemiz</h2>
    <div className='cards'>
        {serviceList.map((item,index)=> (
                <Card key={index} service={item}/>
        ))}
    </div>
   
    <Link to={'/services'}>
      <button>Daha Fazla</button>
    </Link>
   </section>
  )
}

export default Services
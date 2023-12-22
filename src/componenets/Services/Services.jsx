import React from 'react'
import Card from './Card'
import { Link, useNavigate } from 'react-router-dom'
import { serviceList } from './ServisList'

const Services = () => {
  const navigate = useNavigate();
  const handleClick= ()=> {
   navigate('/services')
  }
  return (
   <section className="services">
    <h3>Hizmetlerimiz</h3>
    <h2>Tedavi Listemiz</h2>
    <div onClick={handleClick } className='cards'>
        {serviceList.map((item,index)=> (
                <Card key={index} service={item}/>
        ))}
    </div>
   
    <Link to={'/services'}>
      <button className='button'>Daha Fazla</button>
    </Link>
   </section>
  )
}

export default Services
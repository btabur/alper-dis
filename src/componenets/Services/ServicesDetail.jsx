import React from 'react'
import { ServicesListAll } from './ServisList'

const ServicesDetail = ({id}) => {
  const service = ServicesListAll.find(i=>i.id==id);
  return (
   <article className='services-detail'>
    <img  src={service.detail.photo}/>
    <div>
        <h2>{service.detail.title}</h2>
        <p>{service.detail.desc}</p>
    </div>
   
   </article>
  )
}

export default ServicesDetail
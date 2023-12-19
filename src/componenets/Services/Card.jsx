import React from 'react'

const Card = ({service, setId}) => {
  const handleClick = ()=> {
         if(setId){ 
          setId(service.id)
         }
  }
  return (
    <article onClick={handleClick} className='card'>
        <div>
        <img src={service.photo} alt="" />
        </div>
        <h4>{service.name}</h4>
        <p>{service.desc}</p>
    </article>
  )
}

export default Card
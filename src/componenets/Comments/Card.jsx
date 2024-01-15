import React from 'react'
import { SlLike } from "react-icons/sl";

const Card = ({card}) => {
  return (
    <article className="card">
  
        <p>{card.name}</p>
        <span>{card.com}</span>
        <div className="background"> 
         
          <SlLike className='icon' />
         </div>
       
    </article>
  )
}

export default Card
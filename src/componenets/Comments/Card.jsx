import React from 'react'
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";

const Card = ({card}) => {
  console.log(card)
  return (
    <article className="card">
  
        <p>{card.name}</p>
        <span>{card.com}</span>
        <div className="background"> 
        {card.isHappy ? 
           <SlLike className='icon' /> : 
           <SlDislike className='icon' />
        }
         
         </div>
       
    </article>
  )
}

export default Card
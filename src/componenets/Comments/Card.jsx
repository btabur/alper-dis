import React from 'react'
import { IoStar } from "react-icons/io5";

const Card = ({card}) => {
  return (
    <article className="card">
        <img src={card.photo} alt="" />
        <p>{card.name}</p>
        <span>{card.com}</span>
        <div className="stars">
             {[1,2,3,4,5].map((rate)=> (
                <IoStar style={{color: rate <= card.rate ? 'gold' : 'gray'}} />
             ))}
        </div>
    </article>
  )
}

export default Card
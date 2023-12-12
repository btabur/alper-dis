import React from 'react'

const Card = ({doctor}) => {
  return (
    <article className="card">
        <div className="background">
        <img src={doctor.photo}  />
        </div>
        <p>{doctor.name}</p>
        <span>{doctor.branch}</span>
      
    </article>
  )
}

export default Card

import React from 'react'

const TreatmentItem = ({treat}) => {
    console.log(treat)
  return (
    <main className='treatment-item'>
        <p>{treat.user.name}</p>
        <p>{treat.treatment}</p>
        <p>{treat.date}</p>
      

    </main>
  )
}

export default TreatmentItem

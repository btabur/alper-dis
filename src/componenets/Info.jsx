import React from 'react'

const Info = () => {
    const cardCustomer =[
        {number:'1287+',
         desc: 'Memnun Müşteri'
        },
        {
            number:'734+',
            desc: 'Online Randevu'
        },
        {
            number:'5+',
            desc:'Alınan ödüller'
        },
        {
            number:'17+',
            desc:'Tecrübe'
        }
    ]
  return (
    <article className='info'>
        {cardCustomer.map((item,index)=> (
            <div key={index} className="card">
                <p>{item.number}</p>
                <span>{item.desc}</span>
            </div>
        ))}
    </article>
  )
}

export default Info
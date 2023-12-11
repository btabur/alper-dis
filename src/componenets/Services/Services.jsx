import React from 'react'
import Card from './Card'

const Services = () => {

    const serviceList =[
        {
         name:'İmplant',
         desc:'Şaşırtıcı sonuçlara sahip ileri teknoloji',
         photo:'./public/icons/icon-4.svg'   
        },
        {
            name:'Ortodonti',
            desc:'Temizlenmiş ve dezenfekte edilmiş kanal tedavisi',
            photo:'./public/icons/icon-1.png'   
        },
        {
            name:'Beyazlatma',
            desc:'El aletleriyle profesyonel temizlik',
            photo:'./public/icons/icon-2.svg'   
        },
        {
            name:'Diş bakımı',
            desc:'Profesyonel ağız hijyeni tedavileri.',
            photo:'./public/icons/icon-3.svg'   
        }


    ]
  return (
   <section className="services">
    <h3>Hizmetlerimiz</h3>
    <h2>Tedavi Listemiz</h2>
    <div className='cards'>
        {serviceList.map((item,index)=> (
                <Card service={item}/>
        ))}
    </div>
    <button>Daha Fazla</button>
   </section>
  )
}

export default Services
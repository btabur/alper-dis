import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'

const Info = () => {

    const [allTreat,setAllTreat] = useState([])

      //Verileri Getirme
  const randevularRef = collection(db,'randevular')

   //sadece şimdiki kullanıcının verilerini çekip state e aktarıyoruz
 useEffect(()=> {
    onSnapshot(randevularRef,(snapShot)=> {
      const allrandevu = []
      snapShot.docs.forEach((doc)=>{
        allrandevu.push(doc.data())
        
      })
      setAllTreat(allrandevu)
     
    })
  
   },[])
    const cardCustomer =[
        {number:'1287+',
         desc: 'Memnun Müşteri'
        },
        {
            number:allTreat?.length,
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
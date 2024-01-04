import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { db } from '../firebase/config';
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { formatDate } from '../constants';

const TreatmentItem = ({treat}) => {

  const [isPassed,setIsPassed] = useState(false)

  //randevuyu silme işlemi
  const delDoc = () => {
    //fiebaseden siliyoruz
     deleteDoc(doc(db,'randevular',treat.id))
     .then(()=> {
      toast.success('Randevunuz Silindi')
       //yerel hafızadan siliyoruz
      localStorage.removeItem('randevuAlper')
    })

  }
  useEffect(()=> {

    // randevunun tarihine göre geçip geçmediğine karar veriliyor
    const currentTime = new Date().getTime();
    const randevuDate= new Date(treat.date).getTime();
    if(currentTime > randevuDate) {
      setIsPassed(true)
    }






  },[treat])


 

  return (
    <main className='treatment-item'>
      <div className='left'>
        <p>{treat.user.name}</p>
        <p>{treat.treatment}</p>
        <p>{formatDate(treat.date)} , {treat.hour} </p>
        
      </div>
      <div className='right'>
        {!isPassed ?
         <p className={treat.isChecked ? 'checked': 'unChecked'}>
          {treat.isChecked ? 'Onaylandı' : 'Onaylanmadı'}</p>
          
        : 
         <p>Geçmiş Randevu</p>
        }
        {!isPassed &&
         <div className='background'>
         <MdDelete onClick={delDoc} className='icon-delete' />
         </div>}
      </div>
       
      

    </main>
  )
}

export default TreatmentItem

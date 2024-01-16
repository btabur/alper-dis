import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { db } from '../firebase/config';
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { formatDate,compareDates, getCurentDay } from '../constants';

const TreatmentItem = ({treat}) => {

  const [isPassed,setIsPassed] = useState()

  //randevuyu silme işlemi
  const delDoc = () => {
    //fiebaseden siliyoruz
     deleteDoc(doc(db,'randevular',treat.id))
     .then(()=> {
      toast.success('Randevunuz Silindi')
    })

  }
  useEffect(()=> {


    const isPass = compareDates(getCurentDay(),treat.date)

    setIsPassed(isPass)




  },[treat])


 

  return (
    <main className='treat-item'>
      <div className="treat-item-head">
      <p>{treat.user.name}</p>
      <p>{formatDate(treat.date)}  </p>

      </div>
      <div className="treat-item-body">
        <p><b>Saat: </b>{treat.hour.join(',')}</p>
         <p><b>Tedavi Türü:</b>{treat.treatment}</p> 
        <p><b>Not:</b> {treat.not}</p>
      </div>
      <div className='treat-item-footer'>
        <div className="left">
        {isPassed ==1 ||isPassed==0 ?
         <p className={treat.isChecked ? 'checked': 'unChecked'}>
          {treat.isChecked ? 'Onaylandı' : 'Onay Bekliyor'}</p>
          
        : 
         <span>Geçmiş Randevu</span>
        }
       

        </div>
        <div className="right">
        {isPassed ==1 || isPassed==0 ?
         <div className='background'>
         <MdDelete onClick={delDoc} className='icon-delete' />
         </div> : ''}

        </div>
      
      </div>
       
      

    </main>
  )
}

export default TreatmentItem

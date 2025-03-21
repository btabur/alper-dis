import React, { useEffect, useState } from 'react'
import { compareDates, formatDate, getCurentDay } from '../constants'
import { doc, updateDoc,getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
const TreatAdminItem = ({treat}) => {
    const [isPassed,setIsPassed] = useState();
    const [newTreat,setNewTreat] = useState(treat);

    useEffect(()=> {
      const isPass = compareDates(getCurentDay(),treat.date)
          setIsPassed(isPass)
      },[treat])

    const handleChecked =async (e)=> {
      const docRef = doc(db, 'randevular', treat.id);

      await getDoc(docRef).then((res)=> setNewTreat(res.data()))
  
      await  updateDoc (docRef,{
        
        ...newTreat, isChecked:!newTreat.isChecked
      }).then(()=>{
        setNewTreat({...newTreat,isChecked:!newTreat.isChecked})
        !newTreat.isChecked ? toast.success('Randevu onaylandı') :
        toast.info('Randevu onayı geri alındı')
      
      })
      
        
    }

     //randevuyu silme işlemi
  const delDoc = () => {
    //fiebaseden siliyoruz
     deleteDoc(doc(db,'randevular',treat.id))
     .then(()=> {
      toast.success('Randevuyu Silindiniz')
    })

  }



   
  return (
    <section className='treatAdminItem'>
      <div className="item-head">
         <p> { treat.user.name}</p>
         <p>{formatDate(treat.date)} </p>
        
        
      </div>
      <div className="item-body">
      <p>
        <b>Saat:</b>{' '}
        <span>{Array.isArray(treat.hour) ? treat.hour.join(', ') : treat.hour}</span>
      </p>
           <p><b>Tel: </b>  {treat.phone}</p> 
          <p> <b>Tedavi Türü:</b>{treat.treatment}</p>
          <p><b>Not:</b> {treat.not}</p>
      </div>
      <div className="item-footer">
        <div className="left">
            {isPassed== -1 ? 
          <span>Geçmiş Randevu</span> : 
          <div>
              <button onClick={handleChecked} className={newTreat.isChecked ? ' btn checked' : ' btn unChecked'} >
              {newTreat.isChecked ? 'Onaylandı': 'Onayla'}</button>
          </div>
          }
        </div>
        <div className="right">
          <div className="icon-background">
             <MdDelete onClick={delDoc} className='icon' />
          </div>
        
        </div>
      
      </div>

     

     
     
      
      

     
    
     

      
    </section>
  )
}

export default TreatAdminItem

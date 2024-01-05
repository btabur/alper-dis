import React, { useEffect, useState } from 'react'
import { formatDate } from '../constants'
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { toast } from 'react-toastify';

const TreatAdminItem = ({treat}) => {
    const [isPassed,setIsPassed] = useState(false);
    const [newTreat,setNewTreat] = useState(treat);
    const [isCheck,setIsCheck]=useState()

    useEffect(()=> {
        const currentTime = new Date();
        const dateTime = new Date(treat.date);

        if(dateTime<currentTime) {
            setIsPassed(true);
        }else {
            setIsPassed(false)
        }
        setIsCheck(treat.isChecked)
       
        

     

    },[])

    const handleChecked =async ()=> {
      const docRef = doc(db, 'randevular', treat.id);
  
      await  updateDoc (docRef,{
        
        ...treat, isChecked:!isCheck
      }).then(()=>{
        setNewTreat({...treat,isChecked:!treat.isChecked})
        setIsCheck(!isCheck)
        isCheck.isChecked ? toast.success('Randevu onaylandı') :
        toast.info('Randevu onayı geri alındı')
      
      })
      
        
    }
  return (
    <section className='treatAdminItem'>
       <p> { treat.user.name}</p>
       <p> {treat.phone}</p>
       <p>{treat.treatment}</p>
       <p>{formatDate(treat.date)} , {treat.hour} </p>

      {isPassed ? 
      <span>Geçmiş Randevu</span> : 
      <div>
          <button onClick={handleChecked} className={newTreat.isChecked ? ' btn checked' : ' btn unChecked'} >
          {newTreat.isChecked ? 'Onaylandı': 'Onayla'}</button>
          <button className='btn delete-treat'>Reddet</button>
      </div>
      }
    
     

      
    </section>
  )
}

export default TreatAdminItem

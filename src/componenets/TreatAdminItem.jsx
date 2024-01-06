import React, { useEffect, useState } from 'react'
import { compareDates, formatDate, getCurentDay } from '../constants'
import { doc, updateDoc,getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { toast } from 'react-toastify';

const TreatAdminItem = ({treat}) => {
    const [isPassed,setIsPassed] = useState();
    const [newTreat,setNewTreat] = useState(treat);

    useEffect(()=> {
       
        const isPass = compareDates(getCurentDay(),treat.date)

        setIsPassed(isPass)

       
    
    },[])

    const handleChecked =async ()=> {
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

  


   
  return (
    <section className='treatAdminItem'>
       <p> { treat.user.name}</p>
       <p> {treat.phone}</p>
       <p>{treat.treatment}</p>
       <p>{formatDate(treat.date)} , {treat.hour} </p>

      {isPassed== -1 ? 
      <span>Geçmiş Randevu</span> : 
      <div>
          <button onClick={handleChecked} className={newTreat.isChecked ? ' btn checked' : ' btn unChecked'} >
          {newTreat.isChecked ? 'Onaylandı': 'Onayla'}</button>
      </div>
      }
    
     

      
    </section>
  )
}

export default TreatAdminItem

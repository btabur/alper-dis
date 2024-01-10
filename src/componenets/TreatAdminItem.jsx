import React, { useEffect, useState } from 'react'
import { compareDates, formatDate, getCurentDay } from '../constants'
import { doc, updateDoc,getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
const TreatAdminItem = ({treat}) => {
    const [isPassed,setIsPassed] = useState();
    const [newTreat,setNewTreat] = useState(treat);

    useEffect(()=> {
       
        const isPass = compareDates(getCurentDay(),treat.date)

        setIsPassed(isPass)

       
    
    },[])

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

  


   
  return (
    <section className='treatAdminItem'>
      <div className="item-head">
         <p> { treat.user.name}</p>
         <p>{formatDate(treat.date)} , {treat.hour} </p>
        
      </div>
      <div className="item-body">
           <p> Tel:  {treat.phone}</p> 
          <p> Tedavi Türü:{treat.treatment}</p>
          <p>Not:</p>
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
             <MdEdit className='icon' />
          </div>
          <div className="icon-background">
             <MdDelete className='icon' />
          </div>
        
        </div>
      
      </div>

     

     
     
      
      

     
    
     

      
    </section>
  )
}

export default TreatAdminItem

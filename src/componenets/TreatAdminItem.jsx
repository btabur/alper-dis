import React, { useEffect, useState } from 'react'
import { formatDate } from '../constants'

const TreatAdminItem = ({treat}) => {
    const [isPassed,setIsPassed] = useState(false);

    useEffect(()=> {
        const currentTime = new Date();
        const dateTime = new Date(treat.date);

        if(dateTime<currentTime) {
            setIsPassed(true);
        }else {
            setIsPassed(false)
        }

     

    },[])

    const handleChecked = ()=> {
        
    }
  return (
    <section className='treatAdminItem'>
       <p> { treat.user.name}</p>
       <p> {treat.phone}</p>
       <p>{treat.treatment}</p>
       <p>{formatDate(treat.date)} , {treat.hour} </p>

      {isPassed ? 
      <span>Geçmiş Randevu</span> : 
      <button onClick={handleChecked} className={formatDate.isChecked ? 'checked' : 'unChecked'} >
        {formatDate.isChecked ? 'Onaylandı': 'Onayla'}</button>}

      
    </section>
  )
}

export default TreatAdminItem

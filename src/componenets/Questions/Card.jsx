import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";

const Card = ({card,index}) => {
    const [isOpen,setIsOpen]=useState(false);

    useEffect(()=>{
        if(index===0) {
            setIsOpen(true)
        }
    },[])

  return (
   <article className='card'>
    <p>{card.question}</p>
   {isOpen && <span>{card.answer}</span>}
    <div className='icons'>
      {!isOpen &&  
        <div onClick={()=> setIsOpen(true)}
         className="icon">
         <FaPlus style={{color:'#01CFC9'}} />
        </div>}
       { isOpen &&
        <div onClick={()=> setIsOpen(false)}
         className="icon">
             <FaMinus  style={{color:'#01CFC9'}} />
        </div>}
    </div>
   </article>
  )
}

export default Card

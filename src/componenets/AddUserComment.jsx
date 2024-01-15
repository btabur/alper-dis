import React, { useEffect, useRef, useState } from 'react'
import { FaRegFaceSmile } from "react-icons/fa6";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { GrSend } from "react-icons/gr";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { db } from '../firebase/config';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const AddUserComment = ({setIsShowAddComment,currentUser}) => {
    const commentRef = useRef();
    const [isHappy,setIsHappy] = useState(true)
     //kullanıcıları Getirme
  const usersRef = collection(db,'Users')

    const handleSend = ()=> {
        const newComment = commentRef.current.value;
    
            updateInFireStore(newComment,isHappy)
    }

    const updateInFireStore = (comment,isHappy)=> {
        const docRef = doc(db, 'Users',currentUser.uid);
         updateDoc(docRef,{
            ...currentUser, comment,isHappy
        }).then (()=> {
          toast.success('Yorumunuz İçin Teşekkürler')
          setIsShowAddComment(false)
        })
          .catch(()=> toast.info('bir oluştu'))
      }
  return (
    <section className='add-user-comment'>
        <div className="head">
             <IoIosCloseCircleOutline onClick={()=>setIsShowAddComment(false) } className='icon-close' />
        
        <p>{currentUser?.name}</p>
        </div>

        <textarea ref={commentRef} type="text" defaultValue={currentUser?.comment} placeholder='Yorumunuz' />
        <div className="footer">
            <div className="left">
                <div onClick={()=>setIsHappy(true)} className={`background ${isHappy ? 'active' : ''}`}>
                    <FaRegFaceSmile className='icon'/>
                </div>
                <div onClick={()=>setIsHappy(false)} className={`background ${!isHappy ? 'active' : ''}`}>
                     <HiOutlineEmojiSad className='icon' />
                </div>
            </div>
            <div className="right">
                <div onClick={handleSend} className="background">
                      <GrSend  className='icon'/>
                </div>
            </div>
          
        </div>


    </section>
  )
}

export default AddUserComment

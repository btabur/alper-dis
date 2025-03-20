import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { db } from '../firebase/config';

const AdminContactModal = ({contacts, setIsShowContacts}) => {

       //randevuyu silme işlemi
const delDoc = (id) => {
        //fiebaseden siliyoruz
         deleteDoc(doc(db,'contacts',id))
         .then(()=> {
          toast.success('Kayıt Silindi');
          setIsShowContacts(false)
        })
    
      }
  return (
    <article className='admin-contact-modal'>
        <div className="head">
            <h3>İleşim Formunu Dolduranlar</h3>
            <div onClick={()=>setIsShowContacts(false)} className="background">
                <IoCloseCircleOutline className='icon' />
            </div>
        </div>
        <div className="body">
            {contacts.map((item,i)=>(
                <div key={i} className="card">
                    <h5>{item.name}</h5>
                    <p>{item.phone}</p>
                    <p>{item.message}</p>
                    <div onClick={()=>delDoc(item.id)} className="background">
                        <MdDelete  className='icon' />
                 </div>
                </div>
            ))}
        </div>
       
       

    </article>
  )
}

export default AdminContactModal
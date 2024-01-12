import React, { useRef, useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import { IoSave } from "react-icons/io5";
import { updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { toast } from 'react-toastify';
import { collection, doc, updateDoc } from 'firebase/firestore';


const Profil = ({treatmentList,currentUser}) => {
    const [isEdit,setIsEdit]=useState(false);
    const nameRef =useRef(null);
    const phoneRef=useRef(null);
    const [isChange,setIsChange] = useState(false)
    

    const updateProfil =async ()=> {
      
        if(isEdit) {
            setIsEdit(false);
            //her hangi bir değişiklik var ise güncelle
            if(isChange){
                const newName = nameRef.current.value;
                const newPhone = phoneRef.current.value;
                updateUserName(newName);
                updateInFireStore(newName,newPhone);

            }
         
         
        }else {
            setIsEdit(true)
        }
    }

    const updateUserName = async (newName) => {
        try {
          const user = auth.currentUser;
      
          // Firebase Authentication profilini güncelle
          await updateProfile(user,{
            displayName: newName,
          });
      
      
       
        } catch (error) {
         toast.info('Bir hata oluştu')
        }
      };

      const updateInFireStore = (name,phone)=> {
        const docRef = doc(db, 'Users',currentUser.uid);
         updateDoc(docRef,{
            ...currentUser, name,phone
        }).then (()=> {
          //bilgiler güncellendi ise randevular listesindeki bilgileri de güncelle
          updateFireStoreAppointments(name,phone)
          toast.success('Bilgileriniz güncellendi')})
      }
      
     const updateFireStoreAppointments =(name,phone)=> {
        const foundList = treatmentList.filter((item)=> item.user.uid == currentUser.id);
        console.log(foundList)

        foundList?.forEach(item => {

           const docRef = doc(db, 'randevular',item.id);
         
          updateDoc(docRef,{
            ...item, 
            user: {
              ...item.user,
              name,
            },phone,

        })
        });


     }
     
  return (
    <article className='profil'>
        <p>Hoş Geldin</p>
        <p>Kullanıcı Adı: {isEdit ? <input ref={nameRef} onChange={()=>setIsChange(true)} type="text" defaultValue={currentUser.name}/>:
                             <span>{currentUser?.name}</span>
                            }
        </p>
        <p>Tel: 
        {isEdit ? <input ref={phoneRef} onChange={()=>setIsChange(true)} type="text" defaultValue={currentUser.phone}/>:
                             <span>{currentUser?.phone}</span>
                            }
        </p>
        <p>email: <span>{currentUser?.email}</span> </p>

        <div onClick={updateProfil}
         className="background">
            {isEdit ?  <IoSave className='icon' /> :
              <MdModeEdit className='icon' />
             }
      

       
        </div>
    
       </article>
  )
}

export default Profil

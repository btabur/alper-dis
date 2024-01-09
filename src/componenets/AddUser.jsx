import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from 'react-toastify';
import { db } from '../firebase/config';
import { v4 } from 'uuid';


const AddUser = ({users,setIsShowAddUser}) => {

    //kullanıcı verilerini getirme
 const usersRef = collection(db,'Users');

    const [authData,setAuthData] = useState({
        name:'',
        email:'',
        phone:'',
        password:''
    })



    const handleInput = (e)=> {
        setAuthData({...authData, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        setAuthData({...authData, [e.target.name]:e.target.value})
        saveAuthWithEmail()
    }

      //email ile giriş için
      const saveAuthWithEmail =async ()=> {
        const found = users.find((item)=> item.name == authData.name);
       
            // aynı isimde bir kullanıcı var ise tekrar kayıt yapılmasını engeller
            if(found) {
                toast.info('Aynı isimde kullanıcı bulunmaktadır');
                return;
            }

            try {
                //kullanıcıyı fireStore a kaydediyoruz
                await addDoc(usersRef, {
                    name:authData.name,
                    email:authData.email,
                    phone:authData.phone,
                    password:authData.password,
                    isAuth:false,
                    id:v4()
                 })
          
              toast.success('Kayıt Yapıldı');
            } catch (error) {
              console.error('Giriş hatası:', error.message);
              toast.info('Bir hata oluştu', error);
            }

        
        

    }

   

  return (
    <article className="add-user-modal">
    <div className="logo">
        <img src="/logo.png" alt="apler diş" />
    </div>
    <h4> Yeni Hasta Kaydı</h4>
    <IoIosCloseCircle onClick={()=>setIsShowAddUser(false)} className="icon-close" />
    <form onSubmit={handleSubmit}>
        
            <div>
                <label htmlFor="name">Adınız Soyadınız</label>
                <input name='name' onChange={handleInput} type="text" id='name' required/>
             </div>
     
        <div>
            <label htmlFor="phone">Telefon</label>
            <input name='phone' onChange={handleInput}  type="phone" id='phone' required/>
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input name='email' onChange={handleInput}  type="email" id='email' required/>
        </div>
        <div>
            <label htmlFor="password">Şifre</label>
            <input name='password' onChange={handleInput}  type="password" id='password' required />
        </div>
        <button  type='submit' className='button'> Kaydet</button>
    </form>



</article>
  )
}

export default AddUser

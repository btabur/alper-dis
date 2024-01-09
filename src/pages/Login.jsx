import { createUserWithEmailAndPassword,updateProfile, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, db, provider } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { sendPasswordResetEmail } from "firebase/auth";
import {addDoc, collection, onSnapshot} from 'firebase/firestore'
import { doc, updateDoc } from 'firebase/firestore';


const Login = ({setStateUser}) => {


  //  auth.currentUser.displayName
    const [isLogin,setIsLogin] = useState(true);
    const [authData,setAuthData] = useState({
        name:'',
        email:'',
        phone:'',
        password:''
    })
    const [users,setUsers] = useState([])
    const [isShowResetModal,setIsShowResetModal] = useState(false)

    const navigate = useNavigate()

      //Verileri Getirme
    const UsersRef = collection(db,'Users')

    const handleInput = (e) => {
        setAuthData({...authData, [e.target.name]:e.target.value})
    }

    const handleSubmit =(e)=> {
        e.preventDefault()
        setAuthData({...authData, [e.target.name]:e.target.value})

        saveAuthWithEmail()


    }

   
   
    //email ile giriş için
    const saveAuthWithEmail =async ()=> {
        const found = users.find((item)=> item.email == authData.email);
        
       console.log(found)
        //kayıt işlemleri
        if(isLogin) {   
            // aynı isimde bir kullanıcı var ise tekrar kayıt yapılmasını engeller
            if(found) {
                toast.info('Aynı isimde kullanıcı bulunmaktadır');
                return;
            }

            //aynı isimde bir kullanıcı yoksa kayıt yapar
            LoginInWithEmail(authData.name);
        
        }else {
            //admin tarafından kaydedilen bir kullanıcı mı kontrol ediyoruz
                
            if (found.isAuth) {
              //giriş işlemleri
                    signInWithEmailAndPassword(auth, authData.email, authData.password)
                    .then((res)=> {
                        localStorage.setItem('UserAlper',res.user.refreshToken)
                        toast.success('Tekrar Hoş Geldiniz')
                        setStateUser(res.user.refreshToken)
                        navigate('/randevu')
                    }).catch(()=> toast.info('Mail veya şifre hatalı'))
              } 
              else if(!found.isAuth) { // bu email admin tarafından kayıt edilmiş
                saveAndLoginWithEmail(authData.name);
               
              }
            
            
        }

    }

    //şifre sıfırlama
    const handleResetPassword = (e)=> {
        e.preventDefault();
        console.log(e.target[0].value)
        sendPasswordResetEmail(auth,e.target[0].value)
        .then (()=> {
            setIsShowResetModal(false)
            toast.success('Maill adersinize sıfırlama bağlantısı gönderildi')
        })
    }

    const LoginInWithEmail = async (name) => {
        try {
          // E-posta ve şifre ile giriş yap
          const userCredential = await createUserWithEmailAndPassword(auth, authData.email, authData.password);
      
          // Kullanıcının displayName özelliğini güncelle sadece yeni kayıt olmuşsa
          
            await updateProfile(userCredential.user, {name });

            //kullanıcıyı fireStore a kaydediyoruz
            await addDoc(UsersRef, {
                name:authData.name,
                email:authData.email,
                phone:authData.phone,
                password:authData.password,
                id:auth.currentUser.uid
             })
      
          localStorage.setItem('UserAlper', userCredential.user.refreshToken);
          navigate('/randevu');
          setStateUser(userCredential.user.refreshToken);
          toast.success('Giriş Yapıldı');
      
          console.log('Kullanıcı giriş yaptı ve displayName ayarlandı:', userCredential.user);
        } catch (error) {
          console.error('Giriş hatası:', error.message);
          toast.info('Bir hata oluştu', error);
        }
      };
      
      //admin tarafından kayıt edilen 
      const saveAndLoginWithEmail = async (name) => {
        const found = users.find((item)=> item.email == authData.email);
        console.log(found)
        //firestore daki bilgiler ile uyuşmuyorsa  geri döndür
        if(found.password !== authData.password || found.email !== authData.email) {
            toast.info('email veya şifre hatalı')
            return;

        }
        try {
          // E-posta ve şifre ile giriş yap
          const userCredential = await createUserWithEmailAndPassword(auth, authData.email, authData.password);
      
          // Kullanıcının displayName özelliğini güncelle sadece yeni kayıt olmuşsa
          
            await updateProfile(userCredential.user, {name });
           
            const docRef = doc(db, 'Users',found.uid);
        
            await updateDoc(docRef,{
                ...found, isAuth:true
            })
      
          localStorage.setItem('UserAlper', userCredential.user.refreshToken);
          navigate('/randevu');
          setStateUser(userCredential.user.refreshToken);
          toast.success('Giriş Yapıldı');
      
          console.log('Kullanıcı giriş yaptı ve displayName ayarlandı:', userCredential.user);
        } catch (error) {
          console.error('Giriş hatası:', error.message);
          toast.info('Bir hata oluştu', error);
        }
      };
    

      //tüm kullanıcıları çekiyoruz
      useEffect(()=> {

      
        onSnapshot(UsersRef,(snapShot)=> {
            const allUser = []
      
            snapShot.docs.forEach((doc)=>{
            
    
              allUser.push({ ...doc.data(), uid: doc.id })
              
            })
            setUsers(allUser)
           
          })
      },[])

  

  return (
    <main className='login-page'>
        <article className="card">
            <div className="logo">
                <img src="/logo.png" alt="apler diş" />
            </div>
            <h4>{isLogin ? 'Kayıt Ol' : 'Giriş Yap'}</h4>
            <form onSubmit={handleSubmit}>
                { isLogin &&
                    <div>
                        <label htmlFor="name">Adınız Soyadınız</label>
                        <input name='name' onChange={handleInput} type="text" id='name' required/>
                     </div>}
              {isLogin &&
                <div>
                    <label htmlFor="phone">Telefon</label>
                    <input name='phone' onChange={handleInput}  type="phone" id='phone' required/>
                </div>}
                <div>
                    <label htmlFor="email">Email</label>
                    <input name='email' onChange={handleInput}  type="email" id='email' required/>
                </div>
                <div>
                    <label htmlFor="password">Şifre</label>
                    <input name='password' onChange={handleInput}  type="password" id='password' required />
                </div>
                <button  type='submit' className='button'> {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}</button>
                {!isLogin && <span onClick={()=> setIsShowResetModal(true)} className='resetPassword'> Şifremi Unuttum</span>}
            </form>

            {isLogin ?
             <p>Hesabınız Var mı? <span onClick={()=> setIsLogin(false)}>Giriş Yap</span></p> :

             <p>Hesabınız Yok Mu? <span onClick={()=> setIsLogin(true)}>Kayıt Ol</span></p> 
            }
            <p onClick={()=> navigate('/admin')} className="admin"> Admin Girişi</p>

        </article>


      { isShowResetModal &&
        <article className='modal'>
            <form onSubmit={handleResetPassword}>
                <input type="email" placeholder='e mail adresiniz'/>
                <button className='button'>Şifreyi Sıfırla</button>
            </form>
          
            <IoMdCloseCircleOutline onClick={()=> setIsShowResetModal(false)} className='icon-close' />
        </article>}

    </main>
  )
}

export default Login
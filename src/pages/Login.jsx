import { createUserWithEmailAndPassword,updateProfile, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, db, provider } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { sendPasswordResetEmail } from "firebase/auth";
import {addDoc, collection} from 'firebase/firestore'


const Login = ({setStateUser}) => {


  //  auth.currentUser.displayName
    const [isLogin,setIsLogin] = useState(true);
    const [authData,setAuthData] = useState({
        name:'',
        email:'',
        password:''
    })
    const [isShowResetModal,setIsShowResetModal] = useState(false)

    const navigate = useNavigate()

      //Verileri Getirme
    const UsersRef = collection(db,'Users')

    const handleInput = (e) => {
        setAuthData({...authData, [e.target.name]:e.target.value})
    }

    //goole ile giriş için
    const handleLogin = ()=> {
        signInWithPopup(auth, provider).then((res)=>{
            localStorage.setItem('UserAlper',res.user.refreshToken)
            setStateUser(res.user.refreshToken)
            toast.success('Giriş Yapıldı')
            navigate('/randevu')
        })
            .catch(()=> toast.danger('Bir hata oluştu'))
    }
   
    //email ile giriş için
    const saveAuthWithEmail =async ()=> {

        if(isLogin) {   

            LoginInWithEmail(authData.email, authData.password, authData.name);
            //kayıt işlemleri
        }else {
            //giriş işlemleri
            signInWithEmailAndPassword(auth, authData.email, authData.password)
            .then((res)=> {
                localStorage.setItem('UserAlper',res.user.refreshToken)
                toast.success('Tekrar Hoş Geldiniz')
                setStateUser(res.user.refreshToken)
                navigate('/randevu')
            }).catch(()=> toast.info('Mail veya şifre hatalı'))
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

    const LoginInWithEmail = async (email, password, displayName) => {
        try {
          // E-posta ve şifre ile giriş yap
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
          // Kullanıcının displayName özelliğini güncelle sadece yeni kayıt olmuşsa
          
            await updateProfile(userCredential.user, { displayName });

            //kullanıcıyı fireStore a kaydediyoruz
            await addDoc(UsersRef, {
                name:displayName,
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
    

    

  return (
    <main className='login-page'>
        <article className="card">
            <div className="logo">
                <img src="/logo.png" alt="apler diş" />
            </div>
            <h4>{isLogin ? 'Kayıt Ol' : 'Giriş Yap'}</h4>
            <form>
                { isLogin &&
                    <div>
                        <label htmlFor="name">Adınız Soyadınız</label>
                        <input name='name' value={authData.name} onChange={handleInput} type="text" id='name' required/>
                     </div>}
                <div>
                    <label htmlFor="email">Email</label>
                    <input name='email' value={authData.email} onChange={handleInput} type="email" id='email' required/>
                </div>
                <div>
                    <label htmlFor="password">Şifre</label>
                    <input name='password' value={authData.password} onChange={handleInput} type="password" id='password' required />
                </div>
                <button onClick={saveAuthWithEmail} type='button' className='button'> {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}</button>
                {!isLogin && <span onClick={()=> setIsShowResetModal(true)} className='resetPassword'> Şifremi Unuttum</span>}
            </form>
            <div 
            onClick={handleLogin}
             className='google'>

                <img src="/icons/icon-google.png" alt="" />
            </div>

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
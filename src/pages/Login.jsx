import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
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
            //kayıt işlemleri
            createUserWithEmailAndPassword(auth, authData.email, authData.password)
            .then((res)=> {
                localStorage.setItem('UserAlper',res.user.refreshToken)
                setStateUser(res.user.refreshToken)
                navigate('/randevu')
               toast.success('Giriş Yapıldı')
            }).catch(()=> toast.info('Bir hata oluştu'))
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

    // const saveUserFirebaseFromEmail = async () => {

    //     const usersRef = collection(db,'Users');

    //     await addDoc(usersRef,{
    //         name:authData.name,
    //         email:authData.email,
    //         password:authData.password
    //     }).then(()=> {
    //         toast.success('Giriş Yapıldı')
    //     }).catch(()=> toast.info('Bir hata oluştu'))


    // }
    // const saveUserFirebaseFromGoogle = async () => {

    //     const usersRef = collection(db,'Users');

    //     await addDoc(usersRef,{
    //         name:auth.currentUser.displayName,
    //         email:auth.currentUser.email,
    //     }).then(()=> {
    //         toast.success('Giriş Yapıldı')
    //     }).catch(()=> toast.info('Bir hata oluştu'))


    // }

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
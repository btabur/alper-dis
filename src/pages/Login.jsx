import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, provider } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [isLogin,setIsLogin] = useState(true);
    const [authData,setAuthData] = useState({
        name:'',
        email:'',
        password:''
    })

    const navigate = useNavigate()

    const handleLogin = ()=> {
        signInWithPopup(auth, provider).then(()=>navigate('/randevu'))
    }
    const handleInput = (e) => {
        setAuthData({...authData, [e.target.name]:e.target.value})
        console.log(authData.email, authData.password)
    }
    const saveAuthWithEmail =async ()=> {

        if(isLogin) {
            //kayıt işlemleri
           try {
            const data = await createUserWithEmailAndPassword(auth, authData.email, authData.password);
            const user = data.user;
            if(user) {
                toast.success('Kayıt Edildi')
                navigate('/randevu')
            }
            
           } catch (error) {
                toast.error('Bir hata oldu')
            
           }
        }else {
            //giriş işlemleri
            try {
                const data = await signInWithEmailAndPassword(auth, authData.email, authData.password);
                const user = data.user;
                if(user) {
                    toast.success('Giriş Yapıldı')
                    navigate('/randevu')
                }
                
               } catch (error) {
                    toast.error('Bir hata oldu')
                
               }
        }

    }
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
          

        </article>

    </main>
  )
}

export default Login
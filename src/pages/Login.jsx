import React, { useState } from 'react'

const Login = () => {
    const [isLogin,setIsLogin] = useState(true)
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
                        <input type="text" id='name'/>
                     </div>}
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' />
                </div>
                <div>
                    <label htmlFor="password">Şifre</label>
                    <input type="password" id='password' />
                </div>
                <button className='button'> {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}</button>
            </form>
            <div className='google'>

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
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { toast } from 'react-toastify';


const Header = () => {
  const [showMenu,setShowMenu]= useState(false)
  const navigate = useNavigate()
  const [currentuser,setUser] = useState(null)

  useEffect(()=> {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        const uid = user.uid;
        setUser(user)
      }
    })
  },[])

  const handleLoginOut = ()=> {
    if(currentuser) {
      signOut(auth)
      .then(()=>{
        setUser(null)
        toast.success('Çıkış Yapıldı')})
      .catch(()=> toast.error('Bir hata oluştu'))
    }else {
      navigate('/login')
    }
    

  }
  return (
    <header>
        <div className="logo">
               <img src="./public/logo.png" alt="" />
        </div>
        <nav>
            <ul className={showMenu ? 'show' : ''}>
                <li>
                    <NavLink to={'/'}>AnaSayfa</NavLink>
                </li>
                <li>
                <NavLink to={'/services'}>Hizmetlerimiz</NavLink>
                </li>
                <li>
                <NavLink>Hekimlerimiz</NavLink>
                </li>
                <li>
                <NavLink>İletişim</NavLink>
                </li>
                <li>
              
                </li>
            </ul>
            <button onClick={ handleLoginOut}
             className='button'>{!currentuser ? 'Giriş Yap': 'Çıkış Yap' }</button>
            <IoMenu onClick={()=> setShowMenu(!showMenu)}  className='menu'/>
        </nav>
       
    </header>
  )
}

export default Header
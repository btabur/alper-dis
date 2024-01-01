import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { toast } from 'react-toastify';
import { IoPersonCircle } from "react-icons/io5";


const Header = ({stateUser}) => {
  const [showMenu,setShowMenu]= useState(false)
  const navigate = useNavigate()
  const [currentuser,setUser] = useState(null)

  useEffect(()=> {
    const user= localStorage.getItem('UserAlper')
      if(user) {
        setUser(user)
      }else {
        setUser(null)
      }
  
  },[stateUser])

  const handleLogin = ()=> {
      navigate('/login')
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
           { currentuser ? <IoPersonCircle onClick={()=> navigate('/randevu')} style={{fontSize:'30px', cursor:'pointer'}} /> : <button onClick={ handleLogin}
             className='button'>Giriş Yap</button>}
            <IoMenu onClick={()=> setShowMenu(!showMenu)}  className='menu'/>
        </nav>
       
    </header>
  )
}

export default Header
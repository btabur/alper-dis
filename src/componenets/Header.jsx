import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";


const Header = () => {
  const [showMenu,setShowMenu]= useState(false)
  const navigate = useNavigate()

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
            <button onClick={()=> navigate('/login') } className='button'>Giriş Yap</button>
            <IoMenu onClick={()=> setShowMenu(!showMenu)}  className='menu'/>
        </nav>
       
    </header>
  )
}

export default Header
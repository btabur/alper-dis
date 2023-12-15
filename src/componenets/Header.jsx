import React from 'react'
import { NavLink } from 'react-router-dom'



const Header = () => {

  return (
    <header>
        <div className="logo">
               <img src="./public/logo.png" alt="" />
        </div>
        <nav>
            <ul>
                <li>
                    <NavLink to={'/'}>AnaSayfa</NavLink>
                </li>
                <li>
                <NavLink>Hizmetlerimiz</NavLink>
                </li>
                <li>
                <NavLink>Hekimlerimiz</NavLink>
                </li>
                <li>
                <NavLink>İletişim</NavLink>
                </li>
                <li>
                <button>Giriş Yap</button>
                </li>
            </ul>
           
        </nav>
       
    </header>
  )
}

export default Header
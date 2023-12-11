import React from 'react'
import { NavLink } from 'react-router-dom'



const Header = () => {
  return (
    <header>
        <div className="logo">
                <h3>ALPER <span>KARABAĞ </span> </h3>
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
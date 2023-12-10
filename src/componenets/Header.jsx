import React from 'react'
import { NavLink } from 'react-router-dom'


const Header = () => {
  return (
    <header>
        <div className="left">
            <img src="logo.jpeg" alt="Alper Karabağ Diş Logo" />
            <div>
                <h3>Alper Karabağ</h3>
                <span> Diş Sağlığı Merkezi</span>
            </div>
        </div>
        <nav>
            <ul>
                <li>
                    <NavLink>AnaSayfa</NavLink>
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
              
            </ul>
        </nav>
    </header>
  )
}

export default Header
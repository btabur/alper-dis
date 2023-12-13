import React from 'react'
import { BsTwitterX } from "react-icons/bs";
import { TfiFacebook } from "react-icons/tfi";
import { GrInstagram } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { TbClockHour3 } from "react-icons/tb";
import { IoLocation } from "react-icons/io5";

const Footer = () => {
  return (
   <footer>
    <article className='left'>
    <div className="logo">
                <h3>ALPER <span>KARABAĞ </span> </h3>
        </div>
        <p>15 yılı aşkın tecrübeye sahip kalifiye personelimiz ile kaliteli hizmet sunuyoruz</p>
        <div className="socials">
            <div className="backround">
            <BsTwitterX style={{color:'#01CFC9'}} />
            </div>
            <div className="backround">
            <TfiFacebook style={{color:'#01CFC9'}} />
            </div>
            <div className="backround">
            <GrInstagram  style={{color:'#01CFC9'}}/>
            </div>
        </div>
    </article>
    <article className='right'>
        <h3>İletişim</h3>
        <div>
        <MdEmail style={{color:'#0F2650', fontSize:'20px'}} />
        <span>dralper@gmail.com</span>
        </div>
        <div>
        <FaPhoneAlt style={{color:'#0F2650', fontSize:'20px'}} />
        <span>555 555 55 55</span>
        </div>
        <div>
        <TbClockHour3 style={{color:'#0F2650', fontSize:'20px'}} />
        <span>Hafta içi 09:00 - 17:00</span>
        </div>
        <div>
        <IoLocation style={{color:'#0F2650', fontSize:'20px'}}   />
        <span>Bingöl/Merkez</span>
        </div>
    </article>
  
   </footer>
  )
}

export default Footer
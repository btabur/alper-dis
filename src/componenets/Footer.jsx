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
        <p>15 yılı aşkın tecrübeye sahip kalifiye personelimiz ile kaliteli hizmet sunuyoruz...</p>
        <div className="socials">
            <div className="backround">
            <BsTwitterX style={{color:'#01CFC9'}} />
            </div>
            <div onClick={()=> window.open('https://www.facebook.com/alper.karabag.96', '_blank')} className="backround">
            <TfiFacebook style={{color:'#01CFC9'}} />
            </div>
            <div onClick={()=> window.open('https://www.instagram.com/dt.alper_karabag/', '_blank')} className="backround">
            <GrInstagram  style={{color:'#01CFC9'}}/>
            </div>
        </div>
    </article>
    <article className='right'>
        <h3>İletişim</h3>
        <div>
        <MdEmail className='icon'  style={{color:'#0F2650', fontSize:'20px'}} />
        <span>dralper@gmail.com</span>
        </div>
        <div>
        <FaPhoneAlt className='icon' style={{color:'#0F2650', fontSize:'20px'}} />
        <span>555 555 55 55</span>
        </div>
        <div>
        <TbClockHour3 className='icon'  style={{color:'#0F2650', fontSize:'20px'}} />
        <span>Hafta içi 09:00 - 17:00</span>
        </div>
        <div>
        <IoLocation className='icon'  style={{color:'#0F2650', fontSize:'20px'}}   />
        <span>Bingöl/Merkez</span>
        </div>
        <p className='info'>Tüm Hakları Saklıdır | <a href="https://www.instagram.com/btabur03/" target='_blank'>Web Tasarım Merkezi</a></p>
    </article>
      
   </footer>
  )
}

export default Footer
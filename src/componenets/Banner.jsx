import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { useNavigate } from 'react-router';
import { auth } from '../firebase/config';
import { toast } from 'react-toastify';
const Banner = () => {
  const phoneNumber = "05054898518"; 
  const navigate = useNavigate()
  //todo user var ise yönlendirme yapılacak yoksa login sayfasına yönlendirme yapılacak
  const handleRandevu = ()=> {
    if(auth.currentUser) {
      navigate('/randevu')
    }else {
      navigate('/login')
      toast.info('Randevu almak için Oturum açmanız gerekir')
    }
  }
  return (
    <section className='banner'>
        <div className="left">
            <h2>Sağlıklı Gülüşler İçin, <span>Doğru</span> Adrestesiniz!</h2>
            <p>Her hastanın ihtiyaçlarını karşılayarak, her tür tedavide uzmanlarla yüksek kaliteli dişhekimliği hizmetleri sunuyoruz </p>
            <button onClick={handleRandevu} className='button'>Online Randevu</button>
            <div className='connect'>
                <div className='connect-alt'>
                    <div className="icon">
                      <a href={`tel:${phoneNumber}`}>
                      <FaPhoneAlt style={{color:'#01CFC9'}}/>
                      </a>
                   
                    </div>
                  <div>
                    <p>Telefon</p>
                    <p> <a href={`tel:${phoneNumber}`} style={{color:'black'}}>{phoneNumber}</a></p>
                  </div>
                </div>
                <div className='connect-alt'>
                    <div className="icon">
                    <IoLocation style={{color:'#01CFC9'}} />
                    </div>
               
                <div>
                    <p>Adres:</p>
                    <p>  Kültür Cad. Baluken İş merk. No:64 kat 1 daire no:5-6  Bingöl /Merkez</p>
                </div>

                </div>
            </div>
        </div>
        <div className="right">

            <div className="background"></div>
            <img src="./profil.png" alt="Alper Karabağ" />
        </div>
    </section>
  )
}

export default Banner

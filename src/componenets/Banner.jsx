import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
const Banner = () => {
  return (
    <section className='banner'>
        <div className="left">
            <h2>Sağlıklı Gülüşler İçin, <span>Doğru</span> Adrestesiniz!</h2>
            <p>Her hastanın ihtiyaçlarını karşılayarak, her tür tedavide uzmanlarla yüksek kaliteli dişhekimliği hizmetleri sunuyoruz </p>
            <button>Online Randevu</button>
            <div className='connect'>
                <div className='connect-alt'>
                    <div className="icon">
                    <FaPhoneAlt style={{color:'#01CFC9'}}/>
                    </div>
                
                  <div>
                    <p>Telefon</p>
                    <p>555 555 55 55</p>
                  </div>
                </div>
                <div className='connect-alt'>
                    <div className="icon">
                    <IoLocation style={{color:'#01CFC9'}} />
                    </div>
               
                <div>
                    <p>Adres:</p>
                    <p>Bingöl /Merkez</p>
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

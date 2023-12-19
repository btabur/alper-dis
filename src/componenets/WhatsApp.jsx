import React from 'react'

import { FaWhatsapp } from "react-icons/fa";

const WhatsApp = () => {
    const handleWhatsappRedirect = () => {
        // Whatsapp numarası ve mesaj
        const phoneNumber = '905054898518'; // Örnek bir numara
        const message = 'Merhaba, bilgi almak istiyorum.';
    
        // Whatsapp uygulamasına yönlendirme URL'i
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
        // Yönlendirme işlemi
        window.location.href = whatsappUrl;
  };

  return (
    <div className='whatsApp'
     onClick={handleWhatsappRedirect} >
        <FaWhatsapp className='icon' />
        <p>WhatsApp</p>
      
    </div>
  )
}

export default WhatsApp

import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
   <section className='contact'>
       <h3>İletişime Geçin</h3>
       <p>Aşağıdaki formu doldurun en kısa sürede size dönüş yapalım.</p>
       <form>
        <div>
           <input className='input-name' type="text" placeholder='Adınız ve soyadınız.' />
           <input className='input-email' type="text" placeholder='e mail veya telefon numaranız' />
        </div>
        <textarea placeholder='Mesajınız' cols="30" rows="10"></textarea>
        <Link>Gönder</Link>
       </form>
   </section>
  )
}

export default Contact
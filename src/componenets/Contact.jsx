import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import { db } from '../firebase/config'
import { toast } from 'react-toastify'

const Contact = () => {
    //Verileri Getirme
    const ContactsRef = collection(db,'contacts')

  const handleContact =async (e)=> {
    e.preventDefault()
       //firebase e randevu ekleniyor

       await addDoc(ContactsRef, {
        name: e.target[0].value,
        phone:e.target[1].value,
        message:e.target[2].value
    }).then(()=> {
      toast.success('Kaydınız Alınmıştır')
      e.target[0].value=''
      e.target[1].value=''
      e.target[2].value=''
    })
  }
  return (
   <section className='contact'>
       <h3>İletişime Geçin</h3>
       <p>Aşağıdaki formu doldurun en kısa sürede size dönüş yapalım.</p>
       <form onSubmit={handleContact}>
        <div>
           <input className='input-name' type="text" placeholder='Adınız ve soyadınız.' required/>
           <input className='input-email' type="text" placeholder='telefon numaranız' required />
        </div>
        <textarea placeholder='Mesajınız' cols="30" rows="10" required></textarea>
        <br/>
        <button className='button'>Gönder</button>
       </form>
   </section>
  )
}

export default Contact
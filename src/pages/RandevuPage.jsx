import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { auth,db } from '../firebase/config'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { signOut } from '@firebase/auth'
import {addDoc, collection} from 'firebase/firestore'

const RandevuPage = ({setStateUser}) => {
  const options = [
    { value: 'implant', label: 'İmplant' },
    { value: 'gülüs-tasarimi', label: 'Gülüş Tasarımı' },
    { value: 'kanal-tedavisi', label: 'Kanal Tedavisi' },
    { value: 'beyazlatma', label: 'Beyazlatma' },
    { value: 'protez-cesitleri', label: 'Protez Çeşitleri' },
    { value: 'zirkonyum-kaplama', label: 'Zirkonyum Kaplama' },
    { value: 'yaprak-porselen', label: 'Yaprak Porselen' },
    { value: 'dolgu', label: 'Dolgu' },
    { value: 'dis-eti-hastaliklari', label: 'Diş Eti Hastalıkları' },
    { value: 'cocuk-dis', label: 'Çocuk diş Hekimliği' },
  ]
  const [formData, setFormData] = useState({
    treatment:'',
    phone:'',
    name:'',
    date:''
  })
  const navigate = useNavigate()
  useEffect(()=> {
    // izinsiz girişleri engelliyoruz
    if(!localStorage.getItem('UserAlper')) {
       toast.info('Önce Oturum açamnız gerekli')
        navigate('/login')
       
    }
  },[])
  const handleLogOut = ()=> {
      signOut(auth).then (()=> {
        localStorage.removeItem('UserAlper')
        toast.success('Oturum Kapatıldı')
        setStateUser(null)
        navigate('/')
      })
  }
  const handleChange = (e)=> {
    setFormData({...formData, [e.target.name]:e.target.value})

   

  }
  const handleSubmit = async (e)=> {
    e.preventDefault()
    await addDoc(randevularRef, {
      treatment:formData.treatment,
      date:formData.date,
      user:{
        name:formData.name,
        uid:auth.currentUser.uid
      }
  }).then(()=> toast.success('Kaydınız Alınmıştır'))

  }
  // useEffect(()=>{
  //   console.log(formData)
  // },[formData])

 const randevularRef =collection(db,'randevular')
  return (
    <main className='randevu'>

        <button onClick={handleLogOut} className='button btn-logout'>Çıkış Yap</button>

        <div className="card">
          <div className="head">
           <h2>Randevu Al</h2>
          </div>
          <div className="body">
          <div className="left">
            <h3>Çalışma Saatlerimiz</h3>
            <p>Pazartesi-Cuma  -  9:00-19:00</p>
            <p>Cumartesi       -  9:00-17:00</p>
          </div>
          <div className="right">
            <p>Randevu Formu</p>
            <form>
              <div>
              <Select   onChange={(e)=> setFormData({...formData, ['treatment']:e.value})} className='input' placeholder='Tedavi Türü Seçin' required options={options} />
              <input name='phone' onChange={handleChange} className='input' type="text" placeholder='Telefon' required />
              </div>
              <div>
                <input name='name' onChange={handleChange} className='input' type="text" placeholder='Ad soyad' required />
                <input name='date' onChange={handleChange} className='input' type="date" required/>
              
              </div>
              <button onClick={handleSubmit} type='submit'  className='button'>Gönder</button>
            </form>
           
          </div>
          </div>
        
        </div>
    </main>
  )
}

export default RandevuPage

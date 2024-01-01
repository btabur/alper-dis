import React, { useEffect } from 'react'
import Select from 'react-select'
import { auth } from '../firebase/config'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { signOut } from '@firebase/auth'

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
            <div>
            <Select className='input' placeholder='Tedavi Türü Seçin' required options={options} />
            <input className='input' type="text" placeholder='Telefon' required />
            </div>
            <div>
              <input className='input' type="text" placeholder='Ad soyad' required />
              <input className='input' type="date" required/>
             
            </div>
            <button className='button'>Gönder</button>
          </div>
          </div>
        
        </div>
    </main>
  )
}

export default RandevuPage

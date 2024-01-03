import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { auth,db } from '../firebase/config'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { signOut } from '@firebase/auth'
import {addDoc, collection} from 'firebase/firestore'
import { doc, onSnapshot } from "firebase/firestore";
import TreatmentItem from '../componenets/TreatmentItem'

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
    date:'',
    isChecked:false
  })

  const [treatmentList,setTreatmentList] = useState([])

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
  
    // yeni randevu almak için ileri bir tarihte randevusu olup olmadığı kontrol ediliyor
    const currentTime = new Date().getTime();
    let randevuDate;
    if(localStorage.getItem('randevuAlper')) {
       randevuDate = new Date(localStorage.getItem('randevuAlper')).getTime();
    }
    if(currentTime<randevuDate){
      toast.info('İleri bir tarihe alınmış randevunuz zaten bulunmaktadır')
      return;
    }

    //firebase e randevu ekleniyor
    await addDoc(randevularRef, {
      treatment:formData.treatment,
      date:formData.date,
      phone:formData.phone,
      isChecked:formData.isChecked,
      user:{
        name:formData.name,
        uid:auth.currentUser.uid
      }
  }).then(()=> {
    toast.success('Kaydınız Alınmıştır')
    // yerel hafızaya kaydediliyor ki ileri bir tarihe bir den fazla randevu alamasın
    localStorage.setItem('randevuAlper',formData.date)
    e.target[1].value=''
    e.target[2].value=''
    e.target[3].value=''
  })

  }
  

  //Verileri Getirme
 const randevularRef =collection(db,'randevular')
 useEffect(()=> {
    onSnapshot(randevularRef,(snapShot)=> {
      const randevuList = [];
      snapShot.docs.forEach((doc)=>{
        // sadece kullanıcının verilerini alıyoruz
        if(doc.data().user.uid == auth.currentUser.uid){
          randevuList.push({...doc.data(),id:doc.id}) // içerisine documanın id sini ekliyoruz
        }
        
      })
      setTreatmentList(randevuList)
     
    })

 },[])
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
            <form onSubmit={handleSubmit}>
              <div>
              <Select  onChange={(e)=> {setFormData({...formData, ['treatment']:e.label})
            
            }} className='input' placeholder='Tedavi Türü Seçin' required options={options} />
              <input  name='phone' onChange={handleChange} className='input' type="text" placeholder='Telefon' required />
              </div>
              <div>
                <input  name='name' onChange={handleChange} className='input' type="text" placeholder='Ad soyad' required />
                <input  name='date' onChange={handleChange} className='input' type="date" required/>
              
              </div>
              <button type='submit'  className='button'>Gönder</button>
            </form>
           
          </div>
          </div>
        
        </div>

        <h3>Randevularım</h3>
        <div className='title'>
          <p>İsim</p>
          <p>Tedavi </p>
          <p>Tarih</p>
          <p></p>
        </div>
            {treatmentList.length == 0 && <p> Herhangi bir randevu kaydınız yoktur</p>}
        {
          treatmentList.map((item,index)=> (
            <TreatmentItem key={index} treat = {item} />
          ))
        }

    </main>
  )
}

export default RandevuPage

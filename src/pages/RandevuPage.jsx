import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { auth,db } from '../firebase/config'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { signOut } from '@firebase/auth'
import {addDoc, collection} from 'firebase/firestore'
import { doc, onSnapshot } from "firebase/firestore";
import TreatmentItem from '../componenets/TreatmentItem'
import { optionsHour, optionsTreatment } from '../constants'

const RandevuPage = ({setStateUser}) => {
 
  const [formData, setFormData] = useState({
    treatment:'',
    phone:'',
    name:'',
    date:'',
    hour:'',
    isChecked:false
  })

  const [treatmentList,setTreatmentList] = useState([])
  const [allTreat,setAllTreat] = useState([])
  const [optionsFilteredHour,setoptionsFilteredHour] = useState([])

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
    if(e.target.name == 'date'){
      checkHourOptions(e.target.value)
  }  }
  const handleSubmit = async (e)=> {
    e.preventDefault()
  
    // yeni randevu almak için ileri bir tarihte randevusu olup olmadığı kontrol ediliyor
    const currentTime = new Date().getTime();

    if(currentTime<getLastAppointment()){
      toast.info('İleri bir tarihe alınmış randevunuz zaten bulunmaktadır')
      return;
    }
    //geçmiş bir tarihe randevu almayı engeller
    const appointmentDate= new Date(formData.date)
    if(currentTime> appointmentDate) {
      toast.info('Geçmiş tarihe randevu alamazsınız')
      return;
    }

    //firebase e randevu ekleniyor
    await addDoc(randevularRef, {
      treatment:formData.treatment,
      date:formData.date,
      phone:formData.phone,
      hour:formData.hour,
      isChecked:formData.isChecked,
      user:{
        name:formData.name,
        uid:auth.currentUser.uid
      }
  }).then(()=> {
    toast.success('Kaydınız Alınmıştır')
    e.target[0].value=''
    e.target[1].value=''
    e.target[2].value=''
    e.target[3].value=''
    e.target[4].value=''
  })

  }

  const getLastAppointment =( )=> {

   const dateList = treatmentList.map((item)=> new Date(item.date).getTime())
      const orderedList = dateList.sort((a, b)=> b-a)

   return orderedList[0]

  }
  
 //Verileri Getirme
 const randevularRef = collection(db,'randevular')
 
 useEffect( ()=> {
  

    onSnapshot(randevularRef,(snapShot)=> {
      const randevuList = [];
      const allrandevu = []
      snapShot.docs.forEach((doc)=>{
        // sadece kullanıcının verilerini alıyoruz
        if (doc.data().user && doc.data().user.uid && doc.data().user.uid == auth.currentUser.uid) {
          randevuList.push({ ...doc.data(), id: doc.id });
        }
        allrandevu.push(doc.data())
        
      })
      setTreatmentList(randevuList)
      //tüm randevuları alıyoruz
      setAllTreat(allrandevu)
     
    })

 },[formData])


 const checkHourOptions = (date) => {

      // geçmiş bir günü seçerse saatleri düzenlemeden geri döndürecek

      const currentDay= new Date()
      const treatDay= new Date(date)


      if(currentDay>treatDay) {

        toast.info('Geçmiş güne randevu alamazsınız')
        return;
      }
      //girilen günün randevularının alıyoruz
      const dayTreats = allTreat.filter((item)=> item.date == date && item )
      //options nesnesini çağırdık


     
      let filteredOptions = optionsHour
      // girilen gündeki randevu saatlerini options dan çıkartıyoruz
      dayTreats.forEach((treat)=> {
        filteredOptions = filteredOptions.filter((i)=> i.value !== treat.hour  &&  i)
      })

      setoptionsFilteredHour(filteredOptions)

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
            <form onSubmit={handleSubmit}>
              <div>

                <select onChange={handleChange} className='input' name="treatment" required>
                  <option value="" disabled>Tedavi Türü Seçin</option>
                  {optionsTreatment.map((item)=> (
                      <option value={item.value}>{item.label}</option>
                  ))}
                </select>
              <input  name='phone' onChange={handleChange} className='input' type="text" placeholder='Telefon' required />
              </div>
              <div>
                <input  name='name' onChange={handleChange} className='input' type="text" placeholder='Ad soyad' required />
                <input  name='date' onChange={handleChange} className='input' type="date" required/>
                  
                  {/* saat */}
                <select onChange={handleChange} className='input' name="hour" required>
                <option value="" disabled>Saati Seçin</option>
                  {optionsFilteredHour.map((item)=> (
                      <option value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
              <div>
              <button type='submit'  className='button'>Gönder</button>
              <span>Önce günü Seçin boş saatler otamatik yüklenecektir</span>
              </div>
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

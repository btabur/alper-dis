import React, { useEffect, useState } from 'react'
import { auth,db } from '../firebase/config'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { signOut } from '@firebase/auth'
import {addDoc, collection} from 'firebase/firestore'
import {  onSnapshot } from "firebase/firestore";
import TreatmentItem from '../componenets/TreatmentItem'
import { compareDates, getCurentDay, optionsHour, optionsTreatment } from '../constants'
import TreatAdminItem from '../componenets/TreatAdminItem'

const RandevuPage = ({setStateUser}) => {
 
  const [treatmentList,setTreatmentList] = useState([])
  const [allTreat,setAllTreat] = useState([])
  const [optionsFilteredHour,setoptionsFilteredHour] = useState([])
  const [users,setUsers] = useState([])
  const [currentUser,setCurrentUser] = useState()


  //Verileri Getirme
  const randevularRef = collection(db,'randevular')

  //kullanıcıları Getirme
  const usersRef = collection(db,'Users')

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
    if(e.target.name == 'date'){
      checkHourOptions(e.target.value)
  }  }


  const handleSubmit = async (e)=> {
    e.preventDefault()

   
  
    // yeni randevu almak için ileri bir tarihte randevusu olup olmadığı kontrol ediliyor
    if(treatmentList.length>0) {
      const isDayPass =compareDates(e.target[3].value,getLastAppointment()) 
    if( isDayPass == 1){
      toast.info('İleri bir tarihe alınmış randevunuz zaten bulunmaktadır')
      return;
    }else if (isDayPass ==0) {
      toast.info('Bu güne alınmıs bir randevunuz bulunmaktadır')
      return;
    }
    }


    //geçmiş bir tarihe randevu almayı engeller
    const isDayPassed = compareDates(getCurentDay(),e.target[3].value)
    if(isDayPassed==-1) {
      toast.info('Geçmiş güne randevu alamazsınız')
        return;
    }

    

    //firebase e randevu ekleniyor
    await addDoc(randevularRef, {
      treatment:e.target[0].value,
      date:e.target[3].value,
      phone:e.target[1].value,
      hour:e.target[4].value,
      isChecked:false,
      user:{
        name:e.target[2].value,
        uid:currentUser.id
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

    if(treatmentList.length>0) {
      const dateList = treatmentList.map((item)=> new Date(item.date).getTime())
      const orderedList = dateList.sort((a, b)=> b-a)

      const latestDate = new Date(orderedList[0]).toISOString().split('T')[0];

   return latestDate;

    }
 
  }
  

 
 useEffect( ()=> {
     
    // tüm kullanıcıları çekiyoruz
    onSnapshot(usersRef,(snapShot)=> {
      const allUser = []

      snapShot.docs.forEach((doc)=>{
      

        allUser.push(doc.data())
        
      })
      setUsers(allUser)
     
    })



 

 },[])
 useEffect(()=> {
  onSnapshot(randevularRef,(snapShot)=> {
    const randevuList = [];
    const allrandevu = []
 

    const found = users.find((item)=> item.email == auth.currentUser.email)
    setCurrentUser(found)
    


    snapShot.docs.forEach((doc)=>{
      // sadece kullanıcının verilerini alıyoruz
      if ( doc.data().user.uid == found?.id ) {

        randevuList.push({ ...doc.data(), id: doc.id });
      }
      allrandevu.push(doc.data())
      
    })
    setTreatmentList(randevuList.reverse())
    //tüm randevuları alıyoruz
    setAllTreat(allrandevu)
   
   
  })

 },[users])

 

 const checkHourOptions = (date) => {

     

 // geçmiş bir günü seçerse saatleri düzenlemeden geri döndürecek
    const isDayPassed = compareDates(getCurentDay(),date)
    let filteredOptions = []

    if(isDayPassed==-1) {
      toast.info('Geçmiş güne randevu alamazsınız')
      setoptionsFilteredHour(filteredOptions)
        return;
    }
      //girilen günün randevularının alıyoruz
      const dayTreats = allTreat.filter((item)=> item.date == date && item )
      
      
      //options nesnesini çağırdık
       filteredOptions =optionsHour
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

                <select  className='input' name="treatment" required>
                  <option value="" disabled>Tedavi Türü Seçin</option>
                  {optionsTreatment.map((item)=> (
                      <option value={item.value}>{item.label}</option>
                  ))}
                </select>
              <input  name='phone' className='input' type="text" placeholder='Telefon' required />
              </div>
              <div>
                <input  name='name' className='input' type="text" placeholder='Ad soyad' required />
                <input  name='date' onChange={handleChange} className='input' type="date" required/>
                  
                  {/* saat */}
                <select  className='input' name="hour" required>
                <option value="" disabled>Saati Seçin</option>
                  {optionsFilteredHour.map((item,i)=> (
                      <option key={i} value={item.value}>{item.label}</option>
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
       
            {treatmentList.length == 0 && <p> Herhangi bir randevu kaydınız yoktur</p>}
       <div className='treat-item-container'>
          {
              treatmentList.map((item,index)=> (
               <TreatmentItem key={index} treat = {item} />
               // <TreatAdminItem key={index} treat = {item}/>
              ))
            }
       </div>
       

    </main>
  )
}

export default RandevuPage

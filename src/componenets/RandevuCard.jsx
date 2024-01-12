import React, { useEffect, useState } from "react";
import {addDoc, collection} from 'firebase/firestore'
import { compareDates, formatDate, getCurentDay, optionsHour, optionsTreatment } from '../constants'
import { doc, onSnapshot } from "firebase/firestore";
import { toast } from 'react-toastify'
import {db } from '../firebase/config'
import { IoIosCloseCircle } from "react-icons/io";
import Select from "react-select";




const RandevuCard = ({setIsShowAddTreatModal}) => {
  const [allTreat, setAllTreat] = useState([]);
  const [optionsFilteredHour, setoptionsFilteredHour] = useState([]);
  const [users,setUsers] = useState([])
  const [userOptions,setUserOptions] = useState([])
  const [selectedUser,setSelectedUser] =useState({
    id:'',
    name:''
  })
 

  const handleChange = (e) => {
      if(e.value) {
        const found= users.find((item)=> item.id == e.value)
        setSelectedUser(found)
      }else {
        checkHourOptions(e.target.value);
      }
   
  };

   //Verileri Getirme
 const randevularRef = collection(db,'randevular')

 //kullanıcı verilerini getirme
 const usersRef = collection(db,'Users');

 //tüm randevuları ve kullanıcıları alıp state e aktarıyoruz
  useEffect(() => {

    onSnapshot(randevularRef, (snapShot) => {

      const allrandevu = [];
      snapShot.docs.forEach((doc) => {
    
        allrandevu.push(doc.data());
      });
     
      //tüm randevuları alıyoruz
      setAllTreat(allrandevu);
    });

    //kulanıcıları state attıyoruz
    onSnapshot(usersRef, (snapShot) => {

        const allUser = [];
        snapShot.docs.forEach((doc) => {
      
            allUser.push(doc.data());
        });
       
        //tüm kullanıcıları alıyoruz
        setUsers(allUser);
      });

     
      
  }, []);

  //kullanıcılar state e aktarıldıktan  sonra kullanıcıların 
  //selecte aktarılacağı fonksiyonu çalıştırıyrouz
  useEffect(()=> {
    getUserOptions()

  },[users])


  //randevu formu gönderildiğinde
  //kaydı gerçekleştirir
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    //geçmiş bir tarihe randevu almayı engeller
    const isDayPassed = compareDates(
      getCurentDay(),
      formatDate(e.target[3].value)
    );
    if (isDayPassed == -1) {
      toast.info("Geçmiş güne randevu alamazsınız");
      return;
    }

    //firebase e randevu ekleniyor
    await addDoc(randevularRef, {
      treatment: e.target[0].value,
      date: e.target[3].value,
      phone: e.target[1].value,
      hour: e.target[4].value,
      isChecked: true,
      user: {
      //  name: e.target[2].options[e.target[2].selectedIndex].label, //seçilen kullanıcının kullanıcı adını alıyoruz
        name:selectedUser.name,
        uid: selectedUser.id,
      },
    }).then(() => {
      toast.success("Kaydınız Alınmıştır");
      e.target[0].value = "";
      e.target[1].value = "";
      e.target[2].value = "";
      e.target[3].value = "";
      e.target[4].value = "";
      setIsShowAddTreatModal(false)
    });

    getUserOptions()
  };

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

    const getUserOptions = ()=> {
      const userOption = users.map((item)=> ({
            value:item.id,
            label:item.name
      }))
      setUserOptions(userOption)

   

    }


  return (
    <section className="randevu-add">
      <p> Yeni Randevu Ekle</p>
      <IoIosCloseCircle onClick={()=>setIsShowAddTreatModal(false)} className="icon-close" />
      <form onSubmit={handleSubmit}>
              <div>

                <select  className='input' name="treatment" required>
                  <option value="" disabled>Tedavi Türü Seçin</option>
                  {optionsTreatment.map((item)=> (
                      <option value={item.value}>{item.label}</option>
                  ))}
                </select>
              <input  name='phone' value={selectedUser?.phone} disabled className='input' type="text" placeholder='Telefon'  />
              </div>
              <div>

                 <Select placeholder='Hasta Seçin' onChange={handleChange} className="select-user" options={userOptions}/>
              
              </div>
              <div>
            
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
    </section>
  );
};

export default RandevuCard;



  {/* <select  className='input' name="users" required>
                    <option value="" disabled>kullanıcı Seçin</option>
                    {users.map((item)=> (
                        <option value={item.id}>{item.name}</option>
                    ))}
                  </select> */}
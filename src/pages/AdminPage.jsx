import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import TreatAdminItem from "../componenets/TreatAdminItem";

const AdminPage = () => {
  //Verileri Getirme
  const randevularRef = collection(db, "randevular");
  const adminRef = collection(db, "admin");

  const [admins, setAdmins] = useState([]);
  const [isShow,setIsShow] = useState(false);
  const [isRemember,setIsRemember] = useState(false)
  const [treatmentList,setTreatmentList] = useState([])


  useEffect(() => {
    //admin verilerini alıyoruz
    const adminList = [];
    onSnapshot(adminRef, (snapShot) => {
      snapShot.docs.forEach((doc) => {
        adminList.push(doc.data());
      });

      setAdmins(adminList);
    });
    // beni hatırla aktif ise şifre modal ı gösterme
    if(localStorage.getItem('alperAdminRemember')) {
       setIsShow(true)
    }

    //randevu verileri
    onSnapshot(randevularRef,(snapShot)=> {
        const randevuList = [];
        snapShot.docs.forEach((doc)=>{
         
            randevuList.push({...doc.data(),id:doc.id}) // içerisine documanın id sini ekliyoruz
          
          
        })
        setTreatmentList(randevuList)
       
      })

  }, []);

  console.log(treatmentList)


  const handleSubmit = (e)=> {
    e.preventDefault()
    //girilen değerler ile sistemdeki bilgiler kontrol ediliyor
    admins.map((item)=> {
        if(item.name == e.target[0].value && item.password== e.target[1].value ) {
            setIsShow(true)
            if(isRemember) {
                localStorage.setItem('alperAdminRemember',isRemember)
            }
           
        }
    })

  }


  
  

  return (
    <main className="adminPage">
       {!isShow && <div className="modal">
            <div className="modal-body">
                
            <form onSubmit={handleSubmit}>
                     <h3>Admin girişi</h3>
                <input type="text" placeholder="isminizi girin"  required/>
                <input type="password" placeholder="Şifreniz" required />
                <button className="button">Giriş Yap</button>
            </form>

            <div className="remember">
                <label htmlFor="remember">Beni Hatırla </label>
                <input onChange={()=> setIsRemember(!isRemember)} id="remember" type="checkbox"/>
            </div>
            </div>   
        </div>}

        <h1>Admin Sayfası</h1>


        {treatmentList.map((treat) => (
            <TreatAdminItem treat={treat} />
        ))}



    </main>
  )
};

export default AdminPage;

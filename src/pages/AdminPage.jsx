import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { db } from "../firebase/config";
import TreatAdminItem from "../componenets/TreatAdminItem";
import { getCurentDay } from "../constants";
import { FaCirclePlus } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import RandevuCard from "../componenets/RandevuCard";
import { FaUserPlus } from "react-icons/fa6";
import AddUser from "../componenets/AddUser";

const AdminPage = () => {
  //Verileri Getirme
  const randevularRef = collection(db, "randevular");
  const adminRef = collection(db, "admin");

  const [admins, setAdmins] = useState([]);
  const [isShow,setIsShow] = useState(false);
  const [adminId,setAdminId] =useState();
  const [isRemember,setIsRemember] = useState(false)
  const [treatmentList,setTreatmentList] = useState([])
  const [filteredTreats,setFilteredTreats] = useState([])
  const [isShowAddTreatModal,setIsShowAddTreatModal] = useState(false)
  const nameRef = useRef();
  const dateRef = useRef();
  const navigate = useNavigate()
  const [isShowAddUser,setIsShowAddUser]=useState(false);
  const [users,setUsers] = useState([])
 //Verileri Getirme
 const UsersRef = collection(db,'Users')


  useEffect(() => {

   
        //admin verilerini alıyoruz
        const adminList = [];

        onSnapshot(adminRef, (snapShot) => {
          snapShot.docs.forEach((doc) => {
            adminList.push({...doc.data(),id:doc.id});
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

      // tüm kullanıcıları çekiyoruz
      onSnapshot(UsersRef,(snapShot)=> {
        const allUser = []
  
        snapShot.docs.forEach((doc)=>{
        

          allUser.push(doc.data())
          
        })
        setUsers(allUser)
       
      })


     

      

  }, []);

  

  //bu günün randevularını döndürür
  const getTodayTreatment = ()=> {
    const today= getCurentDay()
   
  
    const filteredList=  treatmentList.filter((treat)=> treat.date == today);

    setFilteredTreats(filteredList)
  }


  const handleSubmitPasswordModal = (e)=> {
    e.preventDefault()
    //girilen değerler ile sistemdeki bilgiler kontrol ediliyor
    admins.map((item)=> {
        if(item.name == e.target[0].value && item.password== e.target[1].value ) {
            setIsShow(true)
           localStorage.setItem('alperAdminId',item.id)
            if(isRemember) {
                localStorage.setItem('alperAdminRemember',isRemember)
            }
           
        }
    })

  }





  const filterNameAndDate = ()=> {
    console.log(nameRef.current.value);
     console.log(dateRef.current.value);
      const filteredList =  treatmentList.filter((treat)=> {
          return (
            //notun başlığı aratılan başlığı içeriyorsa 
            (nameRef.current.value == '' || treat.user.name.toLocaleLowerCase().includes(nameRef.current.value.toLocaleLowerCase()))
            &&
            
            (dateRef.current.value == '' || treat.date == dateRef.current.value)
          )
        })
        setFilteredTreats(filteredList)
  }

  const resetFilter =()=> {
    nameRef.current.value=''
    dateRef.current.value=''
    getTodayTreatment()

  }

  const handleLogOut = ()=> {
      localStorage.removeItem('alperAdminRemember');
      navigate('/')
      
  }


  return (
    <main className="adminPage">
      

        <h2>Admin Sayfası</h2>
        <div onClick={handleLogOut} className='background'>
           <TbLogout className="icon-logOut" />
        </div>

        <section className="filter">
            <h4>Filitrele</h4>
            <article className="filter-body">
                <input ref={nameRef} onChange={filterNameAndDate} type="text" placeholder="hasta ismi girin" />
                <input ref={dateRef} onChange={filterNameAndDate}  type="date"/>
                <button onClick={resetFilter} className="button">Sıfırla</button>
                <FaCirclePlus onClick={()=>setIsShowAddTreatModal(!isShowAddTreatModal)} className="icon-add" />
                <FaUserPlus onClick={()=> setIsShowAddUser(!isShowAddUser)}  className="icon-add-user" />
            </article>
          
        </section>
        <article className="admin-item-container" >
            {filteredTreats?.map((treat) => (
                  <TreatAdminItem key={treat.id}  treat={treat} /> 
            ))}
        </article>

        {filteredTreats.length==0 && <p style={{textAlign:'center', margin:'100px'}}>Bu güne ait bir randevu bulunamadı</p> }



            {/* //! giriş de admin sayfasını açmak için modal */}
        {!isShow && <div className="modal">
            <div className="modal-body">
                
            <form onSubmit={handleSubmitPasswordModal}>
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

        {/*!//! randevu ekleme modal */}
        {isShowAddTreatModal &&
        
          <RandevuCard setIsShowAddTreatModal={setIsShowAddTreatModal} />
        
        }
          {/* //! yeni kullanıcı ekleme */}
        {isShowAddUser &&
          <AddUser users={users} setIsShowAddUser={setIsShowAddUser}/>
        }

    </main>
  )
};

export default AdminPage;

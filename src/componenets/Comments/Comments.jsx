import React, { useEffect, useState } from 'react'
import Card from './Card'

import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/config'

const Comments = () => {



     //Verileri Getirme
 const UsersRef = collection(db,'Users')

    const [showNumber,setShowNumber] =useState(0)
    const [users,setUsers] = useState([]);
    const [comments,setComments] =useState([]);
    const [list,setList] =useState([]);
    const [chunkedComs,setChunkedComs] = useState([])


    // tüm kullanıcılar dan yorum yapanları alıyoruz çekiyoruz
  useEffect(()=> {
    onSnapshot(UsersRef,(snapShot)=> {
       const allUser = []
 
       snapShot.docs.forEach((doc)=>{
       
           if(doc.data().comment){
               allUser.push(doc.data())
           }
      
         
       })
       setUsers(allUser)
      
     })
 },[])


    useEffect(()=> {
        const coms =[]
        users.forEach((item)=> {
            coms.push({
                name:item.name,
                com:item.comment,
                isHappy: item.isHappy})
        })
        setComments(coms)
    },[users])

    useEffect(()=> {
        console.log(comments)
        // coms dizisini üçerli gruplara böl 
       setChunkedComs(chunkArray(comments, 3));
    },[comments])
    useEffect(()=> {
        setList(chunkedComs[showNumber]) ;
    },[chunkedComs])
   
     // coms dizisini üçerli gruplara bölmek için bir yardımcı fonksiyon
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

 


  return (
    <section className="comments">
        <h3>Yorumlarımız</h3>
        <h2>Hakkımızda Neler Söylüyorlar ?</h2>
        <div className="cards">
        {list?.map((item,i)=> (
                <Card key={i} card={item}/>
            ))}
        </div>
            <br />
            {/* daha fazla yorum kaldı ise göster */}
            {showNumber !== chunkedComs.length-1 && 
               <button onClick={()=>{showNumber!==chunkedComs.length-1 && setShowNumber(showNumber+1)} } className='button'>Daha Fazla</button>
            }
     

    </section>
  )
}

export default Comments
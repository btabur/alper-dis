import React, { useEffect, useRef, useState } from 'react'
import ShowUserItem from './ShowUserItem'
import { IoMdSearch } from "react-icons/io";


const ShowUsers = ({users}) => {
  const [filteredList,setFilteredList] = useState([])
  const [inputName,setInputName] = useState()
  const inputRef =useRef()

    const handleInput = (e)=> {
      e.preventDefault()
      console.log(e.target.value)
      setInputName(e.target.value)
     


    }

    const filterUsers = ()=> {
      const filtered = users.filter((user) => {
        return (
          (inputRef.current.value == '' || user.name.toLocaleLowerCase().includes(inputRef.current.value.toLocaleLowerCase()))
        )
      })

      setFilteredList(filtered)

    }
    useEffect(()=>{
      filterUsers()
    },[inputName])
  return (
    <section className='show-users'>
            <div className="show-users-filter">
                <input ref={inputRef} type="text" onChange={handleInput} placeholder='Hasta Ara' />
                <IoMdSearch className='icon-search'/>
            </div>

            <div className='show-users-body'>
                {filteredList.map((user)=> (
                    <ShowUserItem key={user.id} user={user}/>
                ))}
            </div>


    </section>
  )
}

export default ShowUsers
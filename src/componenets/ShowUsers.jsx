import React from 'react'
import ShowUserItem from './ShowUserItem'
import { IoMdSearch } from "react-icons/io";


const ShowUsers = ({users}) => {
    console.log(users)
  return (
    <section className='show-users'>
            <div className="show-users-filter">
                <input type="text" placeholder='Hasta Ara' />
                <IoMdSearch className='icon-search'/>
            </div>

            <div className='show-users-body'>
                {users.map((user)=> (
                    <ShowUserItem key={user.id} user={user}/>
                ))}
            </div>


    </section>
  )
}

export default ShowUsers
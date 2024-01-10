import React from 'react'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const ShowUserItem = ({user}) => {
  return (
    <article className='show-users-body-item'>
        <p>{user.name}</p>
        <p>Tel: {user.phone}</p>
        <p>Email: {user.email}</p>
        <p>Şifre: {user.password}</p>
        
        <div >
        <div className="icon-background">
             <MdEdit className='icon' />
          </div>
          <div className="icon-background">
             <MdDelete className='icon' />
          </div>
        
        </div>
    </article>
  )
}

export default ShowUserItem
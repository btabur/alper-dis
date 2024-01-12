import React from 'react'


const ShowUserItem = ({user}) => {
  return (
    <article className='show-users-body-item'>
        <p>{user.name}</p>
        <p>Tel: {user.phone}</p>
        <p>Email: {user.email}</p>
        <p>Şifre: {user.password}</p>
    </article>
  )
}

export default ShowUserItem
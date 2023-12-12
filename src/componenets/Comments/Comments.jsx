import React from 'react'
import Card from './Card'

const Comments = () => {
    const coms = [
        {
            name: 'Ahmet Çalışkan',
            photo: './public/comment-1.png',
            rate:5,
            com:'Güleryüzlü ve hızlı personel... Diş bakımına ihtiyacı olan herkese şiddetle tavsiye ederim.'
        },
        {
            name: 'Derya Deniz',
            photo: './public/comment-2.png',
            rate:4,
            com:'Memnun kaldım, ciddiyeti, profesyonelliği, misafirperverliği buldum... teşekkür ederim'
        }, 
        {
            name:'Ahmet Tekin',
            photo: './public/comment-3.png',
            rate:5,
            com: 'Yeni implantlarda yeni dişler. Gülümsemem geri geldi. Tekrar teşekkürler.'
        }
    ]
  return (
    <section className="comments">
        <h3>Yorumlarımız</h3>
        <h2>Hakkımızda Neler Söylüyorlar ?</h2>
        <div className="cards">
            {coms.map((item,i)=> (
                <Card key={i} card={item}/>
            ))}
        </div>

    </section>
  )
}

export default Comments
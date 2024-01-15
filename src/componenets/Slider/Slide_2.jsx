import React from 'react'
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { auth } from '../../firebase/config';

const Slide_2 = () => {
  const navigate = useNavigate()
 
  const handleRandevu = ()=> {
    if(auth.currentUser) {
      navigate('/randevu')
    }else {
      navigate('/login')
      toast.info('Randevu almak için Oturum açmanız gerekir')
    }
  }
  return (
    <article className=' slide slide-2'>
        <div className="info">
            <h2>Diş Beyazlatma</h2>
            <i>"El Aletleriyle Profesyonel Temizlik" </i>
            <p>Sağlıklı ve parlak dişler, güzellik ve özgüvenin anahtarıdır. Diş beyazlatma hizmetimizle, sizlere daha beyaz, daha parlak ve daha çekici bir gülüş sunuyoruz. Modern diş beyazlatma teknolojimiz, lekeleri, sararmayı ve renk tonu farklılıklarını hızla ortadan kaldırarak sizi hayalinizdeki gülüşe bir adım daha yaklaştırıyor.</p>
            <button onClick={handleRandevu} className='button'> Online Randevu</button>
        </div>
       


    </article>
  )
}

export default Slide_2

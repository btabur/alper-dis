import React from 'react'
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { auth } from '../../firebase/config';


const Slider_1 = () => {

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
    <article className=' slide slide-1'>

            <div className="info">
            <h2>Zirkonyum Diş</h2>
            <i>"Estetik ve İşlevsel Çözümler için Çene ve Yüz Estetiği"</i>
            <p>Sizi rahatsız eden çene ve yüz şekil bozukluklarında, sağlığınız ve estetiğiniz için 
                ortogonatik cerrahiye güvenin. Dişlerin ve çenenin birbirine uyum sağlayan estetik bir görünüme 
                kavuşması için tercih edeceğiniz çene ve yüz estetiği tedavisi ile dişleriniz için 
                hem işlevsel hem de mükemmel görünen çözümlere ulaşın 
            </p>
            <button onClick={handleRandevu} className='button'> Online Randevu</button>
            </div>
            
    
    </article>
  )
}

export default Slider_1

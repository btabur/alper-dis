import React from 'react'

const About = () => {
    
  return (
    <section className="about">
        <article className="left">
        <h3>Hakkımızda</h3>
        <h2>Biz Kimiz?</h2>
        <p>Alper Karabağ Diş Sağlığı Merkezi, Kalite, Çevre ve Güvenlik alanında 3 ISO Sertifikasına sahip ilk özel sağlık şirketidir. Hastalara sunulan hizmetlerin kalitesi üçüncü taraf kuruluşlar tarafından onaylanmıştır ve yenilik ve eğitim, mesleğin gelişiminde temel bir rol oynamaktadır.</p>
        <div className='hour'>
            <div className='background'>
                <img src="./public/icons/clock.png" />
            </div>
            <div className='info'>
                <p>Herkes için uygun saatler</p>
                <span>Sabah 9'dan akşam 17'ye kadar sürekli olarak açıktır.</span>
            </div>
           
        </div>
        <div className='hour'>
            <div className='background'>
                <img src="./public/icons/icon-5.png" />
            </div>
            <div className='info'>
                <p>Ödeme şartları</p>
                <span>Kişiye özel ödeme planı sunuyoruz. Hastanın sağlığı her zaman ilk hedefimizdir.</span>
            </div>
          
        </div>
        </article>
        <article className="right">
            <div className="background"></div>
            <img src="./public/about.png" alt="" />
        </article>
      
    </section>
  )
}

export default About
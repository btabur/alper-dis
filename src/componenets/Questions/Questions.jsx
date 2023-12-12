import React from 'react'
import Card from './Card'

const Questions = () => {
    const ques = [
        {
            question: 'Gün içinde dişlerinizi ne zaman fırçalamalısınız?',
            answer: 'Ana yemeklerden 20 ila 30 dakika sonra, tükürüğün turunçgiller, kahve ve gazlı içecekler gibi bazı gıdaların asitliğini nötralize etmesine izin vermek için. Dişler en az iki dakika fırçalanmalıdır. Diş eti iltihabından muzdarip olanlar bunun yerine 4-5\'e gitmelidir.'
        }, 
        {   
            question: 'Diş teliniz varsa hangi gıdalar dişlerinizi temiz tutmaya yardımcı olur?',
            answer:'Diş telleri, özel bir bakıma ihtiyaç duyan bir ortodontik cihazdır. Diş telleri olan kişiler, gıda artıklarının ve plak oluşumunun önlenmesi için ekstra dikkatli olmalıdır. İşte diş telleri ile birlikte kullanılmak üzere dişleri temiz tutmaya yardımcı olan bazı gıdalar ve önemli bakım ipuçları: \n '+
            '1. Su : Su, ağız içindeki asitleri nötralize eder, dişleri temizler ve tükürük üretimini artırarak ağız hijyenini destekler. \n'+
            '2. Meyve ve Sebzeler: Elma, havuç, kereviz gibi çiğ meyve ve sebzeler, çiğneme işlemi sırasında dişleri temizler ve tükürük salgısını artırır. \n'+
            'Bununla birlikte, diş telleri olan kişiler diş bakımına ekstra özen göstermelidir. Diş tellerinin etrafındaki plak birikimini azaltmak için diş ipi, özel fırça uçları veya su fışkırtıcılar gibi temizlik araçlarını kullanmak önemlidir. Ayrıca, düzenli diş kontrolleri ve diş hekiminin önerdiği bakım rutinlerini takip etmek de önemlidir.'
        },
        {
            question:'Çocukların dişleri nasıl doğru şekilde temizlenir?',
            answer:'1. Diş Fırçası Seçimi: \n Yumuşak kıllı, küçük başlı bir diş fırçası seçin. Çocukların yaşına ve diş yapısına uygun bir fırça kullanmak önemlidir.'+
            '2. Florürlü Diş Macunu Kullanımı: \n'+
            '2 yaşından itibaren çocuklara küçük bir bezelye büyüklüğünde florürlü diş macunu kullanılabilir. Florür, diş minesini güçlendirir ve çürük oluşumunu engeller.'
        }, 
        {
            question:'Sert kıllı diş fırçaları daha derin bir temizlik sağlar mı?',
            answer:'Sert kıllı diş fırçaları, diş minesine zarar verebilecekleri için genellikle önerilmez. Diş minesinin yüzeyini çizebilir, diş etlerine zarar verebilir ve hassasiyete yol açabilirler. Bu nedenle, genel olarak diş hekimleri ve diş hijyeni uzmanları, orta sertlikte veya yumuşak kıllı diş fırçalarını önerirler.'
        }
    ]
  return (
   <section className='questions'>
            <h3>Sıkça Sorulan Sorular</h3>
            <h2>Herhangi bir sorun var mı ?</h2>

            <div className="cards">
            {
                    ques.map((item,i)=> (
                        <Card key={i} card={item} index={i}/>
                    ))
                }
            </div>
           
            <button>Daha Fazla</button>
        
           

   </section>
  )
}

export default Questions

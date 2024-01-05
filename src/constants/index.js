export const optionsTreatment = [
    { value: 'İmplant', label: 'İmplant' },
    { value: 'Gülüs Tasarimi', label: 'Gülüş Tasarımı' },
    { value: 'Kanal Tedavisi', label: 'Kanal Tedavisi' },
    { value: 'Beyazlatma', label: 'Beyazlatma' },
    { value: 'Protez Çesitleri', label: 'Protez Çeşitleri' },
    { value: 'Zirkonyum Kaplama', label: 'Zirkonyum Kaplama' },
    { value: 'Yaprak Porselen', label: 'Yaprak Porselen' },
    { value: 'Dolgu', label: 'Dolgu' },
    { value: 'Dis Eti Hastaliklari', label: 'Diş Eti Hastalıkları' },
    { value: 'Çocuk Dis', label: 'Çocuk diş Hekimliği' },
  ]

  export const optionsHour = [
    {value: '08:00', label:'08:00'},
    {value: '08:30', label:'08:30'},
    {value: '09:00', label:'09:00'},
    {value: '09:30', label:'09:30'},
    {value: '10:00', label:'10:00'},
    {value: '10:30', label:'10:30'},
    {value: '11:00', label:'11:00'},
    {value: '11:30', label:'11:30'},
    {value: '12:00', label:'12:00'},
    {value: '12:30', label:'12:30'},
    {value: '13:30', label:'13:30'},
    {value: '14:00', label:'14:00'},
    {value: '14:30', label:'14:30'},
    {value: '15:00', label:'15:00'},
    {value: '15:30', label:'15:30'},
    {value: '16:00', label:'16:00'},
    {value: '16:30', label:'16:30'},
    {value: '17:00', label:'17:00'},
    {value: '17:30', label:'17:30'},
    {value: '18:00', label:'18:00'},
    {value: '18:30', label:'18:30'},
  ]


   //tarihi istediğimiz formata çeviriyoruz
 export function formatDate(inputDate) {
    // Verilen tarihi Date objesine çevir
    const dateObject = new Date(inputDate);
  
    // Tarih değerini kontrol et
    if (isNaN(dateObject.getTime())) {
      // Hatalı bir tarih girildiyse
      return "Geçersiz Tarih";
    } else {
      // Tarihi belirli bir formatta biçimlendir
      const formattedDate =
        ("0" + dateObject.getDate()).slice(-2) +
        "/" +
        ("0" + (dateObject.getMonth() + 1)).slice(-2) +
        "/" +
        dateObject.getFullYear();
  
      return formattedDate;
    }
  }


  //bu günün tarihini istenen formatta döndürür
 export const getCurentDay= ()=> {
    const day = new Date();

    // Yıl, ay ve gün bilgilerini al
    const year = day.getFullYear();
    const month = String(day.getMonth() + 1).padStart(2, '0'); // Ay 0-11 arasında olduğu için +1 eklenir
    const date = String(day.getDate()).padStart(2, '0');
    
    // YYYY-MM-DD formatında string'i oluştur
    const formattedDate = `${year}-${month}-${date}`;

    return formattedDate;
  }
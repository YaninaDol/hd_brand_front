
import React from 'react';
import PxMainPage from './PxMainPage';
import { Link, Outlet } from "react-router-dom";
import Footer from '../Components/Footer';
import { useState } from "react";
import { useEffect } from "react";

const Agreement = () => {
  
const [selectedCurrency, setSelectedCurrency] = useState('UAH');
const [exchangeRates, setExchangeRates] = useState({
  usd: 1, 
  eur: 1,
});

const handleCurrencyChange = (selectedCurrency) => {
  setSelectedCurrency((prevCurrency) => {
   
    const newCurrency = selectedCurrency;

   
    window.sessionStorage.setItem('selectedCurrency', selectedCurrency);

    return newCurrency;
  });
};

useEffect(()=>

{
  window.scrollTo(0, 0);
  fetchExchangeRates();

  const savedCurrency =  window.sessionStorage.getItem('selectedCurrency');


if (savedCurrency) {
  setSelectedCurrency(savedCurrency);
}
 

}, []);


const fetchExchangeRates = async () => {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/UAH');
    const data = await response.json();

   
    const newExchangeRates = {
      usd: data.rates.USD,
      eur: data.rates.EUR,
    
    };

    setExchangeRates(newExchangeRates);
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
  }
};

const convertPrice = (price, currency) => {
  if (currency === 'USD') {
    return (price * exchangeRates.usd).toFixed(0);
  } else if (currency === 'EUR') {
    return (price * exchangeRates.eur).toFixed(0);
  } else {
   
    return price;
  }
};
  
  return (
    <div >
       <div style={{ position: 'fixed', width: '100%', zIndex: '1000', top: '0' }}>
  <PxMainPage convertPrice={convertPrice} selectedCurrency={selectedCurrency} handleCurrencyChange={handleCurrencyChange} />
</div>
     <div className="stock-status" style={{marginTop:'160px'}}>
      <Link to="/"><div className="div33">Головна </div></Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
<Link to="/faq"><div className="div34">Договір оферти</div></Link>
</div>
<div className='agreement'  >
<h1>Конфіденційність і захист персональних даних</h1>
<div>
<p>Надаючи свої персональні дані на сайті Інтернет-магазину при реєстрації або оформленні Замовлення, Покупець надає Продавцеві свою добровільну згоду на обробку, використання (у тому числі і передачу) своїх персональних даних, а також вчинення інших дій, передбачених Законом України «Про захист персональних даних», без обмеження терміну дії такої згоди.</p>
    
    <p>Продавець зобов'язується не розголошувати отриману від Покупця інформацію. Не вважається порушенням надання Продавцем інформації контрагентам і третім особам, що діють на підставі договору з Продавцем, в тому числі і для виконання зобов'язань перед Покупцем, а також у випадках, коли розкриття такої інформації встановлено вимогами чинного законодавства України.</p>
    
    <p>Покупець несе відповідальність за підтримання своїх персональних даних в актуальному стані. Продавець не несе відповідальності за неякісне виконання або невиконання своїх зобов'язань у зв'язку з неактуальністю інформації про Покупця або невідповідністю її дійсності.</p>
    
    <p>Заповнюючи форму «Оформлення замовлення» та/або проходячи процедуру реєстрації на веб-сайті: <a href="https://hdbrand.com.ua/">https://hdbrand.com.ua/</a> Інтернет-магазину Покупець надає свою повну цілковиту та безстрокову згоду на обробку та використання Продавцем інформації про Покупця, в тому числі інформації, що відповідно до чинного законодавства України вважається персональними даними, виключно в наступних цілях:</p>
    
    <ul>
        <li>з метою реєстрації та ідентифікації Покупця в Інтернет-магазині;</li>
        <li>з метою поновлення пароля реєстрації Покупця в Інтернет-магазині;</li>
        <li>в маркетингових цілях, а саме: повідомлення Покупця за допомогою SMS, електронної пошти, соціальних мереж тощо про новини Інтернет-магазину, Акційні пропозиції та Розпродажі Товарів, що проводяться Продавцем в Інтернет-магазині, здійснення аналізу ринку споживання Товару, визначення кола потенційних Покупців, визначення потреб потенційних Покупців у Товарах, що пропонуються до продажу тощо;</li>
        <li>з метою сумлінного виконання Продавцем своїх договірних зобов’язань перед Покупцем, в тому числі зобов’язань щодо доставки Товару;</li>
        <li>з метою виконання Продавцем вимог чинного законодавства України, в тому числі законодавства про захист прав споживачів.</li>
    </ul>
</div>
</div>

<Footer />
    </div>
  );
};

export default Agreement;

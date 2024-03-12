
import React from 'react';
import PxMainPage from './PxMainPage';
import { Link, Outlet } from "react-router-dom";
import Footer from '../Components/Footer';
import './ContentPage.css';
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

const FAQ = () => {
  
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
      <PxMainPage convertPrice={convertPrice} selectedCurrency={selectedCurrency} handleCurrencyChange={handleCurrencyChange} />
     <div className="stock-status">
      <Link to="/"><div className="div33">Головна </div></Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
<Link to="/faq"><div className="div34">FAQ</div></Link>
</div>



<div style={{margin:'15px'}} class="accordion accordion-flush" id="accordionFlushExample">

  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      Як замовити товар?
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Додайте обраний товар у кошик, заповніть всі необхідні поля на сторінці оформлення замовлення та натисніть кнопку «Підтвердження замовлення». Якщо у вас виникають труднощі при оформленні замовлення, ви завжди можете зателефонувати на номер гарячої лінії +380731773777 (щодня з 9:00 до 23:00) або написати на електронну пошту info@hdbrand.ua.

Після  оформлення замовлення менеджер зв’яжеться з вами для уточнення деталей, якщо ви впевнені у своєму замовленні та вам не потрібна додаткова інформація, ви можете відзначити замовлення галочкою «Я не потребую дзвінка менеджера»</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
      Чи можна обміняти або повернути товар?
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Ви можете повернути товар відповідної якості протягом 14 днів з моменту отримання замовлення з інтернет-магазину

Повернення товару відповідної якості можливе тільки, якщо річ не була у використанні, збережені її товарний вигляд, всі виробничі бірочки, а також  чек про придбання товару

При поверненні обробка займає до 5  робочих днів з моменту отримання посилки. Після обробки вашого повернення грошові кошти повертаються на карту, з якої було зроблене замовлення на сайті. Строки повернення коштів складають 7 робочих днів, але завжди намагаємось зробити це якнайшвидше.

Інтернет-магазин має право відмовити в поверненні в разі виявлення порушень умов зберігання товарного вигляду.

Для оформлення повернення заповніть будь ласка бланк, який ви отримали разом зі своїм замовленням. Якщо бланк не збережено, ви можете його завантажити тут. 

Та надсилайте придбаний товар разом з бланком, замовивши послугу "Легке повернення" у мобільному додатку або в онлайн-кабінеті Нової пошти. 

Щоб скористатися Легким поверненням, вам потрібно:

1. Увійти в мобільний додаток Нової пошти або бізнес-кабінет.

2. Відкрити «Мої відправлення» та обрати отриману посилку, яку бажаєте повернути.

3. У розділі «Керувати посилкою» вибрати «Легке повернення».

4. Зазначити причину повернення товару із запропонованого переліку.

5. Створити нову електронну накладну та відправити товар отримувачу у поштомат, відділення або на адресу.

Всі витрати з обміну та повернення товару несе покупець, окрім випадків виробничого браку. 

Важливо! Обміну та поверненню не підлягають: спідня білизна, купальники, боді, корсети, панчішно-шкарпеткові вироби, рукавички.

Повернути товар, який ви замовили онлайн ви можете тільки в інтернет-магазині, а придбаний товар в офлайн магазинах також можна повернути тільки у місці купівлі.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
      Способи оплати і доставки
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body"><h5>ОПЛАТА для замовлень по Україні<br/> </h5>

• оплата за реквізитами <br/>
• накладний платіж <br/>
• посилка в кредит від Нової Пошти <br/>
• оплата онлайн/ LiqPay <br/>
• Apple Pay <br/>
• Google Pay <br/>

<h5>ОПЛАТА для міжнародних замовлень <br/></h5>

•  LiqPay <br/>
•  PayPal <br/>
•  Western Union <br/>
•  Money Gram <br/>


<h5>Способи доставки <br/></h5>

• Нова Пошта - вся Україна (за рахунок замовника) <br/>
• Укрпошта - WORLDWIDE , окрім росії та Білорусі/від 20$ <br/>


Термін доставки по Польщі 4-6 днів <br/>
Термін доставки в інші країни EU 5-7 днів <br/>
При замовленні від 150€ доставка зі складу в країни ЄС безкоштовна</div>
    </div>
  </div>
  
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingFour">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
      Про нас
      </button>
    </h2>
    <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Ми не розділяємо колекції згідно з сезонами, ми кожного тижня створюємо нові моделі. Та виготовляємо їх невеликими партіями, щоб зберегти унікальність.<br/>

HD brand — ідеальна база, яка поєднується з розслабленою класикою, жіночними силуетами та яскравими акцентами, всі речі міксуються між собою, та складають готові образи, щоб ти не витрачала час на роздуми що сьогодні одягнути, та як комбінувати аутфіти.<br/>

Кожна колекція проходить перевірку командою. Починаючи від розробки ескізу і тестування матеріалів до контролю готових виробів.<br/> Головна відмінність — саме ти, наша клієнтка, вирішуєш, що нам запускати та які деталі додавати до образу.</div>
    </div>
  </div>
</div>
<Footer />
    </div>
  );
};

export default FAQ;

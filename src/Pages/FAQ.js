
import React from 'react';
import PxMainPage from './PxMainPage';
import { Link, Outlet } from "react-router-dom";
import Footer from '../Components/Footer';
import './ContentPage.css';
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const {t ,i18n} = useTranslation();
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
<Link to="/faq"><div className="div34">FAQ</div></Link>
</div>



<div style={{margin:'15px'}} class="accordion accordion-flush" id="accordionFlushExample">

  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      {t('about_us')}
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body"> <div className="div66">

{i18n.language === 'en' ? <div>
  Hi there, HD brand here!<br/><br/>

We are a Ukrainian brand of footwear and clothing, founded in the city of Dnipro.<br/><br/>

Our philosophy is not only about creating high-quality and comfortable shoes and clothing but also about delivering joyful emotions from our production right to your doorstep. We always strive to make each of you feel special and to choose exactly what your heart desires.
We are constantly working on creating new models, evolving, and becoming better for you. This is why thousands of girls from different cities and countries choose us.<br/><br/>

HD brand is not just a brand; it's a community united by common values. We aim to raise the bar for Ukrainian production by creating high-quality products for you to enjoy and be proud of when you wear Ukrainian.<br/><br/>

We are very happy to have you with us 🖤
</div>

: <div>Привіт, на звʼязку HD brand!<br/><br/>Ми український бренд власного виробництва взуття та одягу, заснований у місті Дніпро.<br/><br/>
Наша філософія - це не лише створення якісного та комфортного взуття і одягу, але й доставка радісних емоцій від нашого виробництва прямо до ваших дверей. <br/>
Ми завжди намагаємося, щоб кожна з вас відчувала себе особливою і могла обрати для себе саме те, що потребує душа.<br/>
Ми постійно працюємо над створенням нових моделей, розвиваємося і стаємо кращими для вас. Саме тому нас обирають тисячі дівчат із різних міст та країн.<br/><br/>
HD brand - це не просто бренд, це спільнота, що об'єднується спільними цінностями. Ми прагнемо підняти планку українського виробництва, створюючи продукцію високої якості, щоб ви насолоджувалися і пишалися, коли носите українське.<br/><br/>Ми дуже раді, що ти з нами 🖤</div>}
    </div></div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
      {t('return_policy')}
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
      <div className="div65">
      {i18n.language === 'en' ? <div>According to the Law of Ukraine "On Consumer Protection", within 14 days from the date of purchase (for us - from the date of receiving the order), you can return the item and get its cost back. Also, it is possible to exchange for another size or another model.<br/><br/>The item is subject to exchange or refund provided that its consumer properties are preserved (no signs of wear and tear, original and undamaged packaging).<br/><br/>Please note:<br/><br/>• In case of exchange and return, the postal services are paid by the buyer. Except in cases where the reason for the return was a mistake by the site staff.* In this case, we will reimburse the cost of return shipping.<br/><br/>• To return or exchange an item, you need to fill out a form and contact the HD_brand manager via Direct on Instagram or by phone and messengers (+38 (098) 639 86 39 - for shoe returns/exchanges; +38 (098) 639 86 39 - for clothing returns/exchanges).<br/><br/>• Refunds or exchanges for another pair are made only after the package has been returned to the store.<br/><br/>Returns are made by regular package, not by cash on delivery.<br/><br/>* A store mistake means:<br/><br/>• The wrong model was sent as indicated in the order;<br/>• The wrong size was sent as indicated in the order;<br/>• The color of the model does not match the photo (for example, instead of black, the sneakers turned out to be red). Discrepancies in shades of the same color are not considered, as the same image may look different on different monitors;<br/>• A clearly defective model was sent.</div> :  <dv>Відповідно до Закону України «Про захист прав споживачів», протягом 14 днів від дати покупки, (у нас - від дня отримання замовлення), Ви можете повернути товар і отримати його вартість. Також, можливий обмін на інший розмір або іншу модель товару.<br/><br/>Товар підлягає обміну або поверненню грошей за умови збереження його споживчих властивостей (відсутність слідів носіння та експлуатації, наявність оригінального та неушкодженого пакування).<br/><br/>Зверніть увагу:<br/><br/>• У разі обміну та повернення, послуги пошти оплачує покупець. Крім випадків, коли причиною повернення стала помилка працівників сайту.* У цьому випадку ми компенсуємо вартість пересилання повернення.<br/><br/>• Для повернення або обміну товару необхідно заповнити бланк і зв'язатися з менеджером HD_brand у Дірект в Instagram або за телефонами та у мессенджерах (+38 (098) 639 86 39 - для повернення/обміну взуття; +38 (098) 639 86 39 - для повернення/обміну одягу).<br/><br/>• Повернення грошей, або обмін на іншу пару здійснюється лише після того, як посилка повернута в магазин.<br/><br/>Повернення товарів здійснюється звичайною посилкою, а не післяплатою.<br/><br/>* Під помилкою магазину мається на увазі:<br/><br/>• Вислано не ту модель, що вказана в замовленні;<br/>• Вислано не той розмір, що вказаний у замовленні;<br/>• Колір моделі не відповідає фотографії (наприклад: замість чорних, кросівки виявилися червоними). При цьому не враховуються невідповідності відтінку того ж кольору, у зв'язку з тим, що на різних моніторах одне й те саме зображення може виглядати по-різному;<br/>• Вислано явно браковану модель.</dv>}
     
    </div>


</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
      {t('pay_delivery')}
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
      {i18n.language === 'en' ? <div><p>We operate with full or partial prepayment.</p>
<p>Payment is made in the following currencies: Ukrainian Hryvnia (UAH), US Dollar (USD), Euro (EUR).</p>

<ol>
  <li>Partial prepayment – 250 UAH . The difference is paid upon receipt via cash on delivery with Nova Poshta(Ukraine only).</li>
  <p>Please note, Nova Poshta charges a commission of 2% of the amount + 20 UAH for cash on delivery processing.</p>

  <li>Full payment - if you prefer not to pay extra for cash on delivery. Pay the order amount and courier service commission for cash on delivery (delivery cost to Nova Poshta branch or address delivery upon receiving the parcel by courier) after checking the goods at the branch.</li>

  <li>When ordering through the website, you have the option to choose the payment method:</li>
  <ul>
    <li>By bank card on the website (Visa or MasterCard). For the additional payment service LiqPay , with technology existing on the Internet.</li>
  </ul>
</ol>

<p><strong>PLEASE NOTE</strong></p>
<ul>
  <li>If the buyer refuses to receive or does not pick up the parcel at the branch, the prepayment is not refunded. This amount is spent on both sides for parcel forwarding.</li>
  <li>If the buyer has picked up the goods at the branch and wants to return, exchange, or change the size - the delivery will be arranged by the buyer.</li>
</ul>

<h6>About Delivery</h6>
<ol>
  <li>Delivery to Nova Poshta branches throughout Ukraine.</li>
  <li>Delivery to Ukrposhta branches throughout Ukraine and Ukrposhta - WORLDWIDE, except Russia and Belarus / from $20.</li>
</ol>

<p>If one of the items in the order is out of stock, the production of your model starts the same day, with order processing times of 7-10 working days (but we strive to ship as soon as possible).</p>

<p>After placing an order, we will promptly inform you about the availability of the goods and send the order via SMS notification.</p>

<p>Dispatch from Dnipro city. If you want to use the services of another courier service, please inform our manager.</p>

<p><strong>PLEASE NOTE</strong></p>
<ul>
  <li>During sales and holidays, delivery times may be extended. The manager will additionally inform you about this.</li>
  <li>Your order will be stored free of charge at the branch for 5 days. After the deadline, the parcel will be automatically returned to the sender.</li>
</ul>
</div> :<div><p>Ми працюємо за повною або частковою передоплатою.<br/>
Розрахунок відбувається у валюті - гривнях (UAH), долларах (USD), євро (EUR).</p>

<ol>
  <li>Часткова передоплата – 250 грн . Різниця виставляється в рахунок післяплати на Новій Пошті(Тільки по Україні).</li>
  <p>Зверніть увагу, що при цьому способі оплати Нова Пошта бере комісію у розмірі 2% від суми + 20 грн за оформлення післяплати.</p>

  <li>Повна оплата - якщо Ви не хочете переплачувати за накладений платіж. Оплатіть вартість замовлення та комісію кур'єрській службі за післяплату (вартість доставки до відділення "Нова Пошта” або адресної доставки при отриманні посилки кур'єром), після того, як перевірите товари у відділенні.</li>


  <li>При оформленні через сайт у вас є можливість зробити вибір способу оплати:</li>
  <ul>
    <li>Банківською карткою на сайті (Visa або MasterCard). За допомогою платіжного сервісу LiqPay , з технологією захисту даних в Інтернеті.</li>
    <li>Оплата частинами від АТ КБ "ПриватБанк" за допомогою платіжного сервісу LiqPay .</li>
    <li>Миттєва розстрочка від АТ КБ "ПриватБанк" за допомогою платіжного сервісу LiqPay .</li>
  </ul>
</ol>

<p><strong>ЗВЕРНІТЬ УВАГУ</strong></p>
<ul>
  <li>Якщо покупець відмовився від отримання або не прийшов у відділення за посилкою, передоплата не повертається. Так як ця сума витрачається на пересилання товару обидві сторони.</li>
  <li>Якщо товар був забраний покупцем у відділення і хоче повернути товар, обміняти або замінити розмір - доставка здійснюватиметься покупцем.</li>
</ul>

<h6>Про доставку</h6>
<ol>
  <li>Доставка до відділення «Нова Пошта» по всій Україні.</li>
  <li>Доставка до відділення «Укрпошта» по всій Україні та Укрпошта - WORLDWIDE, окрім Росії та Білорусі/від 20$.</li>
</ol>

<p>Якщо один із товарів у замовленні відсутній на складі, цього ж дня починається пошиття вашої моделі, терміни виготовлення замовлення 7-10 робочих днів (але ми намагаємося надіслати якомога раніше).</p>

<p>Після оформлення замовлення ми оперативно проінформуємо вас про наявність товару, та відправлення замовлення за допомогою смс повідомлення.</p>

<p>Відправлення з м. Дніпро. Якщо Ви хочете скористатися послугами іншої кур'єрської служби, повідомте про це менеджеру.</p>

<p><strong>ЗВЕРНІТЬ УВАГУ</strong></p>
<ul>
  <li>У період розпродажів та свят термін доставки може бути збільшений. Менеджер додатково попередить про це.</li>
  <li>Ваше замовлення безкоштовно зберігатиметься на відділенні 5 днів. Після закінчення терміну посилка автоматично повертається відправнику.</li>
</ul>
</div>}
</div>
    </div>
  </div>
  
  
</div>
<Footer />
    </div>
  );
};

export default FAQ;

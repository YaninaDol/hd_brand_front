
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
      ПРО НАС
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body"> <div className="div66">
      <div className="hd-brand-container3">
        <p className="hd-brand2">Привіт, на звʼязку HD brand!</p>
        <p className="blank-line30">&nbsp;</p>
        <p className="p33">
          Ми український бренд власного виробництва взуття та одягу, заснований
          у місті Дніпро.
        </p>
        <p className="blank-line31">&nbsp;</p>
        <p className="p34">
          Наша філософія - це не лише створення якісного та комфортного взуття і
          одягу, але й доставка радісних емоцій від нашого виробництва прямо до
          ваших дверей. Ми завжди намагаємося, щоб кожна з вас відчувала себе
          особливою і могла обрати для себе саме те, що потребує душа.
        </p>
        <p className="blank-line32">&nbsp;</p>
        <p className="p35">
          Ми постійно працюємо над створенням нових моделей, розвиваємося і
          стаємо кращими для вас. Саме тому нас обирають тисячі дівчат із різних
          міст та країн.
        </p>
        <p className="blank-line33">&nbsp;</p>
        <p className="hd-brand-">
          HD brand - це не просто бренд, це спільнота, що об'єднується спільними
          цінностями. Ми прагнемо підняти планку українського виробництва,
          створюючи продукцію високої якості, щоб ви насолоджувалися і пишалися,
          коли носите українське.
        </p>
        <p className="blank-line34">&nbsp;</p>
        <p className="p36">Ми дуже раді, що ти з нами 🖤</p>
      </div>
    </div></div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
      УМОВИ ОБМІНУ ТА ПОВЕРНЕННЯ
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
      <div className="div65">
      <div className="hd-brand-container2">
        <span className="hd-brand-container3">
          <p className="p14">
          </p>
          <p className="blank-line9">
           
          </p>
          <p className="p15">
            <span>
              <span className="span5">{`Відповідно до Закону України «Про захист прав споживачів», протягом 14 днів від дати покупки, (у нас - `}</span>
              <span className="span6">від дня отримання замовлення</span>
              <span>{`), Ви можете повернути товар і отримати його вартість. Також, можливий обмін на інший розмір або іншу модель товару. `}</span>
            </span>
          </p>
          <p className="blank-line11">
            <span>
              <span>&nbsp;</span>
            </span>
          </p>
          <p className="p16">
            <span>
              <span>
                Товар підлягає обміну або поверненню грошей за умови збереження
                його споживчих властивостей (відсутність слідів носіння та
                експлуатації, наявність оригінального та неушкодженого
                пакування).
              </span>
            </span>
          </p>
          <p className="blank-line12">
            <span>
              <span>&nbsp;</span>
            </span>
          </p>
          <p className="p17">
            <span>
              <span className="span7">Зверніть увагу:</span>
            </span>
          </p>
          <p className="blank-line13">
            <span>
              <span className="blank-line14">&nbsp;</span>
            </span>
          </p>
          <p className="p18">
            <span>
              <span>
                • У разі обміну та повернення, послуги пошти оплачує покупець.
                Крім випадків, коли причиною повернення стала помилка
                працівників сайту.
              </span>
            </span>
            <span>
              <span className="span8">{`* `}</span>
            </span>
            <span>
              <span>
                У цьому випадку ми компенсуємо вартість пересилання повернення.
              </span>
            </span>
          </p>
          <p className="blank-line15">
            <span>
              <span>&nbsp;</span>
            </span>
          </p>
          <p className="hd-brand-instagram">
            <span>
              <span>
                ﻿﻿• Для повернення або обміну товару необхідно заповнити бланк і
                зв'язатися з менеджером HD_brand у Дірект в Instagram або за
                телефонами та у мессенджерах (
              </span>
              <span className="span9">{`+38 (098) 639 86 39 `}</span>
              <span className="span10">{`- для повернення/обміну взуття; `}</span>
              <span className="span11">{`+38 (098) 639 86 39 `}</span>
              <span>- для повернення/обміну одягу).</span>
            </span>
          </p>
          <p className="blank-line16">
            <span>
              <span>&nbsp;</span>
            </span>
          </p>
          <p className="p19">
            <span>
              <span>
                ﻿﻿• Повернення грошей, або обмін на іншу пару здійснюється лише
                після того, як посилка повернута в магазин.
              </span>
            </span>
          </p>
          <p className="blank-line17">
            <span>
              <span>&nbsp;</span>
            </span>
          </p>
          <p className="p20">
            <span>
              <span className="span12">
                Повернення товарів здійснюється звичайною посилкою, а не
                післяплатою.
              </span>
            </span>
          </p>
          <p className="blank-line18">
            <span>
              <span className="blank-line19">&nbsp;</span>
            </span>
          </p>
          <p className="blank-line20">
            <span>
              <span className="blank-line21">&nbsp;</span>
            </span>
          </p>
          <p className="p21">
            <span>
              <span className="span13">*</span>
              <span> Під помилкою магазину мається на увазі:</span>
            </span>
          </p>
          <p className="blank-line22">
            <span>
              <span>&nbsp;</span>
            </span>
          </p>
          <p className="p22">
            <span>
              <span>﻿﻿﻿﻿• Вислано не ту модель, що вказана в замовленні;</span>
            </span>
          </p>
          <p className="p23">
            <span>
              <span>
                ﻿﻿﻿﻿• Вислано не той розмір, що вказаний у замовленні;
              </span>
            </span>
          </p>
          <p className="p24">
            <span>
              <span>
                ﻿﻿﻿﻿• Колір моделі не відповідає фотографії (наприклад: замість
                чорних, кросівки виявилися червоними). При цьому не враховуються
                невідповідності відтінку того ж кольору, у зв'язку з тим, що на
                різних моніторах одне й те саме зображення може виглядати
                по-різному;
              </span>
            </span>
          </p>
          <p className="p25">
            <span>
              <span>﻿﻿﻿﻿﻿﻿• Вислано явно браковану модель.</span>
            </span>
          </p>
        </span>
      </div>
    </div>


</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
      ОПЛАТА ТА ДОСТАВКА
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">


      <div className="div66">
      <div className="uah-usd-container">
     
        <p className="blank-line23">
          <span className="blank-line24">&nbsp;</span>
        </p>
        <p className="p27">
          <span className="span14">Про оплату</span>
        </p>
        <p className="uah-usd-eu">
          <span className="uah-usd">
             Ми працюємо за повною або частковою передоплатою. Розрахунок
            відбувається у валюті - гривнях (UAH), долларах (USD), євро
            (EUR).  1. Часткова передоплата – 250 грн (за кожну одиницю на
            замовлення). Різниця виставляється в рахунок післяплати на Новій
            Пошті. 
          </span>
        </p>
        <p className="p28">
          <span className="span15">Зверніть увагу</span>
          <span className="span16">
            , що при цьому способі оплати Нова Пошта бере комісію у розмірі 2%
            від суми + 20 грн за оформлення післяплати
          </span>
        </p>
        <p className="p29">
          <span className="span17">
             2. Повна оплата - якщо Ви не хочете переплачувати за накладений
            платіж. Оплатіть вартість замовлення та комісію кур'єрській службі
            за післяплату (вартість доставки до відділення "Нова Пошта” або
            адресної доставки при отриманні посилки кур'єром), після того, як
            перевірите товари у відділенні.
          </span>
        </p>
        <p className="blank-line25">
          <span className="blank-line26">&nbsp;</span>
        </p>
        <p className="p30">
          <span className="span18">
            3. При оформленні через сайт у вас є можливість зробити вибір
            способу оплати:
          </span>
        </p>
        <p className="visa-mastercard">
          <span className="visa-mastercard1">
             ﻿﻿• Банківською карткою на сайті (Visa або MasterCard). Ми
            використовуємо платіжний сервіс LiqPay з технологією захисту даних в
            Інтернеті.
          </span>
        </p>
        <p className="monobank-">
          <span className="monobank-1">
            ﻿﻿• Передоплата або повна оплата на картку ПриватБанк або Monobank -
            у цьому випадку вам необхідно дочекатися дзвінка або повідомлення
            від нашого менеджера, якій надішле вам дані для оплати.  
          </span>
          <span className="span19">ЗВЕРНІТЬ УВАГУ</span>
        </p>
        <p className="p31">
          <span className="span20">
             ﻿﻿• Якщо покупець відмовився від отримання або не прийшов у
            відділення за посилкою, передоплата не повертається. Так як ця сума
            витрачається на пересилання товару обидві сторони. ﻿﻿• Якщо товар
            був забраний покупцем у відділення і хоче повернути товар, обміняти
            або замінити розмір - доставка здійснюватиметься покупцем.
          </span>
        </p>
        <p className="blank-line27">
          <span className="blank-line28">&nbsp;</span>
        </p>
        <p className="blank-line29">
          <span className="blank-line30">&nbsp;</span>
        </p>
        <p className="p32">
          <span className="span21">Про доставку</span>
        </p>
        <p className="worldwide">
          <span className="worldwide1">
             1. Доставка до відділення «Нова Пошта» по всій Україні. 2. Доставка
            до відділення «Укрпошта» по всій Україні та Укрпошта - WORLDWIDE ,
            окрім росії та Білорусі/від 20$.
          </span>
        </p>
        <p className="p33">
          <span className="span22">
             Якщо один із товарів у замовленні відсутній на складі, цього ж дня
            починається пошиття вашої моделі, терміни виготовлення замовлення
            5-7 робочих днів (але ми намагаємося надіслати якомога
            раніше).  Після оформлення замовлення ми оперативно проінформуємо
            вас про наявність товару, та відправлення замовлення за допомогою
            смс повідомлення.  Відправлення з м. Дніпро. Якщо Ви хочете
            скористатися послугами іншої кур'єрської служби, повідомте про це
            менеджеру.
          </span>
        </p>
        <p className="blank-line31">
          <span className="blank-line32">&nbsp;</span>
        </p>
        <p className="p34">
          <span className="span23">ЗВЕРНІТЬ УВАГУ</span>
        </p>
        <p className="p35">
          <span className="span24">
             ﻿﻿• У період розпродажів та свят термін доставки може бути
            збільшений. Менеджер додатково попередить про це.
          </span>
        </p>
        <p className="blank-line33">
          <span className="blank-line34">&nbsp;</span>
        </p>
        <p className="p36">
          <span className="span25">
            ﻿﻿• Ваше замовлення безкоштовно зберігатиметься на відділенні 5
            днів. Після закінчення терміну посилка автоматично повертається
            відправнику.
          </span>
        </p>
      </div>
    </div>
</div>
    </div>
  </div>
  
  
</div>
<Footer />
    </div>
  );
};

export default FAQ;

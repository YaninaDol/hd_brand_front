
import React from 'react';
import PxMainPage from './PxMainPage';
import { Link, Outlet } from "react-router-dom";
import Footer from '../Components/Footer';
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
const PublicOfert = () => {
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
      <Link to="/"><div className="div33">{t('home')} </div></Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
<Link to="/faq"><div className="div34">{t('public_offert')}</div></Link>
</div>
{i18n.language === 'en' ? <div className='agreement'>
    <h1>{t('public_offert')}</h1>
    <div>  This contract is the official and public offer of the Seller to conclude a contract of sale of Goods presented on the website hdbrand.com.ua. This contract is public, meaning that according to Article 633 of the Civil Code of Ukraine, its terms are the same for all buyers regardless of their status (individual, legal entity, individual entrepreneur) without giving preference to one buyer over another. By entering into this Agreement, the buyer fully accepts the terms and conditions of ordering, payment for goods, delivery of goods, return of goods, liability for improper ordering, and all other terms of the contract. The contract is considered concluded from the moment of pressing the "Confirm Order" button on the order processing page in the "Cart" section and the Buyer receiving confirmation of the order from the Seller in electronic form. 
    <h2>1. Definitions</h2>
    <p>1.1. Public offer (hereinafter - "Offer") - a public offer of the Seller addressed to an indefinite circle of persons to conclude a contract of sale of goods remotely (hereinafter - "Contract") on the terms contained in this Offer.</p>
    <p>1.2. Goods or Services – the subject matter of the agreement between the parties, which has been selected by the buyer on the website of the Internet store and placed in the cart, or already purchased by the Buyer from the Seller remotely.</p>
    <p>1.3. Internet store – the Seller's website at https://hdbrand.com.ua/ created for the conclusion of contracts for retail and wholesale sale and purchase based on the Buyer's acquaintance with the Seller's proposed description of the Goods through the Internet.</p>
    <p>1.4. Buyer – a capable natural person who has reached the age of 18, receives information from the Seller, places an order for the purchase of goods presented on the website of the Internet store for purposes not related to entrepreneurial activity, or a legal entity or individual entrepreneur.</p>
    <p>1.5. Seller – Individual entrepreneur "Honcharenko Yaroslav Oleksandrovych" Address: 49000, Dnipro City Korobova Street, Building 8 Tel. (+380) 63 722 39 20 r/r UA953052990000026002050592268, PJSC KB "PrivatBank", Dnipro City, EDRPOU 3264604374 Bank code 305299 EDRPOU of the bank 14360570 The payer of a single tax-2 group, not a VAT payer.</p>

    <h2>2. Subject Matter of the Agreement</h2>
    <p>2.1. The Seller undertakes to transfer the Goods to the ownership of the Buyer, and the Buyer undertakes to pay for and accept the Goods on the terms of this Agreement.</p>
    <p>2.2. The date of conclusion of the Contract-offer (acceptance of the offer) and the moment of full and unconditional acceptance of the conditions of the Contract by the Buyer are considered to be the date of filling in the Buyer's order form located on the website of the Internet store, provided that the Buyer receives confirmation of the order from the Seller in electronic form. If necessary, at the Buyer's request, the Contract may be executed in writing.</p>

    <h2>3. Order Processing</h2>
    <p>3.1. The Buyer independently places an order in the Internet store through the "Cart" form, or by placing an order by email or by phone number indicated in the contact section of the Internet store.</p>
    <p>3.2. The Seller has the right to refuse to transfer the order to the Buyer if the information provided by the Buyer during the order processing is incomplete or raises suspicion about its authenticity.</p>
    <p>3.3. When placing an order on the website of the Internet store, the Buyer undertakes to provide the following mandatory information necessary for the Seller to fulfill the order:</p>
    <p>3.3.1. Last name, first name of the Buyer;</p>
    <p>3.3.2. Address to which the Goods should be delivered (if delivery to the Buyer's address);</p>
    <p>3.3.3. Contact phone number.</p>
    <p>3.3.4. Identification code for a legal entity or individual entrepreneur.</p>

    <p>3.4. The name, quantity, article, price of the Goods chosen by the Buyer are specified in the Buyer's cart on the website of the Internet store.</p>
    <p>3.5. If either Party to the contract requires additional information, it has the right to request it from the other Party. In case of failure to provide the necessary information by the Buyer, the Seller is not responsible for providing quality service to the Buyer when purchasing goods in an online store.</p>
    <p>3.6. When placing an order through the Seller's operator (clause 3.1 of this Offer), the Buyer undertakes to provide the information specified in clauses 3.3 – 3.4 of this Offer.</p>
    <p>3.7. The acceptance by the Buyer of the terms of this Offer is carried out by the Buyer entering the relevant data in the registration form on the website of the Internet store or when placing an order through an operator. After placing the Order through the Operator, the Buyer's data is entered into the Seller's database.</p>
    <p>3.8. The Buyer is responsible for the accuracy of the information provided when placing the Order.</p>
    <p>3.9. By concluding the Contract, i.e., by accepting the terms of this proposal (the proposed conditions for the purchase of the Goods) by placing an Order, the Buyer confirms the following:</p>

    <p>a - The Buyer is fully familiar with and agrees to the terms of this proposal (offer);</p>
    <p>b - The Buyer gives permission for the collection, processing, and transfer of personal data, permission for the processing of personal data for the entire term of the Contract, as well as for an unlimited period after its expiration. In addition, by concluding the contract, the Buyer confirms that he has been informed (without additional notification) about the rights established by the Law of Ukraine "On Protection of Personal Data," about the purposes of data collection, and that his personal data is transferred to the Seller for the purpose of fulfilling the conditions of this Contract, the possibility of conducting settlements, as well as for obtaining invoices, acts, and other documents. The Buyer also agrees that the Seller has the right to provide access to and transfer his personal data to third parties without any additional notices to the Buyer for the purpose of fulfilling the Buyer's order. The extent of the Buyer's rights as a subject of personal data under the Law of Ukraine "On Protection of Personal Data" is known and understood by him.</p>

    <h2>4. Price and Delivery of Goods</h2>
    <p>4.1. Prices for Goods and services are determined by the Seller independently and indicated on the website of the Internet store. All prices for Goods and services are indicated on the website in UAH including VAT.</p>
    <p>4.2. Prices for Goods and services may be changed by the Seller unilaterally depending on market conditions. At the same time, the price of a separate unit of Goods, the cost of which has been paid by the Buyer in full, cannot be changed by the Seller unilaterally.</p>
    <p>4.3. The cost of the Goods indicated on the website of the Internet store does not include the cost of delivery of the Goods to the Buyer. The cost of delivery of the Goods is paid by the Buyer according to the current tariffs of delivery services (carriers) directly chosen by him.</p>
    <p>4.4. The cost of the Goods indicated on the website of the Internet store does not include the cost of delivery of the Goods to the Buyer's address.</p>
    <p>4.5. The Seller may indicate the approximate cost of delivery of the Goods to the Buyer's address when the Buyer applies with the corresponding request to the Seller by sending an email or when placing an order through an Internet store operator.</p>
    <p>4.6. The Buyer's obligation to pay for the Goods is considered fulfilled from the moment the funds are received by the Seller.</p>
    <p>4.7. Settlements between the Seller and the Buyer for the Goods are made by the methods indicated on the website of the Internet store in the "Payment and Delivery" section.</p>

    <p>4.8. Upon receipt of the Goods, the Buyer must, in the presence of a representative of the delivery service (carrier), check the compliance of the Goods with qualitative and quantitative characteristics (name of the Goods, quantity, completeness, shelf life).</p>
    <p>4.9. The Buyer or his representative, upon receipt of the Goods, confirms by his signature on the sales receipt/order/transportation bill for the delivery of goods that there are no claims to the quantity of goods, appearance, and completeness of the goods.</p>
    <p>4.10. The right of ownership and the risk of accidental loss or damage to the Goods pass to the Buyer or his Representative from the moment of receipt of the Goods by the Buyer in the city of delivery of the Goods in case of self-delivery of the Goods from the Seller, or when transferring the Goods by the Seller to the delivery service (carrier) chosen by the Buyer.</p>

    <h2>5. Seller's Rights and Obligations</h2>
    <p>5.1. The Seller has the right to unilaterally change the terms of this Offer without notifying the Buyer. At the same time, all changes take effect from the moment of posting the new version of the Offer on the Seller's website.</p>
    <p>5.2. The Seller has the right to refuse to fulfill its obligations under this Offer in case of force majeure circumstances, as well as in other cases specified in this Offer.</p>
    <p>5.3. The Seller has the right to suspend or terminate the operation of the Internet store, unilaterally change the terms of the Offer, and unilaterally terminate this Offer. All changes take effect from the moment of posting a new version of the Offer on the Seller's website.</p>
    <p>5.4. The Seller undertakes to transfer the Goods to the Buyer in accordance with the terms of this Offer.</p>
    <p>5.5. The Seller undertakes to transfer the Goods to the Buyer at the prices and on the terms specified in this Offer.</p>
    <p>5.6. The Seller undertakes to inform the Buyer about the terms of payment and delivery of the Goods.</p>
    <p>5.7. The Seller undertakes to maintain the confidentiality of the Buyer's personal data in accordance with the Law of Ukraine "On Protection of Personal Data" and not to transfer the Buyer's personal data to third parties without the Buyer's consent, except as provided by the legislation of Ukraine.</p>

    <h2>6. Buyer's Rights and Obligations</h2>
    <p>6.1. The Buyer has the right to order and receive the Goods on the terms of this Offer.</p>
    <p>6.2. The Buyer undertakes to pay for the Goods and accept the Goods on the terms of this Offer.</p>
    <p>6.3. The Buyer undertakes to familiarize himself with the terms of this Offer and the prices for the Goods before placing an order on the website of the Internet store.</p>
    <p>6.4. The Buyer undertakes to check the completeness and condition of the Goods upon receipt and pay for the Goods in the amount and on the terms specified in this Offer.</p>
    <p>6.5. The Buyer undertakes to comply with the terms of payment for the Goods and take measures to prevent unauthorized access to information about his registration in the Internet store.</p>
    <p>6.6. The Buyer undertakes not to use the website of the Internet store and the Goods for entrepreneurial activities, except in cases stipulated by the legislation of Ukraine.</p>
    <p>6.7. The Buyer undertakes to comply with the provisions of this Offer and all applicable legislation of Ukraine.</p>

    <h2>7. Responsibility of the Parties</h2>
    <p>7.1. In case of non-fulfillment or improper fulfillment of obligations under this Offer, the Parties shall be liable in accordance with the legislation of Ukraine.</p>
    <p>7.2. The Seller is not responsible for the content and accuracy of information provided by the Buyer when placing an order in the Internet store.</p>
    <p>7.3. The Seller is not responsible for the Buyer's use of the Goods purchased in the Internet store.</p>
    <p>7.4. The Seller or the Buyer shall be exempt from liability for complete or partial non-performance of their obligations if such non-performance is a consequence of force majeure circumstances such as: war or military actions, earthquake, flood, fire, and other natural disasters that occurred independently of the Seller's and/or Buyer's will after the conclusion of this contract. The Party unable to fulfill its obligations shall immediately notify the other Party thereof.</p>

<h2>8. Confidentiality and Personal Data Protection.</h2>
<p>8.1. By providing their personal data on the website of the Internet store during registration or when placing an Order, the Buyer voluntarily gives consent to the Seller for the processing, use (including transfer) of their personal data, as well as taking other actions provided by the Law of Ukraine "On Protection of Personal Data," without limitation of the term of such consent.</p>
<p>8.2. The Seller undertakes not to disclose the information received from the Buyer. The provision by the Seller of information to contractors and third parties acting on the basis of a contract with the Seller, including for the performance of obligations to the Buyer, and in cases where the disclosure of such information is established by the requirements of applicable Ukrainian legislation, is not considered a violation.</p>
<p>8.3. The Buyer is responsible for keeping their personal data up to date. The Seller is not responsible for improper performance or non-performance of its obligations due to the obsolescence of information about the Buyer or its mismatch with reality.</p>

<h2>9. Other Conditions</h2>
<p>9.1. This contract is concluded in Ukraine and is governed by the current legislation of Ukraine.</p>
<p>9.2. All disputes arising between the Buyer and the Seller shall be resolved through negotiations. In case of failure to settle the dispute through negotiations, the Buyer and/or the Seller have the right to apply to the courts in accordance with the current legislation of Ukraine.</p>
<p>9.3. The Seller has the right to make changes to this Agreement unilaterally as provided in clause 5.2.1. of the Agreement. In addition, changes to the Agreement may also be made by mutual agreement of the Parties in accordance with the current legislation of Ukraine.</p>
<p></p>
<h7>SELLER'S ADDRESS AND DETAILS:</h7>
<p>
Individual Entrepreneur "Honcharenko Yaroslav Oleksandrovych"<br/>
Address: 49000, Dnipro City, Korobova Street, Building 8<br/>
Tel. (+380)63 722 39 20<br/>
r/r UA953052990000026002050592268, <br/>
PJSC KB "PrivatBank", Dnipro City, <br/>
EDRPOU 3264604374 <br/>
Bank code 305299 <br/>
EDRPOU of the bank 14360570 <br/>
Payer of a single tax - 2 group,<br/>
not a VAT payer.
</p>

 </div>  </div>: <div className='agreement'  >
<h1>{t('public_offert')}</h1>
<div>
Цей договір є офіційною та публічною пропозицією Продавця укласти договір купівлі-продажу Товару, представленого на сайті hdbrand.com.ua . Даний договір є публічним, тобто відповідно до статті 633 Цивільного кодексу України, його умови є однаковими для всіх покупців незалежно від їх статусу (фізична особа, юридична особа, фізична особа-підприємець) без надання переваги одному покупцю перед іншим. Шляхом укладення цього Договору покупець в повному обсязі приймає умови та порядок оформлення замовлення, оплати товару, доставки товару, повернення товару, відповідальності за недобросовісне замовлення та усі інші умови договору. Договір вважається укладеним з моменту натискання кнопки «Підтвердити Замовлення» на сторінці оформлення замовлення в Розділі «Кошик» і отримання Покупцем від Продавця підтвердження замовлення в електронному вигляді.

    <h2>1. Визначення термінів</h2>
    <p>1.1. Публічна оферта (далі - «Оферта») - публічна пропозиція Продавця, адресована невизначеному колу осіб, укласти з Продавцем договір купівлі-продажу товару дистанційним способом (далі - «Договір») на умовах, що містяться в цій Оферті.</p>
   <p>1.2. Товар або Послуга – об'єкт угоди сторін, який був обраний покупцем на сайті Інтернет-магазину та поміщений у кошик, або вже придбаний Покупцем у Продавця дистанційним способом.</p>
   <p>1.3. Інтернет-магазин – сайт Продавця за адресою https://hdbrand.com.ua/ створений для укладення договорів роздрібної та оптової купівлі-продажу на підставі ознайомлення Покупця із запропонованим Продавцем описом Товару за допомогою мережі Інтернет.</p>
   <p>1.4. Покупець – дієздатна фізична особа, яка досягла 18 років, отримує інформацію від Продавця, розміщує замовлення щодо купівлі товару, що представлений на сайті Інтернет-магазину для цілей, що не пов'язані зі здійсненням підприємницької діяльності, або юридична особа чи фізична особа-підприємець.</p>
   <p>1.5. Продавець – ФОП «Гончаренко Ярослав Олександрович» Адреса: 49000, м. Дніпро Вулиця Коробова , буд.8 Тел.(+380)63 722 39 20 р/р UA953052990000026002050592268, АТ КБ «Приватбанк» , м. Дніпро, ЄДРПОУ 3264604374 Код банку 305299 ЄДРПОУ банку 14360570 Платник єдиного податку-2 група, не є платником ПДВ.</p>

    <h2>2. Предмет Договору</h2>
    <p>2.1. Продавець зобов’язується передати у власність Покупцю Товар, а Покупець зобов’язується оплатити і прийняти Товар на умовах цього Договору.</p>
    <p>2.2. Датою укладення Договору-оферти (акцептом оферти) та моментом повного й беззаперечного прийняттям Покупцем умов Договору вважається дата заповнення Покупцем форми замовлення, розташованої на сайті Інтернет-магазину, за умови отримання Покупцем від Продавця підтвердження замовлення в електронному вигляді. У разі необхідності, за бажанням Покупця, Договір може бути оформлений у письмовій формі.</p>
    
    <h2>3. Оформлення Замовлення</h2>
    <p>3.1. Покупець самостійно оформлює замовлення в Інтернет-магазину через форму «Кошика», або зробивши замовлення електронною поштою чи за номером телефону, вказаним в розділі контактів Інтернет-магазину.</p>
    <p>3.2. Продавець має право відмовитися від передання замовлення Покупцеві у випадку, якщо відомості, вказані Покупцем під час оформлення замовлення, є неповними або викликають підозру щодо їх дійсності.</p>
    <p>3.3. При оформленні замовлення на сайті Інтернет-магазину Покупець зобов'язується надати наступну обов’язкову  інформацію, необхідну Продавцю для виконання замовлення:
 </p>
 <p>3.3.1. прізвище, ім'я Покупця ;</p>
 <p>3.3.2. адреса, за якою слід доставити Товар (якщо доставка до адреси Покупця) ;</p>
 <p>3.3.3. контактний телефон .</p>
 <p>3.3.4. Ідентифікаційний код для юридичної особи або фізичної-особи підприємця.</p>

    <p>3.4. Найменування, кількість, артикул, ціна обраного Покупцем Товару вказуються в кошику Покупця на сайті Інтернет-магазину.</p>
    <p>3.5. Якщо будь-якої із Сторін договору необхідна додаткова інформація, він має право запросити її у іншій Стороні. У разі ненадання необхідної інформації Покупцем, Продавець не несе відповідальності за надання якісної послуги Покупцю при покупці товару в інтернет-магазині.</p>
    <p>3.6. При оформленні замовлення через оператора Продавця (п. 3.1. Цієї Оферти) Покупець зобов'язується надати інформацію, зазначену в п. 3.3 – 3.4. цієї Оферти.</p>
    <p>3.7. Ухвалення Покупцем умов цієї Оферти здійснюється за допомогою внесення Покупцем відповідних даних в реєстраційну форму на сайті Інтернет-магазину або при оформленні Замовлення через оператора. Після оформлення Замовлення через Оператора дані про Покупця вносяться до бази даних Продавця.</p>
    <p>3.8. Покупець несе відповідальність за достовірність наданої інформації при оформленні Замовлення.</p>
    <p>3.9. Укладаючи Договір, тобто акцептуючи умови даної  пропозиції (запропоновані умови придбання Товару), шляхом оформлення Замовлення, Покупець підтверджує наступне:</p>

    <p>a -  Покупець цілком і повністю ознайомлений, і згоден з умовами цієї пропозиції (оферти); </p>
    <p>б - він дає дозвіл на збір, обробку та передачу персональних даних, дозвіл на обробку персональних даних діє протягом усього терміну дії Договору, а також протягом необмеженого терміну після закінчення його дії. Крім цього, укладенням договору Покупець підтверджує, що він повідомлений (без додаткового повідомлення) про права, встановлених Законом України "Про захист персональних даних", про цілі збору даних, а також про те, що його персональні дані передаються Продавцю з метою можливості виконання умов цього Договору, можливості проведення взаєморозрахунків, а також для отримання рахунків, актів та інших документів. Покупець також погоджується з тим, що Продавець має право надавати доступ та передавати його персональні дані третім особам без будь-яких додаткових повідомлень Покупця з метою виконання замовлення Покупця. Обсяг прав Покупця, як суб'єкта персональних даних відповідно до Закону України "Про захист персональних даних" йому відомий і зрозумілий.
 </p>
    <h2>4. Ціна і Доставка Товару </h2>
    <p>4.1. Ціни на Товари та послуги визначаються Продавцем самостійно та вказані на сайті Інтернет-магазину. Всі ціни на Товари та послуги вказані на сайті у гривнях з урахуванням ПДВ.</p>
    <p>4.2. Ціни на Товари та послуги можуть змінюватися Продавцем в односторонньому порядку залежно від кон'юнктури ринку. При цьому ціна окремої одиниці Товару, вартість якої оплачена Покупцем в повному обсязі, не може бути змінена Продавцем в односторонньому порядку.</p>
   <p>4.3. Вартість Товару, яка вказана на сайті Інтернет-магазину не включає в себе вартість доставки Товару Покупцю. Вартість доставки Товару Покупець сплачує   відповідно до діючих тарифів служб доставки (перевізників) безпосередньо обраній ним службі доставки (перевізнику).</p>
   <p>4.4. Вартість Товару яка вказана на сайті Інтернет-магазину не включає в себе вартість доставки Товару на адресу Покупця.</p>
    <p>4.5. Продавець може вказати орієнтовну вартість доставки Товару на адресу Покупця під час звернення Покупця із відповідним запитом до Продавця шляхом надіслання листа на електронну пошту або при оформленні замовлення через оператора інтернет-магазину.</p>
    <p>4.6. Зобов'язання Покупця по оплаті Товару вважаються виконаними з моменту надходження Продавцю коштів на його рахунок.</p>
    <p>4.7. Розрахунки між Продавцем і Покупцем за Товар здійснюються способами, зазначеними на сайті Інтернет-магазину в розділі «Оплата і Доставка».
</p>
    <p>4.8. При отриманні товару Покупець повинен у присутності представника служби доставки (перевізника)  перевірити відповідність Товару якісним і кількісним характеристикам (найменування товару, кількість, комплектність, термін придатності).</p>
    <p>4.9. Покупець або його представник під час приймання Товару підтверджує своїм підписом в товарному чеку/ або в замовленні/ або в транспортній накладній на доставку товарів, що не має претензій до кількості товару, зовнішнім виглядом і комплектності товару.</p>
    <p>4.10. Право власності та ризик випадкової втрати або пошкодження Товару переходить до Покупця або його Представника з моменту отримання Товару Покупцем в місті поставки Товару при самостійній доставки Товару від Продавця, чи під час передачі Продавцем товару службі доставки (перевізнику) обраної Покупцем. </p>

    <h2>5. Права ті обов’язки Сторін</h2>
    <p>5.1. Продавець зобов’язаний:</p>
    <p>5.1.1 Передати Покупцеві товар у відповідності до умов цього Договору та замовлення Покупця.</p>
    
    <p>5.1.2. Не розголошувати будь-яку приватну інформацію про Покупця і не надавати доступ до цієї інформації третім особам, за винятком випадків, передбачених законодавством та під час виконання Замовлення Покупця.</p>
    <p>5.2. Продавець має право:</p>
    <p>5.2.1 Змінювати умови цього Договору, а також ціни на Товари та послуги, в односторонньому порядку, розміщуючи їх на сайті Інтернет-магазину. Всі зміни набувають чинності з моменту їх публікації.</p>
    <p>5.3 Покупець зобов'язується:</p>
    <p>5.3.1 До моменту укладення Договору ознайомитися зі змістом Договору, умовами Договору і цінами, запропонованими Продавцем на сайті Інтернет-магазину.
</p>
<p>5.3.2 На виконання Продавцем своїх зобов'язань перед Покупцем останній повинен повідомити всі необхідні дані, що однозначно ідентифікують його як Покупця, і достатні для доставки Покупцеві замовленого Товару.
</p>
<h2>6. Повернення Товару</h2>
<p>6.1. Покупець має право на повернення Продавцеві непродовольчого товару належної якості, якщо товар не задовольнив його за формою, габаритами, фасоном, кольором, розміром або з інших причин не може бути ним використаний за призначенням. Покупець має право на повернення товару належної якості протягом 14 (чотирнадцяти) днів, не враховуючи дня купівлі. Повернення товару належної якості проводиться, якщо він не використовувався і якщо збережено його товарний вигляд, споживчі властивості, упаковка, пломби, ярлики, а також розрахунковий документ, виданий Покупцю за оплату Товару. Перелік товарів, що не підлягають поверненню на підставах, передбачених у цьому пункті, затверджується Кабінетом Міністрів України.
</p>
<p>6.2. Повернення Покупцеві вартості товару належної якості здійснюється протягом 30 (тридцяти) календарних днів з моменту отримання такого Товару Продавцем за умови дотримання вимог, передбачених п. 6.1. Договору, чинним законодавством України.</p>
<p>6.3. Вартість товару підлягає поверненню шляхом банківського переказу на рахунок Покупця.
</p>
<p>6.4. Повернення Товару належної якості за адресою Продавця, здійснюється за рахунок Покупця та Продавцем Покупцеві не відшкодовується.
</p>
<p>6.5. У разі виявлення протягом встановленого гарантійного строку недоліків у Товарі, Покупець особисто, в порядку та у строки, що встановлені законодавством України, має право пред'явити Продавцеві вимоги, передбачені Законом України «Про захист прав споживачів». При пред’явленні вимог про безоплатне усунення недоліків, строк на їх усунення відраховується з дати отримання Товару Продавцем в своє розпорядження та фізичного доступу до такого Товару.
</p>
<p>6.6. Розгляд вимог, передбачених Законом України «Про захист прав споживачів», провадиться Продавцем за умови надання Покупцем документів, передбачених чинним законодавством України. Продавець не відповідає за недоліки Товару, які виникли після його передання Покупцеві внаслідок порушення Покупцем правил користування або зберігання Товару, дій третіх осіб або непереборної сили.</p>
<p>6.7. Покупець не має права відмовитися від товару належної якості, що має індивідуально-визначені властивості, якщо зазначений товар може бути використаний виключно Покупцем, який його придбав, (в т.ч. за за бажанням Покупця не стандартні розміри, характеристики, зовнішній вигляд, комплектація та інше). Підтвердженням того, що товар має індивідуально-визначені властивості, є відмінність розмірів товару та інших характеристик, що вказані в інтернет-магазині.</p>
<p>6.8. Повернення товару, у випадках, передбачених законом та цим Договором, здійснюється за адресою, вказаною на сайті в розділі «Контакти».</p>
<h2>7. Відповідальність</h2>
<p>7.1. Продавець не несе відповідальності за шкоду, заподіяну Покупцеві або третім особам внаслідок неналежного монтажу, використання, зберігання Товару придбаного у Продавця.</p>
<p>7.2. Продавець не несе відповідальності за неналежне, несвоєчасне виконання Замовлень і своїх зобов’язань у випадку надання Покупцем недостовірної або помилкової інформації.</p>
<p>7.3. Продавець і Покупець несуть відповідальність за виконання своїх зобов'язань відповідно до чинного законодавства України і положень цього Договору.</p>
<p>7.4. Продавець або Покупець звільняються від відповідальності за повне або часткове невиконання своїх зобов'язань, якщо невиконання є наслідком форс-мажорних обставин як: війна або військові дії, землетрус, повінь, пожежа та інші стихійні лиха, що виникли незалежно від волі Продавця і / або Покупця після укладення цього договору. Сторона, яка не може виконати свої зобов'язання, негайно повідомляє про це іншу Сторону.</p>

<h2>8. Конфіденційність і захист персональних даних.</h2>
<p>8.1. Надаючи свої персональні дані на сайті Інтернет-магазину при реєстрації або оформленні Замовлення, Покупець надає Продавцеві свою добровільну згоду на обробку, використання (у тому числі і передачу) своїх персональних даних, а також вчинення інших дій, передбачених Законом України «Про захист персональних даних», без обмеження терміну дії такої згоди.</p>
<p>8.2. Продавець зобов'язується не розголошувати отриману від Покупця інформацію. Не вважається порушенням надання Продавцем інформації контрагентам і третім особам, що діють на підставі договору з Продавцем, в тому числі і для виконання зобов'язань перед Покупцем, а також у випадках, коли розкриття такої інформації встановлено вимогами чинного законодавства України.</p>
<p>8.3. Покупець несе відповідальність за підтримання своїх персональних даних в актуальному стані. Продавець не несе відповідальності за неякісне виконання або невиконання своїх зобов'язань у зв'язку з неактуальністю інформації про Покупця або невідповідністю її дійсності.</p>

<h2>9. Інші умови</h2>
<p>9.1. Цей договір укладено на території України і діє відповідно до чинного законодавства України.</p>
<p>9.2. Усі спори, що виникають між Покупцем і Продавцем, вирішуються шляхом переговорів. У випадку недосягнення врегулювання спірного питання шляхом переговорів, Покупець та/або Продавець мають право звернутися за вирішенням спору до судових органів відповідно до чинного законодавства України.</p>
<p>9.3. Продавець має право вносити зміни до цього Договору в односторонньому порядку, передбаченому п. 5.2.1. Договору. Крім того, зміни до Договору також можуть бути внесені за взаємною згодою Сторін в порядку, передбаченому чинним законодавством України.</p>
<p></p>
<h7>АДРЕСА ТА РЕКВІЗИТИ ПРОДАВЦЯ: </h7>
<p>
ФОП «Гончаренко Ярослав Олександрович»<br/>
Адреса: 49000, м. Дніпро <br/>
Вулиця Коробова , буд.8 <br/>
Тел.(+380)63 722 39 20 <br/>
р/р UA953052990000026002050592268, <br/>
АТ КБ  «Приватбанк» , м. Дніпро, <br/>
ЄДРПОУ 3264604374 <br/>
Код банку 305299 <br/>
ЄДРПОУ банку 14360570 <br/>
Платник єдиного податку-2 група,<br/>
не є платником ПДВ.

</p>
</div>
</div>}


<Footer />
    </div>
  );
};

export default PublicOfert;

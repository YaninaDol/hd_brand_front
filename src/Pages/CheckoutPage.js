import { useEffect,useState } from "react";
import React from 'react';
import PxMainPage from './PxMainPage';
import Footer from '../Components/Footer';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Link} from "react-router-dom";
import {Button,Form,Modal,Tabs,Tab} from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './CheckoutPage.css';
import AuthModal from "../Components/AuthModal";
import LiqPaY from 'liqpayservice';

import {
 
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBRange 
} from 'mdb-react-ui-kit';
import CardBox from "../Components/CardBox";
import { version } from "process";
const CheckoutPage = () => {
  const {t,i18n } = useTranslation();
  const [titleaccount, setTitleAccount] = useState('');
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [arrbuket, setBuket] = useState([]);
  const [phoneNumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [discount, setDiscount] = useState(null);
  const [userdiscount, setUserDiscount] = useState(null);
  const [cityDescriptions, setCityDescriptions] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [shipment, setShipment] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCity2, setSelectedCity2] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedDepartament, setSelectedDepartament] = useState(null);
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [indexW, setIndexW] = useState("");
  const [indexU, setIndexU] = useState("");
  const [checkoutbtn, setCheckoutbtn] = useState(false);
  const [count, setCount] = useState(0);
  const [warehouseDescriptions, setwarehouseDescriptions] = useState([]);

  const [typeDelivery, setTypeDelivery] = useState('1');
  const [typeDeliveryW, setTypeDeliveryW] = useState('address');
  const [NovaWorldWare, setNovaWorldWare] = useState(null);
  const [activeTab, setActiveTab] = useState('longer-tab'); 
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("liqpay");
  const [total,setTotal] = useState(250);
  const [countryinExcel,setCountryExcel] = useState('novapost');
  const [selectedCurrency, setSelectedCurrency] = useState('UAH');
  const [errors, setErrors] = useState({});
  const [TotalSum,setTotalSum] = useState(0);
  const [proceed, setProceed] = useState(false);

  const NOVAPOST_API_KEY=process.env.REACT_APP_NOVAPOST_API_KEY;
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const validateForm = () => {
    const isEnglish = /^[a-zA-Z\s]*$/.test(name,surname);
   
    const errors = {};
    
  
    if (activeTab === "longer-tab") {
      if(!selectedCity)
      {
        errors.selectedCity = 'Оберіть місто';
      }
        if (typeDelivery === '1' && !selectedDepartament) {
          errors.selectedDepartament = 'Оберіть відділення';
      } else if (typeDelivery === '2' && !address) {
          errors.address = 'Введіть адресу';
      } else if (typeDelivery === '3' && !indexU) {
          errors.indexU = 'Введіть індекс відділення';
      }else if (typeDelivery === '4' && !address2) {
        errors.indexU = 'Введіть адресу ';
    }
  }
  
  if (countryinExcel === 'novapost' && activeTab === "longer-tab2") {
    if (typeDeliveryW === 'warehouse' && !selectedCity2) {
        errors.selectedCity2 = 'Оберіть місто';
    } else if (typeDeliveryW === 'warehouse' && !NovaWorldWare) {
      errors.indexW = 'Вкажіть відділення';
  } else if (typeDeliveryW === 'address' && !address2) {
        errors.address2 = 'Введіть адресу';
    } else if (typeDeliveryW === 'address' && !indexW) {
        errors.indexW = 'Вкажіть індекс';
    }
    if (!/^[a-zA-Z\s]*$/.test(name)) {
      errors.name = 'Ім\'я повинно містити лише англійські букви'};
    if (!/^[a-zA-Z\s]*$/.test(surname)) {
      errors.surname = 'Прізвище повинно містити лише англійські букви';
    }
} else if (countryinExcel === 'worldwide' && activeTab === "longer-tab2") {

    if (!selectedCountry ||  !address2 || !indexW) {
        errors.internationalDelivery = 'Заповніть всі поля для міжнародної доставки';
    }
    if (!/^[a-zA-Z\s]*$/.test(name)) {
      errors.name = 'Ім\'я повинно містити лише англійські букви'};
    if (!/^[a-zA-Z\s]*$/.test(surname)) {
      errors.surname = 'Прізвище повинно містити лише англійські букви';
    }
}

 
    if (!name.trim()) {
      errors.name = 'Заповніть ім\'я';
    }

    if (!surname.trim()) {
      errors.surname = 'Заповніть прізвище';
    }

    if (!phoneNumber || !phoneNumber.trim()) {
      errors.phoneNumber = 'Заповніть номер телефону';
    }

    if (!email.trim()) {
      errors.email = 'Заповніть E-mail';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Введіть коректний E-mail';
    }
    if(arrbuket.length<1)
    {
      errors.buket='Оберіть товар для замовлення';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0; 
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
  


  function updateDate()
  {
    selectedPaymentMethod=='cardpay'?
    setPaymentData({
      ...paymentData,
      amount:convertPrice(250,selectedCurrency),
      currency: selectedCurrency
      
  }):
     activeTab!='longer-tab' ?
        
        setPaymentData({
          ...paymentData,
          amount:convertPrice(total -total*(discount/100)+shipment,selectedCurrency),
          currency: selectedCurrency
          
      }): setPaymentData({
        ...paymentData,
        amount:convertPrice(total -total*(discount/100),selectedCurrency),
        currency: selectedCurrency
        
    });
  }
 

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
  const handleCheckboxChange = (method) => {
    setSelectedPaymentMethod(method);
    
   
    if(method === 'cardpay')
      {
        setProceed(false);
      }
  };


  const apiUrl = 'https://api.novaposhta.ua/v2.0/json/';
const [paymentData, setPaymentData] = useState({
    version: 3,
      action: 'pay',
      amount: total,
      currency: selectedCurrency,
      description: 'Плата за товар',
      language: 'UK',
      order_id:'',
      result_url:'https://hdbrand.com.ua/status'
});
  useEffect(() => {
  
    const storedBasket = window.sessionStorage.getItem("Basket");
     updateDate();
    if (!storedBasket || storedBasket.length < 1) {
     
      window.location.href = '/';
    } else {
     
      const parsedBasketData = JSON.parse(storedBasket);
      setBuket(parsedBasketData);
      const totalCost = parsedBasketData.reduce((sum, item) => sum + item.quantity * item.price, 0);
      setTotal(totalCost);
      const totalCount = parsedBasketData.reduce((sum, item) => sum + item.quantity, 0);
      setCount(totalCount);
      setTotalSum(convertPrice(total -total*(discount/100),selectedCurrency));
    }
    

    if(!window.sessionStorage.getItem("AccessToken"))
   { setTitleAccount(t('account'));
    count>=2?setDiscount(5):setDiscount(null);
   }
  else{
    setTitleAccount('');
    
    axios({method:'get',
    url:`${API_BASE_URL}/api/Authenticate/getUserbyId`,
  headers: {         'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                }})
     .then(response => {
      if (response.data.name ) {
        setName(response.data.name);
    }
    
    if (response.data.surname ) {
        setSurname(response.data.surname);
    }
    
    if (response.data.email ) {
        setEmail(response.data.email);
    }
    
    if (response.data.phonenumber ) {
        setPhonenumber(response.data.phonenumber);
        console.log(response.data.phonenumber)
    }
    
    if (response.data.discount ) {
        setUserDiscount(response.data.discount);
    }
    
      count>=2?setDiscount(5):setDiscount(response.data.discount);
   
    
  })
  .catch(error => console.error('Error fetching products:', error));

   
  }
 

  const requestData = {
    apiKey: NOVAPOST_API_KEY,
    modelName: 'Address',
    calledMethod: 'getCities',
    methodProperties: {}
  };
  
 
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const formattedCityDescriptions = data.data.map(city => ({
        label: city.Description,
        value: city.Description,
      }));
  
      setCityDescriptions(formattedCityDescriptions);
   
  
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

   
async function fetchCountries() {
  // try {
  //   const response = await axios.get('https://restcountries.com/v2/all');
  //   return response.data.map(country => ({
  //     label:country.name,
  //     name: country.name,
  //     value: country.name,
  //     alpha3Code: country.alpha3Code,
  //   }));
  // } catch (error) {
  //   console.error('Error fetching countries:', error.message);
  //   return [];
  // }
  try {
    const response = await axios.get('https://rest-countries10.p.rapidapi.com/countries', {
      headers: {
        'X-RapidAPI-Key': '7cbadc8e22mshe3912405bc0a0acp1979e8jsn213aacb6928a',
        'X-RapidAPI-Host': 'rest-countries10.p.rapidapi.com'
      }
    });
    return response.data.map(country => ({
      label: country.name.shortnamelowercase,
      name: country.name.shortnamelowercase,
      value: country.name.shortnamelowercase,
      alpha3Code: country.code.alpha3Code,
    }));
  } catch (error) {
    console.error('Error fetching countries:', error.message);
    return [];
  }
}

async function fetchData() {
  const countries = await fetchCountries();
  setCountries(countries);
}

fetchData();
fetchExchangeRates();

const savedCurrency =  window.sessionStorage.getItem('selectedCurrency');
if(activeTab=='longer-tab2')
{setSelectedPaymentMethod('liqpay')}

if (savedCurrency) {
setSelectedCurrency(savedCurrency);
}
const shippingCost = calculateShippingCostAddress();
setShipment(typeDeliveryW === 'warehouse' ? shippingCost - 100 : shippingCost);


  }, [selectedCountry,count,discount,typeDeliveryW,TotalSum,countryinExcel,selectedDepartament,address,phoneNumber,email,selectedCity2,address2,indexW,NovaWorldWare,indexU,activeTab]);


  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;
  const privateKey = process.env.REACT_APP_PRIVATE_KEY;

  var instanse_liq = new LiqPaY(publicKey, privateKey);


  function removeBasket(id) {
    let prod = arrbuket.find(item => item.id === id);
    if (prod) {
      const updatedBasket = arrbuket.filter(item => item.id !== id);
      setBuket(updatedBasket);
      const totalCost = updatedBasket.reduce((sum, item) => sum + item.quantity * item.price, 0);
      setTotal(totalCost);
      const totalCount = updatedBasket.reduce((sum, item) => sum + item.quantity, 0);
      setCount(totalCount);
      if (totalCount >= 2) {
        setDiscount(5);
      } else {
        setDiscount(userdiscount);
      }
      if(totalCount<1)
      {
        setCheckoutbtn(true);
      }
      window.sessionStorage.setItem("Basket", JSON.stringify(updatedBasket));
      setShipment(calculateShippingCostAddress());
    }
  }
  
  
  const decrementQuantity = (id) => {
    let prod = arrbuket.find(item => item.id === id);
    if (prod && prod.quantity > 1) {
      const updatedBasket = arrbuket.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
  
      const filteredBasket = updatedBasket.filter(item => item.quantity > 0);
  
      setBuket(filteredBasket);
      const totalCost = filteredBasket.reduce((sum, item) => sum + item.quantity * item.price, 0);
      setTotal(totalCost);
      const totalCount = filteredBasket.reduce((sum, item) => sum + item.quantity, 0);
      setCount(totalCount);
  
      if (totalCount >= 2) {
        setDiscount(5);
      } else {
        setDiscount(userdiscount);
      }
    
      window.sessionStorage.setItem("Basket", JSON.stringify(filteredBasket));
    }
  };
  
  const incrementQuantity = (id) => {
    let prod = arrbuket.find(item => item.id === id);
    if (prod) {
      const updatedBasket = arrbuket.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
  
      setBuket(updatedBasket);
      const totalCost = updatedBasket.reduce((sum, item) => sum + item.quantity * item.price, 0);
      setTotal(totalCost);
      const totalCount = updatedBasket.reduce((sum, item) => sum + item.quantity, 0);
      setCount(totalCount);
  
      if (totalCount >= 2) {
        setDiscount(5);
      } else {
        setDiscount(userdiscount);
      }
    
      window.sessionStorage.setItem("Basket", JSON.stringify(updatedBasket));
    }
  };


  const handleChangeCountry = async (e) => {
    setSelectedCountry(e.value);
    if(e.value.includes('Moldova'))
    {
      await fetchCitiesByCountry('Moldova');
    }
   else await fetchCitiesByCountry(e.value);



  };
  const calculateShippingCostAddress = () => {
    
    switch (selectedCountry) {
      case 'Poland':
      case 'Moldova (the Republic of)':
        setCountryExcel('novapost');
        
        if (count === 1) {
          return 600 ;
        } else if (count === 2) {
          return 630 ;
        } else {
          return 870 ;
        }
      case 'Romania':
      case 'Czech Republic':
      case 'Germany':
      case 'Slovakia':
      case 'Estonia':
      case 'Latvia':
      case 'Lithuania':
      case 'Hungary':
        setCountryExcel('novapost');
       
        if (count === 1) {
          return 900 ;
        } else if (count === 2) {
          return 930 ;
        } else {
          return 1970 ;
        }
      case 'Italy':
        setCountryExcel('novapost');
      
        if (count === 1) {
          return 1300 ;
        } else if (count === 2) {
          return 1330 ;
        } else {
          return 2670 ;
        }
      default:
        setCountryExcel('worldwide');
     
        if (count === 1) {
          return 800;
        } else if (count === 2) {
          return 1200;
        } else {
          return 1600;
        }
    }
  };
  const fetchCitiesByCountry = async (selectedCountry) => {
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country: selectedCountry,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      const cities = data.data.map((city) => ({
        label: city,
        value: city,
      }));
  
      setCities(cities);
    } catch (error) {
      console.error('Error fetching cities:', error.message);
      setCities([]); 
    }
  };
   
  
  
  const handleChange = (e) => {
    setSelectedCity(e.value);
    
    if(typeDelivery==='1')
    {
    
            const getWarehousesRequest = {
              apiKey: NOVAPOST_API_KEY,
              modelName: 'Address',
              calledMethod: 'getWarehouses',
              methodProperties: {
                CityName: e.value
            
              }
            };
          
            fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(getWarehousesRequest)
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then(data => {
                
              
                const formattedDepDescriptions = data.data.map(warehouse => ({
                  label: warehouse.Description,
                  value: warehouse.Description,
                }));
                setwarehouseDescriptions(formattedDepDescriptions);
              
              })
              .catch(error => {
                console.error('Error fetching warehouse data:', error);
              });
            }

    else if(typeDelivery==='3')
    {
      // axios.get(`https://www.ukrposhta.ua/address-classifier/get_city_by_region_id_and_district_id_and_city_ua?city_ua=${e.value}`, {
      //   headers: { 
      //     'Authorization': 'Bearer eCom f9027fbb-cf33-3e11-84bb-5484491e2c94', 
      //     'Cookie': '__cf_bm=4lAVsmU8L1X.jYyaqT7HAPmQwKceefTA8CtGgiMhlIM-1709807613-1.0.1.1-tfRwtnsR16EHrimolr5XssJRxHBGQ5r5UrTJ6ahsXoJQKb29NLvSG56sN3LPTi2L772kpqJtXbJ3mlsKTVenog; _cfuvid=aPOm7oxAXvmEvrYmARi1ZSdeC13ziaaJJgsJcBG4kLU-1709805722449-0.0.1.1-604800000; TS01313a4c=013ec6202efb094cb01fe68c03f8141b3c4203c0735e32de0610d527f432a66dec7250133bda91bfb5ca1f98212511815ba7d3ff09'
      //   }
      // })
      //   .then((response) => {
      //     console.log(JSON.stringify(response.data));
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      

    }
  };

   
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

  
  
 
 function saveChanges()
 {
  const isValid = validateForm();
  if (isValid) {
    const sum = selectedPaymentMethod === 'cardpay' 
    ? convertPrice(250, selectedCurrency) 
    : activeTab !== 'longer-tab' 
      ? convertPrice(total - total * (discount / 100) + shipment, selectedCurrency)
      : convertPrice(total - total * (discount / 100), selectedCurrency);
    
      if(activeTab=='longer-tab')
      {
       
        if(typeDelivery==='1')
        {
        
         
          confirmOrder("НП-відділення","Україна, "+selectedCity+" "+selectedDepartament,sum)
        }
        else if(typeDelivery==='2')
        {
        
          confirmOrder("НП-адреса","Україна, "+selectedCity+" "+address,sum)
        }
        else if(typeDelivery==='3')
        {
          
          confirmOrder("Укрпошта-відділення","Україна, "+selectedCity+" "+indexU,sum);
        }
        else if(typeDelivery==='4')
        {
         
          confirmOrder("Укрпошта-адреса","Україна, "+selectedCity+" "+address2,sum);
        }
      }
      else if(activeTab=='longer-tab2')
      {
      if(  countryinExcel === 'worldwide')
        {
          confirmOrder("Міжнародна пошта",selectedCountry+" "+address2+" "+indexW,sum);
        }
        else
       { if(typeDeliveryW=="warehouse")
       { 
        confirmOrder('НоваПошта-відділення',selectedCountry+" "+selectedCity2+" "+NovaWorldWare,sum);
       }
       else if(typeDeliveryW=="address")
        {
          confirmOrder("НоваПошта-адресна",selectedCountry+" "+address2+" "+indexW,sum);
        }
      }
      }
  
     
  
  }



 }
 function confirmOrder(delivery,fulladdress,toplam)
 {
  const jsonString = JSON.stringify(arrbuket);
  if(!window.sessionStorage.getItem("AccessToken"))
    { 
      axios({method:'post',
      url:`${API_BASE_URL}/api/Authenticate/ConfirmOrder?Name=${name}&Surname=${surname}&Phone=${phoneNumber}&email=${email}&products=${jsonString}&delivery=${delivery}&address=${fulladdress}&total=${toplam +selectedCurrency}&payment=liqpay&discount=${discount} `
   })
       .then(response => {
     
       window.sessionStorage.setItem("order",response.data.id);
        updateDate();
          setProceed(true);
       
  
  })
  .catch(error => console.log(''));
  
    }
   else{
   
    axios({method:'post',
    url:`${API_BASE_URL}/api/Authenticate/ConfirmOrder1?Name=${name}&Surname=${surname}&Phone=${phoneNumber}&email=${email}&products=${jsonString}&delivery=${delivery}&address=${fulladdress}&total=${toplam +selectedCurrency}&payment=${selectedPaymentMethod}&discount=${discount}  `,
  headers: {         'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                }})
     .then(response => {
     
    
     window.sessionStorage.setItem("order",response.data.id);
     updateDate();
       setProceed(true);
})
.catch(error => console.log(''));


   }
 }
  return (
    <div >
      <AuthModal show={show2} handleClose={handleClose2}></AuthModal>
         
      <div style={{ position: 'fixed', width: '100%', zIndex: '1000', top: '0' }}>
  <PxMainPage convertPrice={convertPrice} selectedCurrency={selectedCurrency} handleCurrencyChange={handleCurrencyChange} />
</div>
    <div className="stock-status"style={{marginTop:'150px'}}>
      <Link to="/"><div className="div33">{t('home')} </div></Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
<Link to={`/checkout`}><div className="div34">{t('checkout2')}</div></Link>
</div>

<MDBContainer className="py-5 h-100" >
<MDBRow> <h2 className="h25title">{t('checkout2')}</h2></MDBRow>
  <MDBRow>
 
  <MDBCol md='7'  className="order-md-1 order-2">
              <MDBRow>
              <MDBCol className="col-12 col-md-8">
                <div className="h211"> {t('your_inform')}</div>  </MDBCol>
              <MDBCol className="col-12 col-md-4 ">
              
              
              <div onClick={handleShow2} className="di153">{titleaccount}</div> </MDBCol>
              </MDBRow>
              
              
              <MDBRow className="mt-3 mt-md-3">
              <MDBCol  className="col-12 col-md-6">
                
                <Form.Control
           
                      type="text"
                      value={name}
                      id="entername"
                      placeholder={t('your_name')}
                      onChange={(e)=>setName(e.target.value)}
                    /> {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}</MDBCol>
                     
              <MDBCol className="col-12 col-md-6 py-2 py-md-0">
                
                
                <Form.Control
               value={surname}
                      type="text"
                      id="entersurname"
                      placeholder={t('your_surname')}
                      onChange={(e)=>setSurname(e.target.value)}
                    />   {errors.surname && <div style={{ color: 'red' }}>{errors.surname}</div>}</MDBCol>
              </MDBRow>



              <MDBRow className="mt-1 mt-md-3">
              <MDBCol  className="col-12 col-md-6">
                <div className="MDBCol-border"> 
                <PhoneInput 
      placeholder={t('phonennumner')}
      id="enterphone"
      value={phoneNumber || ''}
      onChange={setPhonenumber}/>
                </div>
                     {errors.phoneNumber && <div style={{ color: 'red' }}>{errors.phoneNumber}</div>}</MDBCol>
              <MDBCol className="col-12 col-md-6 py-2 py-md-0">
                
                
                
                <Form.Control
           value={email}
                      type="email"
                      id="enteremail"
                      placeholder="E-mail *"
                      onChange={(e)=>setEmail(e.target.value)}
                    />  {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}</MDBCol>
              </MDBRow>
              <MDBRow style={{ marginTop: '20px' }}>
          <MDBCol>
          
          
       
           
          </MDBCol>
        </MDBRow>
              <MDBRow style={{marginTop:'60px'}}>
              <MDBCol><div className="h211"> {t("select_delivery")} </div>  </MDBCol>

              </MDBRow>
              <MDBRow>
              <Tabs
      
      defaultActiveKey={activeTab}
      id="delivery-tabs"
      onSelect={(key) => {
        setActiveTab(key);
        setProceed(false);
      }}
      className="mb-3"
      justify
    >
    
      <Tab eventKey="longer-tab" title={t('ukraine_delivery')}>
       <MDBRow className="mt-1 mt-md-3">
        <MDBCol  className="col-12 col-md-6">
          
            <Form.Select  size="lg" onChange={(e)=> setTypeDelivery(e.target.value) } >
        <option style={{maxWidth:'100%'}}  value={1}>{t('np-1')} </option>
        <option style={{maxWidth:'100%'}}  value={2}>{t('np-2')} </option>
        <option style={{maxWidth:'100%'}}  value={3}>{t('up-1')} </option>
        <option style={{maxWidth:'100%'}}  value={4}>{t('up-2')} </option>
      </Form.Select></MDBCol>


        <MDBCol  className="col-12 col-md-6 py-3 py-md-0">
          
          <Select
           className="custom-select-lg"
    
     onChange={handleChange}
      options={cityDescriptions}
      isSearchable
      placeholder={t('select_city')}
      styles={{
        control: (provided) => ({
          ...provided,
         borderRadius: '0%',
          height: '40px', 
        }),
      }}
    />  {errors.selectedCity    && <div style={{ color: 'red' }}>{errors.selectedCity   }</div>} </MDBCol>
       </MDBRow>

       <MDBRow className="mt-1 mt-md-3">
        <MDBCol  className="col-12 col-md-6 py-0 py-md-0">

        {typeDelivery === '1' && (
        <Select
          className="custom-select-lg"
          onChange={(e)=> setSelectedDepartament(e.value)}
          options={warehouseDescriptions}
          isSearchable
          placeholder={t('select_warehouse')}
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: '0%',
              height: '40px',
            }),
          }}
        />
      )}

{typeDelivery === '2' && (
       <Form.Control
          size="lg"
       type="text"
       id="enteraddress"
       placeholder={t('enter_address')}
       onChange={(e)=>setAddress(e.target.value)}
     />
      )}

  {typeDelivery === '3' && (
        // <Select
        //   className="custom-select-lg"
        //   onChange={(e)=> setSelectedDepartament(e.value)}
        //   options={warehouseDescriptions}
        //   isSearchable
        //   placeholder="Оберіть відділення"
        //   styles={{
        //     control: (provided) => ({
        //       ...provided,
        //       borderRadius: '0%',
        //       height: '40px',
        //     }),
        //   }}
        // />
        <Form.Control
          size="lg"
       type="text"
       id="enteraddress"
       placeholder={t('enter_index')}
       onChange={(e)=>setIndexU(e.target.value)}
      
     />
      )}
      {typeDelivery === '4' && (
       <Form.Control
       size="lg"
    type="text"
    id="enteraddress"
    placeholder={t('select_country')}
    onChange={(e)=>setAddress2(e.target.value)}
  />
      )}
 {errors.selectedDepartament && <div style={{ color: 'red' }}>{errors.selectedDepartament}</div>}
 {errors.address  && <div style={{ color: 'red' }}>{errors.address }</div>}
        </MDBCol>
        <MDBCol>
          
          </MDBCol>
      
       </MDBRow>
      </Tab>
      <Tab eventKey="longer-tab2" title={t('worldwide')}>
      <MDBRow className="mt-1 mt-md-3">
        <MDBCol  className="col-12 col-md-6 ">
              
            <Select
          className="custom-select-lg"
          onChange={handleChangeCountry}
          options={countries}
          isSearchable
          placeholder={t('select_country')}
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: '0%',
              height: '40px',
            }),
          }}
        />
         {errors.selectedCountry   && <div style={{ color: 'red' }}>{errors.selectedCountry  }</div>}
            </MDBCol>
           
            <MDBCol>
            {countryinExcel === 'novapost' && ( <Form.Select  onChange={(e)=> setTypeDeliveryW(e.target.value) } size="lg" >
            <option style={{maxWidth:'100%'}}  value={'address'}>{t('np-1')} </option>
        <option style={{maxWidth:'100%'}} value={'warehouse'}>{t('np-2')} </option>
      
      </Form.Select>)}
      {countryinExcel === 'worldwide' && ( <Form.Select  onChange={(e)=> setTypeDeliveryW(e.target.value) }  size="lg" >
        <option style={{maxWidth:'100%'}}  value={'address'}> {t('worldwide')} </option>
      </Form.Select>)}
            </MDBCol>
      
           
       </MDBRow>
       <MDBRow className="mt-2 mt-md-3">
        <MDBCol  className="col-12 col-md-6">

        {typeDeliveryW === 'warehouse' && (  <Select
          className="custom-select-lg"
          onChange={(e)=> setSelectedCity2(e.value)}
          options={cities}
          isSearchable
          placeholder={t('np-1')}
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: '0%',
              height: '40px',
            }),
          }}
        />)}
         {errors.selectedCity2    && <div style={{ color: 'red' }}>{errors.selectedCity2   }</div>}
  {typeDeliveryW === 'address' && (<Form.Control
          size="lg"
       type="text"
       id="enteraddress"
       placeholder={t('enter_address')}
       onChange={(e)=>setAddress2(e.target.value)}
     />)}
      {errors.address2     && <div style={{ color: 'red' }}>{errors.address2    }</div>}
  </MDBCol>
  
  <MDBCol  className="col-12 col-md-6 py-2 py-md-0">
  {typeDeliveryW === 'address' && (<Form.Control
          size="lg"
       type="text"
       id="enteraddress"
       placeholder={t('enter_index')}
       onChange={(e)=>setIndexW(e.target.value)}
      
     />)} 
      {typeDeliveryW === 'warehouse' && (<Form.Control
      
          size="lg"
       type="text"
       id="enteraddress"
       placeholder={t('enter_warehouse')}
       onChange={(e)=>setNovaWorldWare(e.target.value)}
      
     />)}
      {errors.indexW      && <div style={{ color: 'red' }}>{errors.indexW     }</div>}
      {errors.internationalDelivery      && <div style={{ color: 'red' }}>{errors.internationalDelivery     }</div>}
     

  </MDBCol>


</MDBRow>
      </Tab>
    </Tabs>
              </MDBRow>
              <MDBRow style={{marginTop:'60px'}}>
              <MDBCol><div className="h211"> {t('select_payment')} </div>  </MDBCol>

              </MDBRow>
              <MDBRow style={{marginTop:'30px',marginLeft:'10px'}}>
              <Form.Check 
             
            type='checkbox'
            id={`liqpay`}
            checked={selectedPaymentMethod === 'liqpay'}
            onChange={() => handleCheckboxChange('liqpay')}
            label={t('full')}
          />
      
       
            



              </MDBRow>
           { activeTab=='longer-tab'&&  <MDBRow style={{marginTop:'20px',marginLeft:'10px'}}>
              <Form.Check 
            type='checkbox'
            id={`cardpay`}
            checked={selectedPaymentMethod === 'cardpay'}
            onChange={() => handleCheckboxChange('cardpay')}
            label={t('half_price')}
          />

              </MDBRow>}
             
      <div className="showtotal">

      
  <MDBRow>
  {/* <MDBCol>Всього </MDBCol>
  <MDBCol className="text-end"><h5>{convertPrice(total,selectedCurrency)} {selectedCurrency}</h5></MDBCol>
  </MDBRow>
  {discount>0 && (
  <MDBRow>
  <MDBCol>Знижка {discount}%</MDBCol>
  <MDBCol className="text-end"><h5>{convertPrice(total*(discount/100),selectedCurrency)} {selectedCurrency}</h5></MDBCol>
  </MDBRow>)}
 
  <MDBRow>
  
  <MDBCol>Доставка </MDBCol>
  {activeTab!='longer-tab' ? (
  <MDBCol className="text-end"><h5>{convertPrice(shipment,selectedCurrency)} {selectedCurrency}</h5></MDBCol>
  ): (
    <MDBCol className="text-end"><a style={{color:'black',textDecoration:'underline'}} href="https://novaposhta.ua/basic_tariffs">По тарифам перевізника </a></MDBCol>
    )
  } */}
  </MDBRow>

  
  <hr className="my-4 " />
  <MDBRow >
  <MDBCol>{t('to_payment')} </MDBCol>
  <MDBCol> <MDBRow>
  {selectedPaymentMethod === 'cardpay' ? (
    <MDBCol className="text-end">
      <h5>{convertPrice(250, selectedCurrency)} {selectedCurrency}</h5>
    </MDBCol>
  ) : (
    activeTab !== 'longer-tab' ? (
      <MDBCol className="text-end">
        <h5>{TotalSum+shipment} {selectedCurrency}</h5>
      </MDBCol>
    ) : (
      <MDBCol className="text-end">
        <h5>{TotalSum} {selectedCurrency}</h5>
      </MDBCol>
    )
  )}
</MDBRow> </MDBCol>
 </MDBRow>

  <MDBRow style={{marginTop:'15px'}}>
    {proceed===true?( <div > <div  dangerouslySetInnerHTML={{ __html: instanse_liq.cnb_form(paymentData,proceed) }} /></div>):( <Button disabled={checkoutbtn} variant="dark" style={{borderRadius:'0px'}} onClick={saveChanges}> {t('Submit_order')}  </Button>)}
   
  </MDBRow>
      </div>
  </MDBCol>




  <MDBCol  md='5' className="order-md-2 order-1">
  <MDBRow> <MDBCol><div className="h211"> {t('basket')} </div>  </MDBCol> </MDBRow>
  <MDBRow>
{
  arrbuket.length < 1 ? (
    <>
    <p>{t('emptybasket')} </p>
    {errors.buket && <div style={{ color: 'red' }}>{errors.buket}</div>}
  </>
  ) : (
  arrbuket.map((x) => (
    <CardBox
      key={x.id}
      remove={removeBasket}
      article={x.article}
      selectedCurrency={selectedCurrency}
      unic={x.id}
      name={i18n.language === 'en' ? x.nameEng : x.name}
      quantity={x.quantity}
      size={x.size}
      t={t}
      insulator={x.insulator}
      picture={x.image}
      price={convertPrice(x.price,selectedCurrency)}
      incrementQuantity={incrementQuantity}
      decrementQuantity={decrementQuantity}
    ></CardBox>))
    )
}


  </MDBRow>
  <hr className="my-4" />
  <MDBRow>
  <MDBCol>{t('total')} </MDBCol>
  <MDBCol className="text-end"><h5>{convertPrice(total,selectedCurrency)} {selectedCurrency}</h5></MDBCol>
  </MDBRow>
  {discount>0 && (
  <MDBRow>
  <MDBCol>{t('discount')} {discount}%</MDBCol>
  <MDBCol className="text-end"><h5>{convertPrice(total*(discount/100),selectedCurrency)} {selectedCurrency}</h5></MDBCol>
  </MDBRow>)}
 
  <MDBRow>
  
  <MDBCol>{t('delivery')} </MDBCol>
  {activeTab!='longer-tab' ? (
  <MDBCol className="text-end"><h5>{convertPrice(shipment,selectedCurrency)} {selectedCurrency}</h5></MDBCol>
  ): (
    <MDBCol className="text-end"><a style={{color:'black',textDecoration:'underline'}} href="https://novaposhta.ua/basic_tariffs">{t('price_delivery')} </a></MDBCol>
    )
  }
  </MDBRow>

  
  <hr className="my-4" />
  <MDBRow id='totalbtn' >
  <MDBCol>{t('to_payment')} </MDBCol>
  <MDBCol> <MDBRow>
  {selectedPaymentMethod === 'cardpay' ? (
    <MDBCol className="text-end">
      <h5>{convertPrice(250, selectedCurrency)} {selectedCurrency}</h5>
    </MDBCol>
  ) : (
    activeTab !== 'longer-tab' ? (
      <MDBCol className="text-end">
        <h5>{TotalSum+shipment} {selectedCurrency}</h5>
      </MDBCol>
    ) : (
      <MDBCol className="text-end">
        <h5>{TotalSum} {selectedCurrency}</h5>
      </MDBCol>
    )
  )}
</MDBRow> </MDBCol>
 </MDBRow>
 

  <MDBRow id="totalbtn" style={{marginTop:'15px'}}>
    {proceed===true?( <div > <div  dangerouslySetInnerHTML={{ __html: instanse_liq.cnb_form(paymentData,proceed) }} /></div>):( <Button disabled={checkoutbtn} variant="dark" style={{borderRadius:'0px'}} onClick={saveChanges}> {t('Submit_order')} </Button>)}
   
  </MDBRow>
    </MDBCol>

  </MDBRow>

 



</MDBContainer>



    <Footer />
    </div>
  );
};

export default CheckoutPage;

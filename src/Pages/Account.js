import { useEffect,useState } from "react";
import React from 'react';
import PxMainPage from './PxMainPage';
import Footer from '../Components/Footer';
import Form from 'react-bootstrap/Form'
import { Link} from "react-router-dom";
import axios from 'axios';
import {
 
  MDBContainer,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';
import { Button } from "react-bootstrap";
const Account = () => {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [onEdit, setOnEdit] = useState(true);
  const [errors, setErrors] = useState({});
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
  const validateForm = () => {
    const errors = {};
   
    
    if (!name.trim()) {
      errors.name = 'Заповніть ім\'я';
    }

    if (!surname.trim()) {
      errors.surname = 'Заповніть прізвище';
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Заповніть номер телефону';
    }

    if (!email.trim()) {
      errors.email = 'Заповніть E-mail';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Введіть коректний E-mail';
    }
   

    setErrors(errors);

    return Object.keys(errors).length === 0; 
  };

  useEffect(() => {
    
   

    if(!window.sessionStorage.getItem("AccessToken"))
     {
    
     window.location.href='/';
    }
    else{
      axios({method:'get',
      url:`https://localhost:7269/api/Authenticate/getUserbyId`,
    headers: {         'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                  }})
       .then(response => {
      setName(response.data.name);
      setSurname(response.data.surname);
      setEmail(response.data.email);
      setPhonenumber(response.data.phonenumber);
     
    })
    .catch(error => console.error('Error fetching products:', error));
  
    }
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
function savechanges()
{
  const isValid = validateForm();

  if (isValid) {
  var bodyFormData = new FormData();
  bodyFormData.append('Name', name);
  bodyFormData.append('SurName', surname);
  bodyFormData.append('email', email);
  bodyFormData.append('phonenumber',phoneNumber );
  axios (

    {
    method:'post',
    url:'https://localhost:7269/api/Authenticate/updateUserInfo',
    data:bodyFormData,
    headers: {
      
            'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
    },
  
    }



).then  (res=>
{
  alert("Данні успішно обновлені ")
   
    window.location.reload();
  
}).catch(error => {
      
  if (error.response) {
  
    console.error('Response error:', error.response.data);
  } else if (error.request) {
  
    console.error('Request error:', error.request);
  } else {
  
    console.error('Error during request:', error.message);
  }

});   
  }
}

  return (
    <div >
     <PxMainPage convertPrice={convertPrice} selectedCurrency={selectedCurrency} handleCurrencyChange={handleCurrencyChange} />
    <div className="stock-status">
      <Link to="/"><div className="div33">Головна </div></Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
<Link to={`/account`}><div className="div34">Особистий кабінет</div></Link>
</div>
<MDBContainer>
<MDBCol md='7'>
              <MDBRow style={{marginTop:'50px'}}>
              <MDBCol><div className="h211" > Ваші данні</div>  </MDBCol>
              </MDBRow>
              
              
              <MDBRow>
              <MDBCol><Form.Control
           disabled={onEdit}
                      type="text"
                      value={name}
                      id="entername"
                      placeholder="Ваше ім'я *"
                      onChange={(e)=>setName(e.target.value)}
                    /> {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}</MDBCol>
              <MDBCol><Form.Control
               disabled={onEdit}
               value={surname}
                      type="text"
                      id="entersurname"
                      placeholder="Ваше прізвище *"
                      onChange={(e)=>setSurname(e.target.value)}
                    /> {errors.surname && <div style={{ color: 'red' }}>{errors.surname}</div>} </MDBCol>
              </MDBRow>
              <MDBRow style={{marginTop:'20px'}}>
              <MDBCol><Form.Control
               disabled={onEdit}
              value={phoneNumber}
                      type="text"
                      id="enterphone"
                      placeholder="Номер телефону *"
                      onChange={(e)=>setPhonenumber(e.target.value)}
                    /> {errors.phoneNumber && <div style={{ color: 'red' }}>{errors.phoneNumber}</div>}</MDBCol>
              <MDBCol><Form.Control
               disabled={onEdit}
           value={email}
                      type="email"
                      id="enteremail"
                      placeholder="E-mail *"
                      onChange={(e)=>setEmail(e.target.value)}
                    /> {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}</MDBCol>
              </MDBRow>
           
         <MDBRow style={{marginTop:'30px'}}>
        {onEdit?(<Button variant="outline-dark" onClick={()=>setOnEdit(false)}>Редагувати</Button>)
          :( <Button variant="dark" onClick={savechanges}>Зберегти</Button>)
        }


       
         
         </MDBRow>
   
  </MDBCol>
  </MDBContainer>
    <Footer />
    </div>
  );
};

export default Account;

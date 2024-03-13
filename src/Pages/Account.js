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
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
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
const validateFormPass = () => {
  let isValid = true;

  

  if (!password || password.length < 8 || !/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
setPasswordError('Пароль повинен містити принаймні 8 символів і включати хоча б одну букву і одну цифру');
isValid = false;
} else {
setPasswordError('');
}

  if (repeatPassword !== password) {
    setRepeatPasswordError('Паролі не співпадають');
    isValid = false;
  } else {
    setRepeatPasswordError('');
  }

  return isValid;
};
function savepass()
{

  const isvalid=validateFormPass();
  if(isvalid)
 { axios({method:'post',
      url:`https://localhost:7269/api/Authenticate/v1?password=${password}`,
    headers: {         'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                  }})
       .then(response => {
     window.location.reload();
     
    })
    .catch(error => console.error('Error fetching products:', error));
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
  <MDBRow>
<MDBCol md='8'>
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

<MDBRow style={{marginTop:'50px'}}>
              <MDBCol><div className="h211" > Змінити пароль </div>  </MDBCol>
              </MDBRow>
              <MDBRow style={{marginTop:'20px'}}>
              <MDBCol><Form.Control  type="password"
                disabled={onEdit}
              placeholder="Введіть  новий пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />  <Form.Text className="text-danger">{passwordError}</Form.Text> </MDBCol><MDBCol> <Form.Control
            disabled={onEdit}
            type="password"
            placeholder="Повторіть пароль"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <Form.Text className="text-danger">{repeatPasswordError}</Form.Text></MDBCol>
          </MDBRow>
          <MDBRow style={{marginTop:'30px'}}>
         
          {onEdit?(<Button variant="outline-dark" onClick={()=>setOnEdit(false)}>Редагувати</Button>)
          :( <Button variant="dark" onClick={savepass}>Змінити</Button>)
        }
            </MDBRow>
         </MDBRow>
   
  </MDBCol>
  <MDBCol md='4'>
<MDBRow  style={{paddingLeft:'55px'}}>
<MDBRow style={{marginTop:'50px'}}>

              <MDBCol><h5><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
</svg>    &nbsp; Особисті данні </h5>  </MDBCol>
              </MDBRow>
              <MDBRow style={{marginTop:'15px'}}>

              <MDBCol ><h5><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-bag-check" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
</svg>    &nbsp; Історія замовлень </h5>  </MDBCol>
              </MDBRow>
              <MDBRow style={{marginTop:'15px'}}>

<MDBCol><h5><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg>  &nbsp; Обрані товари </h5>  </MDBCol>
</MDBRow>
</MDBRow>
  </MDBCol>
  </MDBRow>
  </MDBContainer>
    <Footer />
    </div>
  );
};

export default Account;

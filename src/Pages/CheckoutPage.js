import { useEffect,useState } from "react";
import React from 'react';
import PxMainPage from './PxMainPage';
import Footer from '../Components/Footer';
import { Link} from "react-router-dom";
import {Button,Form,Modal,Tabs,Tab} from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';
import './CheckoutPage.css';
import {
 
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBRange 
} from 'mdb-react-ui-kit';
import CardBox from "../Components/CardBox";
const CheckoutPage = () => {

  const [titleaccount, setTitleAccount] = useState('');
  const [login, setLogin] = useState("");
  const [pass1, setPass1] = useState("");
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [arrbuket, setBuket] = useState([]);
  const [phoneNumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [cityDescriptions, setCityDescriptions] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCity2, setSelectedCity2] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedDepartament, setSelectedDepartament] = useState(null);
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");

  const [warehouseDescriptions, setwarehouseDescriptions] = useState([]);
  const [typeDelivery, setTypeDelivery] = useState('1');
  const [activeTab, setActiveTab] = useState('longer-tab'); 
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [total,setTotal] = useState(0);
  const handleCheckboxChange = (id) => {
    setSelectedPaymentMethod(id);
  };


  const apiKey = '24443d18027301d444ec98b00ef49598';
  const apiUrl = 'https://api.novaposhta.ua/v2.0/json/';

  useEffect(() => {
    
    const storedBasket = window.sessionStorage.getItem("Basket");
   

    if(! storedBasket || storedBasket.length<1)
     {
    
     window.location.href='/';
    }
    else{
      const parsedBasketData = JSON.parse(storedBasket);
      setBuket(parsedBasketData);
      const totalCost = parsedBasketData.reduce((sum, item) => sum + item.quantity * item.price, 0);
setTotal(totalCost);
    }


    if(!window.sessionStorage.getItem("UserId"))
    setTitleAccount('У мене вже є аккаунт');
  else{
    setTitleAccount('');
    
    axios({method:'get',
    url:`https://localhost:7269/api/Authenticate/getUserbyId?id=${window.sessionStorage.getItem("UserId").toString()}`,
  headers: {         'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                }})
     .then(response => {
    setName(response.data.userName);
    setEmail(response.data.email);
    setPhonenumber(response.data.phoneNumber);
  })
  .catch(error => console.error('Error fetching products:', error));

   
  }
 

  const requestData = {
    apiKey: apiKey,
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
  try {
    const response = await axios.get('https://restcountries.com/v2/all');
    return response.data.map(country => ({
      label:country.name,
      name: country.name,
      value: country.name,
      alpha3Code: country.alpha3Code,
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

  }, []);

  function removeBasket(id) {
    let prod = arrbuket.find(item => item.id === id);
    if (prod) {
      const updatedBasket = arrbuket.filter(item => item.id !== id);
      setBuket(updatedBasket);
      const totalCost = updatedBasket.reduce((sum, item) => sum + item.quantity * item.price, 0);
      setTotal(totalCost);
      window.sessionStorage.setItem("Basket", JSON.stringify(updatedBasket));
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
     
      window.sessionStorage.setItem("Basket", JSON.stringify(updatedBasket));
    }
  };
  const handleChangeCountry = async (e) => {
    setSelectedCountry(e.value);
    await fetchCitiesByCountry(e.value);
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
      setCities([]); // Clear cities in case of an error
    }
  };
  
  
  const handleChange = (e) => {
    setSelectedCity(e.value);
    
    if(typeDelivery==='1')
    {
    
            const getWarehousesRequest = {
              apiKey: apiKey,
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
  function SubmitLog() 
  {
     
         
      
              axios (

                  {
                      method:'post',
                      url:'https://localhost:7269/api/Authenticate/login',
                      data:
                      JSON.stringify({ email:email, Password: pass1}),
                      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }

                  }



              ).then  (res=>

                      
                      {
                         
                       
                         
                              window.sessionStorage.setItem("AccessToken", res.data.token);
                              window.sessionStorage.setItem("UserId", res.data.userId);
                         
                             if(res.data.userRole[0]=="User")

                             {
                                             
                              window.location.href='/account';
                              
                          
                          
                              handleClose2();

                             }

                          


                      })
                      .catch(function (error) {
                          alert("Error password or email");
                        window.location.href = "/";
                        
                          console.log("Error:"+error);
                        });
                      
                      
                      ;

     

  };
  return (
    <div >
          <Modal show={show2} onHide={handleClose2}>
      <Modal.Header closeButton>
        <Modal.Title>Авторизація</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Login</Form.Label>
            <Form.Control
            
              type="email"
              placeholder="Enter Login"
              name="login"
              onChange={(e)=>setLogin(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
             
              onChange={(e)=>setPass1(e.target.value)}   
            />
          </Form.Group>
       
         
          <Form.Group controlId="formBasicPassword">
            <Form.Label onClick={()=>alert('Реєстраційні данні були відправленні на вашу пошту')}>Forgot password?</Form.Label>
          
          </Form.Group>


          <Button  variant="dark" onClick={SubmitLog} >
            Submit
          </Button>
         
        </Form>
        </Modal.Body>
        </Modal>
    <PxMainPage />
    <div className="stock-status">
      <Link to="/"><div className="div33">Головна </div></Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
<Link to={`/checkout`}><div className="div34">Оформлення замовлення</div></Link>
</div>

<MDBContainer className="py-5 h-100" >
<MDBRow> <h2 className="h25title">Оформлення замовлення</h2></MDBRow>
  <MDBRow>
 
  <MDBCol md='7'>
              <MDBRow>
              <MDBCol><div className="h211"> Заповніть ваші данні</div>  </MDBCol>
              <MDBCol className="text-end"> <div className="di153">{titleaccount}</div> </MDBCol>
              </MDBRow>
              
              
              <MDBRow>
              <MDBCol><Form.Control
           
                      type="text"
                      value={name}
                      id="entername"
                      placeholder="Ваше ім'я *"
                      onChange={(e)=>setName(e.target.value)}
                    /></MDBCol>
              <MDBCol><Form.Control
               value={surname}
                      type="text"
                      id="entersurname"
                      placeholder="Ваше прізвище *"
                      onChange={(e)=>setSurname(e.target.value)}
                    /> </MDBCol>
              </MDBRow>
              <MDBRow style={{marginTop:'20px'}}>
              <MDBCol><Form.Control
              value={phoneNumber}
                      type="text"
                      id="enterphone"
                      placeholder="Номер телефону *"
                      onChange={(e)=>setPhonenumber(e.target.value)}
                    /></MDBCol>
              <MDBCol><Form.Control
           value={email}
                      type="email"
                      id="enteremail"
                      placeholder="E-mail *"
                      onChange={(e)=>setEmail(e.target.value)}
                    /> </MDBCol>
              </MDBRow>
              <MDBRow style={{marginTop:'60px'}}>
              <MDBCol><div className="h211"> Оберіть зручний спосіб доставки </div>  </MDBCol>

              </MDBRow>
              <MDBRow>
              <Tabs
      
      defaultActiveKey={activeTab}
      id="delivery-tabs"
      onSelect={(key) => setActiveTab(key)}
      className="mb-3"
      justify
    >
    
      <Tab eventKey="longer-tab" title="ДОСТАВКА ПО УКРАЇНІ">
       <MDBRow>
        <MDBCol>   <Form.Select  size="lg" onChange={(e)=> setTypeDelivery(e.target.value) } >
        <option  value={1}>Нова Пошта - відділення </option>
        <option value={2}>Нова Пошта - адреса </option>
        <option value={3}>УкрПошта - відділення </option>
        <option value={2}>УкрПошта - адреса </option>
      </Form.Select></MDBCol>
        <MDBCol> <Select
           className="custom-select-lg"
    
     onChange={handleChange}
      options={cityDescriptions}
      isSearchable
      placeholder="Оберіть місто"
      styles={{
        control: (provided) => ({
          ...provided,
         borderRadius: '0%',
          height: '50px', 
        }),
      }}
    /> </MDBCol>
       </MDBRow>
       <MDBRow>
        <MDBCol>
        {typeDelivery === '1' && (
        <Select
          className="custom-select-lg"
          onChange={(e)=> setSelectedDepartament(e.value)}
          options={warehouseDescriptions}
          isSearchable
          placeholder="Оберіть відділення"
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: '0%',
              height: '50px',
            }),
          }}
        />
      )}

{typeDelivery === '2' && (
       <Form.Control
          size="lg"
       type="text"
       id="enteraddress"
       placeholder=" Введіть адресу "
       onChange={(e)=>setAddress(e.target.value)}
     />
      )}

  {typeDelivery === '3' && (
        <Select
          className="custom-select-lg"
          onChange={(e)=> setSelectedDepartament(e.value)}
          options={warehouseDescriptions}
          isSearchable
          placeholder="Оберіть відділення"
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: '0%',
              height: '50px',
            }),
          }}
        />
      )}

        </MDBCol>
        <MDBCol>
          
          </MDBCol>
      
       </MDBRow>
      </Tab>
      <Tab eventKey="longer-tab2" title="МІЖНАРОДНА ДОСТАВКА">
       <MDBRow>
            <MDBCol>
            <Select
          className="custom-select-lg"
          onChange={handleChangeCountry}
          options={countries}
          isSearchable
          placeholder="Оберіть країну"
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: '0%',
              height: '50px',
            }),
          }}
        />
            </MDBCol>
            <MDBCol>
            <MDBCol>
            <Select
          className="custom-select-lg"
          onChange={(e)=> setSelectedCity2(e.value)}
          options={cities}
          isSearchable
          placeholder="Оберіть місто"
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: '0%',
              height: '50px',
            }),
          }}
        />
            </MDBCol>
            </MDBCol>

       </MDBRow>
<MDBRow>
  <MDBCol>
  <Form.Control
          size="lg"
       type="text"
       id="enteraddress"
       placeholder=" Введіть адресу "
       onChange={(e)=>setAddress2(e.target.value)}
     />
  </MDBCol>
  <MDBCol>
  <Form.Control
          size="lg"
       type="text"
       id="enteraddress"
       placeholder=" "
      
     />
  </MDBCol>
</MDBRow>
      </Tab>
    </Tabs>
              </MDBRow>
              <MDBRow style={{marginTop:'60px'}}>
              <MDBCol><div className="h211"> Оберіть зручний спосіб оплати </div>  </MDBCol>

              </MDBRow>
              <MDBRow style={{marginTop:'30px'}}>
              <Form.Check 
            type='checkbox'
            id={`liqpay`}
            checked={selectedPaymentMethod === 'liqpay'}
            onChange={() => handleCheckboxChange('liqpay')}
            label="Банківською карткою на сайті Visa або MasterCard (платіжний сервіс LiqPay)"
          />

              </MDBRow>
              <MDBRow style={{marginTop:'20px'}}>
              <Form.Check 
            type='checkbox'
            id={`cardpay`}
            checked={selectedPaymentMethod === 'cardpay'}
            onChange={() => handleCheckboxChange('cardpay')}
            label="Передоплата або повна оплата на картку (ПриватБанк або Monobank)"
          />

              </MDBRow>
  </MDBCol>




  <MDBCol style={{paddingLeft:'35px'}} md='5'>
  <MDBRow> <MDBCol><div className="h211"> Ваш кошик </div>  </MDBCol> </MDBRow>
  <MDBRow>
{
  arrbuket.map((x) => (
    <CardBox
      key={x.id}
      remove={removeBasket}
      unic={x.id}
      name={x.name}
      quantity={x.quantity}
      size={x.size}
      picture={x.image}
      price={x.price}
      incrementQuantity={incrementQuantity}
      decrementQuantity={decrementQuantity}
    ></CardBox>))
}


  </MDBRow>
  <hr className="my-4" />
  <MDBRow>
  <MDBCol>Всього </MDBCol>
  <MDBCol className="text-end"><h5>{total} UAH</h5></MDBCol>
  </MDBRow>
  <MDBRow>
  <MDBCol>Доставка </MDBCol>
  <MDBCol className="text-end"><h5>700 UAH</h5></MDBCol>
  </MDBRow>
  <hr className="my-4" />
  <MDBRow>
  <MDBCol>До сплати </MDBCol>
  <MDBCol className="text-end"><h5>{total+700} UAH</h5></MDBCol>
  </MDBRow>
  <MDBRow style={{marginTop:'15px'}}>
    <Button variant="dark" style={{borderRadius:'0px'}}> Оформити замовлення </Button>
  </MDBRow>
    </MDBCol>

  </MDBRow>





</MDBContainer>



    <Footer />
    </div>
  );
};

export default CheckoutPage;
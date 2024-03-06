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
const CheckoutPage = () => {

  const [titleaccount, setTitleAccount] = useState('');
  const [login, setLogin] = useState("");
  const [pass1, setPass1] = useState("");
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [cityDescriptions, setCityDescriptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDepartament, setSelectedDepartament] = useState(null);
  const [warehouseDescriptions, setwarehouseDescriptions] = useState([]);
  const apiKey = '24443d18027301d444ec98b00ef49598';
  const apiUrl = 'https://api.novaposhta.ua/v2.0/json/';
  useEffect(() => {
    
    const storedBasket = window.sessionStorage.getItem("Basket");

    if(! storedBasket || storedBasket.length<1)
     {
    
     window.location.href='/';
    }
    if(!window.sessionStorage.getItem("UserId"))
    setTitleAccount('У мене вже є аккаунт');
  else{
    setTitleAccount('');
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
      console.log(formattedCityDescriptions);
  
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });



  }, []);

  const handleChangeDep = (e) => {
    setSelectedDepartament(e.value);
  }
  const handleChange = (e) => {
    setSelectedCity(e.value);
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
    
  };
  function SubmitLog() 
  {
     
         
      
              axios (

                  {
                      method:'post',
                      url:'https://localhost:7269/api/Authenticate/login',
                      data:
                      JSON.stringify({ UserName:login, Password: pass1}),
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
 
  <MDBCol md='8'>
              <MDBRow>
              <MDBCol><div className="h211"> Заповніть ваші данні</div>  </MDBCol>
              <MDBCol className="text-end"> <div className="di153">{titleaccount}</div> </MDBCol>
              </MDBRow>
              
              
              <MDBRow>
              <MDBCol><Form.Control
           
                      type="text"
                      id="entername"
                      placeholder="Ваше ім'я *"
                      onChange={(e)=>setName(e.target.value)}
                    /></MDBCol>
              <MDBCol><Form.Control
                      type="text"
                      id="entersurname"
                      placeholder="Ваше прізвище *"
                      onChange={(e)=>setSurname(e.target.value)}
                    /> </MDBCol>
              </MDBRow>
              <MDBRow style={{marginTop:'20px'}}>
              <MDBCol><Form.Control
             
                      type="text"
                      id="enterphone"
                      placeholder="Номер телефону *"
                      onChange={(e)=>setPhonenumber(e.target.value)}
                    /></MDBCol>
              <MDBCol><Form.Control
          
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
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
    
      <Tab eventKey="longer-tab" title="ДОСТАВКА ПО УКРАЇНІ">
       <MDBRow>
        <MDBCol>   <Form.Select  size="lg">
        <option>Нова Пошта - відділення </option>
        <option>Нова Пошта - адреса </option>
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
          height: '45px', 
        }),
      }}
    /> </MDBCol>
       </MDBRow>
       <MDBRow>
        <MDBCol>
        <Select 
           className="custom-select-lg"
    
     onChange={handleChangeDep}
      options={warehouseDescriptions}
      isSearchable
      placeholder="Оберіть відділення"
      styles={{
        control: (provided) => ({
          ...provided,
         borderRadius: '0%',
          height: '45px', 
        }),
      }}
    /> 
        </MDBCol>
        <MDBCol>
          
          </MDBCol>
      
       </MDBRow>
      </Tab>
      <Tab eventKey="longer-tab2" title="МІЖНАРОДНА ДОСТАВКА">
        Tab content for Loooonger Tab
      </Tab>
    </Tabs>
              </MDBRow>
  </MDBCol>




  <MDBCol md='4'>
  <MDBRow> <MDBCol><div className="h211"> Ваш кошик </div>  </MDBCol> </MDBRow>
    </MDBCol>

  </MDBRow>





</MDBContainer>



    <Footer />
    </div>
  );
};

export default CheckoutPage;

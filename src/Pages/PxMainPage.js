import { useEffect,useState } from "react";
import CartBasket from '../Components/CartBasket';
// import "./PxMainPage.css";
import "./HeaderStyle.css"
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import { Alert, Dropdown } from 'react-bootstrap';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBTypography,
  MDBCardBody,
  MDBCardImage
} from 'mdb-react-ui-kit';
const PxMainPage = () => {

  
  const [setwarehouse, setsetwarehouse] = useState("");

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notice, setNotice] = useState("none");
  const [payInfo, setPayInfo] = useState("");

  const [showQr, setShowQr] = useState(false);
  const handleCloseQr = () => setShowQr(false);
  const handleShowQr = () => setShowQr(true);

  const [showPayCard, setShowPayCard] = useState(false);
  const handleClosePayCard = () => setShowPayCard(false);
  const handleShowPayCard = () => setShowPayCard(true);



  const [arrBasket,setArrBasket] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [count, setCount] = useState(0);
  const [total,setTotal] = useState(0);
  const [payamount,setPayAmount] = useState(0);
  const [show, setShow] = useState(false);
  const [delivery,setDelivery] = useState("");
  const [userId,setUserId] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [result, setResult] = useState("");
      const [picture, setPicture] = useState("");
      const apiKey = '24443d18027301d444ec98b00ef49598';
      const apiUrl = 'https://api.novaposhta.ua/v2.0/json/';
  useEffect(() => {
   
    const storedBasket = window.sessionStorage.getItem("Basket");
    if (storedBasket && storedBasket.length > 0){
    const parsedBasketData = JSON.parse(storedBasket);
    setArrBasket(parsedBasketData);
    setCount(parsedBasketData.length);
    const totalSum = parsedBasketData.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalSum);
    setPayAmount(totalSum);
  }

 
  }, []);
  function loginbtn()
  {
    
      handleShow();
     
   

  }

  function SubmitLogIn() 
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
                            setIsLogin(true);
                             if(res.data.userRole[0]=="User")

                             {
                                             
                           
                          
                          
                          
                              handleClose();

                             }

                             if(res.data.userRole[0]=="Admin")
                             {
                             
                                window.location.href='/admin';
                             }
                             if(res.data.userRole[0]=="Menager")
                             {
                             
                                window.location.href='/admin';
                             }


                      })
                      .catch(function (error) {
                          alert("Error password or email");
                        window.location.href = "/";
                          setIsLogin(false);
                          console.log("Error:"+error);
                        });
                      
                      
                      ;

     

  };

  function CreateQr()
  {
    handleShowQr();


   var QRCode = require('qrcode')
 var str=`https://www.ipay.ua/ru/charger?bill_id=1663&acc=021018496&invoice=${payamount}.00&order_id=100506`;
   QRCode.toDataURL(str, function (err, url) {
    setPicture(url);
     console.log(url)
     setPayInfo('order_id=100506');
   })
  
  }


function pay()
{
// setPayInfo('order_id=100506');
// var notice_str=notice+payInfo;
// setNotice(notice_str);
arrBasket.splice(0, arrBasket.length);
window.sessionStorage.removeItem("Basket");


alert("Замовлення відправленне на опрацювання!")

window.location.reload();
handleCloseQr();
}
function payCard()
{
// setPayInfo('order_id=100506');
// var notice_str=notice+payInfo;
// setNotice(notice_str);
arrBasket.splice(0, arrBasket.length);
window.sessionStorage.removeItem("Basket");


alert("Замовлення відправленне на опрацювання!")

window.location.href = "https://www.liqpay.ua/en";


handleClosePayCard();
}





  const [showBasket, setShowBasket] = useState(false);
  const handleCloseBasket = () => setShowBasket(false);
  const handleShowBasket = () => setShowBasket(true);


  function removeBasket(id) {
    let prod = arrBasket.find(item => item.id === id);
    if (prod) {
     
      const updatedBasket = arrBasket.filter(item => item.id !== id);
      setArrBasket(updatedBasket);
      setCount(count - 1);
  
    
      window.sessionStorage.setItem("Basket", JSON.stringify(updatedBasket));
      setTotal(total - prod['salePrice']);

      setPayAmount(payamount-prod['salePrice']);
      window.sessionStorage.setItem("cartItemCount", count);
  
    }
  }
  function savechange()
  {
  

    if(FirstName!=""&&LastName!=""&&phoneNumber!="")
    { 
     
     if(phoneNumber.length==10 && FirstName.length>1 && LastName.length>5 )
               {
                  alert()

               }
    }
    else{
      alert("Перевірте пусті поля!")
    }


  // for (const iterator of arrBasket) 
  // {
  // var bodyFormData = new FormData();
  // bodyFormData.append('prodID', iterator.id);
  // bodyFormData.append('userID', userId);
  //             axios (
  
  //               {
  //               method:'post',
  //               url:'https://localhost:7211/api/Product/Buy',
  //               data:bodyFormData,
  //               headers: {
  //                 'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
  //                       'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
  //               },
               
  //               }
  
  
  
  //           ).then  (res=>
  //           {
  //             alert("Your order is accepted")
  //               console.log(res.data);
               
  //           });  
  // }
  // handleClose();
  // window.location.reload();
  
  
  }  
 
function Delivery(postType)
{
  if(postType=="1")
  {
    const requestData = {
      apiKey: apiKey,
      modelName: 'Address',
      calledMethod: 'getCities',
      methodProperties: {}
    };
    
    
    const selectElement = document.getElementById('citySelect');
    
   
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
       
        const cityDescriptions = data.data.map(city => city.Description);
    
       
        selectElement.innerHTML = '';
    
       
        cityDescriptions.forEach(description => {
          const optionElement = document.createElement('option');
          optionElement.value = description;
          optionElement.text = description;
          selectElement.appendChild(optionElement);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  else
  {

  }
}

function setCities(selectedCity)
{
 
  const warehouseSelectElement = document.getElementById('warehouseSelect');
  const getWarehousesRequest = {
    apiKey: apiKey,
    modelName: 'Address',
    calledMethod: 'getWarehouses',
    methodProperties: {
      CityName: selectedCity
  
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
      
      const warehouseDescriptions = data.data.map(warehouse => warehouse.Description);

     
      warehouseSelectElement.innerHTML = '';

     
      warehouseDescriptions.forEach(description => {
        const optionElement = document.createElement('option');
        optionElement.value = description;
        optionElement.text = description;
        warehouseSelectElement.appendChild(optionElement);
      });
    })
    .catch(error => {
      console.error('Error fetching warehouse data:', error);
    });
}
     return (
     

      <div className="px-main-page">


<Modal id='basket' show={showBasket} onHide={handleCloseBasket}>
        <Modal.Header closeButton>
          <Modal.Title>Кошик</Modal.Title>
        </Modal.Header>
        <Modal.Body> {
        arrBasket.map(
            (x)=><CartBasket remove={removeBasket}  unic={x.id} name={x.name} model='' picture={x.image} price={x.price} ></CartBasket>
        )
        }
             
              <h3 style={{color:'navy'}}>Ваші данні : </h3>
              <MDBRow className="justify-content-between align-items-center">
                <MDBCol >
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Ім'я</Form.Label>
        <Form.Control onChange={(e)=>setFirstName(e.target.value)} type="text" />
      
      </Form.Group>
                </MDBCol>
                <MDBCol  >
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Прізвище</Form.Label>
        <Form.Control onChange={(e)=>setLastName(e.target.value)} type="text" />
      </Form.Group>
                </MDBCol>
                </MDBRow>

                <MDBRow className="justify-content-between align-items-center">
                <MDBCol >
                <Form.Group className="mb-3" >
        <Form.Label>Номер телефону </Form.Label>
        <Form.Control onChange={(e)=>setPhoneNumber(e.target.value)} type="text" />
      
      </Form.Group>
                </MDBCol>
                </MDBRow>
                <MDBRow className="justify-content-between align-items-center">
                <MDBCol  >
                <Form.Group className="mb-3" >
        <Form.Label>Коментар </Form.Label>
        <Form.Control onChange={(e)=>setNotice(e.target.value)} type="text" />
      </Form.Group>
                </MDBCol>
                </MDBRow>
                <MDBRow className="justify-content-between align-items-center">
                <MDBCol  >
                <Form.Group className="mb-3" >
        <Form.Label>Доставка </Form.Label>
        <select className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>Delivery((e.target.value) )}>
        <option value="2">Укр Пошта</option>
                  <option value="1">Нова Пошта </option>
                 
                  
                </select>
      </Form.Group>
                </MDBCol>
                </MDBRow>
                <MDBRow className="justify-content-between align-items-center">
                <MDBCol  >
                <Form.Group className="mb-3" >
        <Form.Label>Оберіть місто </Form.Label>
        <select id='citySelect' className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>{setCities(e.target.value)}}>
                
                </select>
      </Form.Group>
                </MDBCol>
                </MDBRow>
                <MDBRow className="justify-content-between align-items-center">
                <MDBCol  >
                <Form.Group className="mb-3" >
        <Form.Label>Оберіть відділення </Form.Label>
        <select id='warehouseSelect' className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>{setwarehouse(e.target.value)}}>
                
                </select>
      </Form.Group>
                </MDBCol>
                </MDBRow>
              <MDBCardBody>
              <div className="d-flex justify-content-between mb-4">
                <MDBTypography tag="h5" className="text-uppercase">
                  До сплати : 
                </MDBTypography>
                <MDBTypography tag="h5">{payamount} грн</MDBTypography>
              </div>
            <p>
              <strong>Ми приймаємо </strong>
            </p>
            <MDBCardImage className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
              alt="Visa" />
            <MDBCardImage className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
              alt="American Express" />
            <MDBCardImage className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
              alt="Mastercard" />
            <MDBCardImage className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
              alt="PayPal acceptance mark" />
          </MDBCardBody>
        <MDBCol style={{marginTop:20}}>
        <MDBRow>
          <Button  variant="outline-success" onClick={()=>handleShowPayCard()}  >
            Сплатити карткою
          </Button>
          </MDBRow>
          </MDBCol>
          <MDBCol>
          <MDBRow>
          <Button  variant="outline-success" onClick={()=>{ CreateQr()}} >
            Сгенерувати QR 
          </Button>
          </MDBRow>
</MDBCol>
        </Modal.Body>
        <Modal.Footer>
        
          <Button variant="dark" onClick={()=>{handleCloseBasket()}}>
            Продовжити покупки
          </Button>
         
        </Modal.Footer>
      </Modal>
    
<Modal show={showPayCard} onHide={handleClosePayCard} >

<MDBCol >
<Modal.Header  closeButton>
<Modal.Title>Payment</Modal.Title>
        </Modal.Header>   
        <Modal.Body>
                    <label>Card number</label>
                    <form className="mb-5">
                      <MDBInput
                        className="mb-5"
                      
                        type="text"
                        size="lg"
                        defaultValue="1234 5678 9012 3457"
                      />
                        <label>Name on card</label>
                      <MDBInput
                        className="mb-5"
                        type="text"
                        size="lg"
                        defaultValue="John Smith"
                      />
                       
                      <MDBRow>
                        <MDBCol md="6" className="mb-5">
                          <MDBInput
                            className="mb-4"
                            label="Expiration"
                            type="text"
                            size="sm"
                            minLength="7"
                            maxLength="7"
                            defaultValue="01/22"
                            placeholder="MM/YYYY"
                          />
                        </MDBCol>
                        <MDBCol md="6" className="mb-5">
                          <MDBInput
                            className="mb-4"
                            label="Cvv"
                            type="text"
                            size="sm"
                            minLength="3"
                            maxLength="3"
                            placeholder="&#9679;&#9679;&#9679;"
                            defaultValue="&#9679;&#9679;&#9679;"
                          />
                        </MDBCol>
                      </MDBRow>

                      <MDBRow>
                      <Button style={{marginTop:30}} onClick={payCard}  size="lg">
                        Proceed to payment 
                      </Button>
                      </MDBRow>

                      </form>
                      </Modal.Body>
                      </MDBCol>
  
</Modal>



      <Modal  className="text-center" show={showQr}  onHide={handleCloseQr}>
        <Modal.Header closeButton>
          <Modal.Title>QR payment</Modal.Title>
        </Modal.Header>
        <Modal.Body> <div>
   <img src={picture} alt="picture QR"></img>
    </div>
    <div >
			
			<div >{result}</div>		
		</div></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseQr}>
            Закрити
          </Button>
          <Button variant="success" onClick={pay} >
            Сплатити
          </Button>
        </Modal.Footer>
      </Modal>

         <Modal show={show} onHide={handleClose}>
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


          <Button  variant="dark" onClick={SubmitLogIn} >
            Submit
          </Button>
         
        </Form>
        </Modal.Body>
        </Modal>


             <section className="header-frame">
        <div className="ticker">
          <div className="ukrainian-brand" id="ukrainianBrand">Ukrainian brand</div>
          <div className="ukrainian-brand1"  id="ukrainianBrand">Ukrainian brand</div>
          <div className="ukrainian-brand2"  id="ukrainianBrand">Ukrainian brand</div>
          <div className="ukrainian-brand3"  id="ukrainianBrand">Ukrainian brand</div>
          <div className="ukrainian-brand4"  id="ukrainianBrand">Ukrainian brand</div>
          <div className="ukrainian-brand5" id="ukrainianBrand">Ukrainian brand</div>
          <div className="ukrainian-brand6"  id="ukrainianBrand">Ukrainian brand</div>
          <div className="ukrainian-brand7"  id="ukrainianBrand">Ukrainian brand</div>
          <div className="ukrainian-brand8"  id="ukrainianBrand">Ukrainian brand</div>
          <div className="ukrainian-brand9"  id="ukrainianBrand">Ukrainian brand</div>
        </div>
        <header className="header" >
        <div className="header-container">
          <div className="logo-menu-navigation">
            <img
              className="logo-icon"
              loading="eager"
              alt=""
              src={require('../assets/logo@2x.png')}
            />
            <div className="menu-navigation">
              <div className="menu-navigation-button-contain">
               <Link to='/shoes'> <div className="button-nav" >взуття</div></Link>
              </div>
              <div className="menu-navigation-button-contain1">
              <Link to='/clothes'>  <div className="button-nav1">одяг</div></Link>
              </div>
              <div className="menu-navigation-button-contain2">
              <Link to='/accessorise'>   <div className="button-nav2">аксесуари</div></Link>
              </div>
              <div className="menu-navigation-button-contain5">
              <Link to='/faq'>   <div className="button-nav5">FAQ</div></Link>
              </div>
            </div>
          </div>
          <div className="search-field-icons">
           
          <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
</svg>
                </span>
                <input type="text" class="form-control" placeholder="Що будемо шукати? " aria-label="Input group example" aria-describedby="basic-addon1"/>
              </div>
            <div className="icons">
           

            <div className="language-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
          </svg>
          </div>

               <div onClick={loginbtn}
                className="user-icon"
               >
<svg xmlns="http://www.w3.org/2000/svg"width="25" height="25" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>
             </div>
             <div
                className="favourite-icon"
               >

<svg xmlns="http://www.w3.org/2000/svg"width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
</svg>
                </div>
               
                <div
                className="pagination-element-frame "onClick={handleShowBasket}
               >
                <svg xmlns="http://www.w3.org/2000/svg"width="20" height="20"  fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
</svg>
               </div>
                <div className="heading-frame">
                  <div className="item-card-frame">({count})</div>
               
              </div>
            </div>
          </div>
        </div>
        </header>
        </section>
      </div>
  );
};

export default PxMainPage;
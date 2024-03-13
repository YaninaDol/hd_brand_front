import { useEffect,useState } from "react";
import CartBasket from '../Components/CartBasket';
import "./HeaderStyle.css"
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate  } from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas';
import AuthModal from "../Components/AuthModal";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBTypography
} from 'mdb-react-ui-kit';
function PxMainPage({ handleCurrencyChange,selectedCurrency, onSearch,convertPrice }) {
  const navigate = useNavigate();
const expand='false';
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  }
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };
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

  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [count, setCount] = useState(0);
  const [total,setTotal] = useState(0);
  const [payamount,setPayAmount] = useState(0);
  const [show, setShow] = useState(false);
  const [delivery,setDelivery] = useState("");
  const [userId,setUserId] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [result, setResult] = useState("");
  const [department, setDepartment] = useState("");
      const [picture, setPicture] = useState("");
      const apiKey = '24443d18027301d444ec98b00ef49598';
      const apiUrl = 'https://api.novaposhta.ua/v2.0/json/';

      const [subcategory1,setSubcategory1] = useState([]);
      const [subcategory2,setSubcategory2] = useState([]);
      const [subcategory3,setSubcategory3] = useState([]);
      const currencies = ['UAH', 'EUR', 'USD'];
    
  useEffect(() => {
    axios.get('https://localhost:7269/api/Specification/GetSubCategoryNamesByCategoryId?id=1')
  .then(response => {
   
    setSubcategory1(response.data)
  })
  .catch(error => console.error('Error fetching products:', error));
  axios.get('https://localhost:7269/api/Specification/GetSubCategoryNamesByCategoryId?id=2')
  .then(response => {
   
    setSubcategory2(response.data)
  })
  .catch(error => console.error('Error fetching products:', error));
  axios.get('https://localhost:7269/api/Specification/GetSubCategoryNamesByCategoryId?id=3')
  .then(response => {
   
    setSubcategory3(response.data)
  })
  .catch(error => console.error('Error fetching products:', error));


  const storedBasket = window.sessionStorage.getItem("Basket");
  if (storedBasket && storedBasket.length > 0) {
    const parsedBasketData = JSON.parse(storedBasket);
    setArrBasket(parsedBasketData);

   
    const totalCount = parsedBasketData.reduce((sum, item) => sum + item.quantity, 0);
    setCount(totalCount);
    
  }
  
 
  }, []);





  function loginbtn()
  {
    if(!window.sessionStorage.getItem("AccessToken"))
      handleShow();
    else{
      window.location.href='/account';
    }
     
   

  }

  function SubmitLogIn() 
  {
     
    if(email.includes('@'))
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
                           
                             if(res.data.userRole[0]=="User")

                             {
                                             
                              window.location.href='/account';
                              
                          
                          
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
                      
                          console.log("Error:"+error);
                        });
                      
                      
                      ;

                      }
                      else alert('Не корректна поштова адреса')

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
const [searchQuery,setSearchQuery] = useState("");
function redirectToFilteredPage(searchQuery) {
  const baseUrl = '/search';
  navigate(`${baseUrl}?search=${encodeURIComponent(searchQuery)}`);
  window.location.reload();
}


  const [showBasket, setShowBasket] = useState(false);
  const handleCloseBasket = () => setShowBasket(false);
  const handleShowBasket = () => setShowBasket(true);



  function removeBasket(id) {
    let prod = arrBasket.find(item => item.id === id);
    if (prod) {
      setCount(count - prod.quantity);
      const updatedBasket = arrBasket.filter(item => item.id !== id);
      setArrBasket(updatedBasket);
      window.sessionStorage.setItem("Basket", JSON.stringify(updatedBasket));
    }
  }
  
  
  const decrementQuantity = (id) => {
    let prod = arrBasket.find(item => item.id === id);
    if (prod && prod.quantity > 1) {
      setCount(count - 1);
  
      const updatedBasket = arrBasket.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
  
      const filteredBasket = updatedBasket.filter(item => item.quantity > 0);
  
      setArrBasket(filteredBasket);
  
      window.sessionStorage.setItem("Basket", JSON.stringify(filteredBasket));
    }
  };

  const incrementQuantity = (id) => {
    let prod = arrBasket.find(item => item.id === id);
    if (prod) {
    
      setCount(count + 1);

      
      const updatedBasket = arrBasket.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );

     
      setArrBasket(updatedBasket);

     
      window.sessionStorage.setItem("Basket", JSON.stringify(updatedBasket));
    }
  };
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


function generateSubPath(categoryId, subcategory) {
  const category = subcategory.find(x => x.id === categoryId);

  if (category) {
    return category.name.toLowerCase();
  } else {
    return 'unknown';
  }
}
function generatePath(categoryId) {
  switch (categoryId) {
    case 1:
      return 'clothes';
    case 2:
      return 'shoes';
    case 3:
      return 'accessorise';

    default:
      return 'unknown';
  }
}
function getOrder()
{
  if(arrBasket.length>0)
  {
    window.location.href='/checkout';
  }
}
     return (
     
<div>
      <div className="px-main-page">


      <Modal className="h-100 h-custom" id='basket' show={showBasket} onHide={handleCloseBasket}>
        <Modal.Header closeButton>
          <Modal.Title>Кошик</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {arrBasket.length < 1 ? (
            <p>Ваш кошик порожній </p>
          ) : (
            <>
              <MDBRow id='titleRow' className="justify-content-between align-items-center">
              <MDBCol md="1" lg="1" xl="1">
             
             </MDBCol>
             <MDBCol md="3" lg="3" xl="3">
              
             </MDBCol>
             <MDBCol md="3" lg="3" xl="3"> 
              Товар
              
             </MDBCol>
             
             <MDBCol md="2" lg="2" xl="2">
              
                Кількість
           
             </MDBCol>
             <MDBCol md="2" lg="2" xl="3">
               <MDBTypography tag="h7" className="mx-2">
              Ціна
               </MDBTypography>
             </MDBCol>
              </MDBRow>
              {arrBasket.map((x) => (
                <CartBasket
                  key={x.id}
                  selectedCurrency={selectedCurrency}
                  remove={removeBasket}
                  unic={x.id}
                  name={x.name}
                  quantity={x.quantity}
                  size={x.size}
                  picture={x.image}
                  price1={convertPrice(x.price,selectedCurrency)}
                  incrementQuantity={incrementQuantity}
                  decrementQuantity={decrementQuantity}
                ></CartBasket>
              ))}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" style={{ borderRadius: '0px' }} onClick={() => { handleCloseBasket() }}>
            Продовжити
          </Button>
          <Button variant="dark" style={{ borderRadius: '0px' }} onClick={getOrder}>
            Оформити замовлення
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
<AuthModal show={show} handleClose={handleClose}></AuthModal>
 


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
                <span class="input-group-text" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
</svg>
                </span>
                <input type="search" class="form-control" placeholder="Що будемо шукати? "    value={searchQuery} 
        onChange={handleInputChange} 
  onBlur={() => redirectToFilteredPage(searchQuery)} aria-label="Input group example" />
              </div>
            <div className="icons">
           
            <Dropdown  menuVariant="light" >
      <Dropdown.Toggle  variant="light" id="dropdown-basic"style={{ position: 'relative' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
          </svg>
      </Dropdown.Toggle>

      <Dropdown.Menu >
        <Dropdown.Item  href="/">Українська</Dropdown.Item>
        <Dropdown.Item href="/">English</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  
    <Dropdown  menuVariant="light" >
    <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ position: 'relative' }}>
  {selectedCurrency}
</Dropdown.Toggle>
<Dropdown.Menu>
  {currencies.map(currency => (
    currency !== selectedCurrency && (
      <Dropdown.Item key={currency} onClick={() => handleCurrencyChange(currency)}>
        {currency}
      </Dropdown.Item>
    )
  ))}
</Dropdown.Menu>
    </Dropdown>

    <Dropdown  menuVariant="light" >
      <Dropdown.Toggle onClick={loginbtn} variant="light" id="dropdown-basic"style={{ position: 'relative' }}>
      <svg xmlns="http://www.w3.org/2000/svg"width="25" height="25" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>
      </Dropdown.Toggle>

    </Dropdown>
    
    <Dropdown  menuVariant="dark" >
      <Dropdown.Toggle onClick={handleShowBasket} variant="light" id="dropdown-basic"style={{ position: 'relative' }}>
      <svg xmlns="http://www.w3.org/2000/svg"width="20" height="20"  fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
</svg> ({count})

      </Dropdown.Toggle>

    </Dropdown>

    {/* <Form.Select style={{marginLeft:'10px',width:'85px',height:'30px',border:'none'}}  aria-label="Default select example">
      <option selected value="UAH">UAH</option>
      <option value="EUR">EUR</option>
      <option value="USD">USD</option>
    </Form.Select> */}
               
                
            </div>
          </div>
        </div>
        </header>
         <header className="headermob" >
         <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-2">
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'sm'}`}>
                  
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
              <Form className="d-flex">

      <Form.Control
        type="search"
        value={searchQuery} 
        onChange={handleInputChange} 
        placeholder="Що будемо шукати?"
        aria-label="Search"
      />
      <Button  onClick={() => redirectToFilteredPage(searchQuery)} style={{border:'none'}} variant="outline-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style={{marginTop:-5}} fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
        </svg>
      </Button>
   
  </Form>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link active className="item-title"  href="/">    Головна</Nav.Link>
                  <div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
       ВЗУТТЯ
      </button>
    </h2>
<div
        id={`flush-collapseOne`}
        class="accordion-collapse collapse"
        aria-labelledby={`flush-headingOne`}
        data-bs-parent="#accordionFlushExample"
      >
        <div class="accordion-body">
         
            {subcategory2.map((x) => (
              <NavDropdown.Item  className="item-title" key={x.id} href={`/shoes/${x.id}`}>
              {x.name}
            </NavDropdown.Item>
            ))}
             <NavDropdown.Item  className="item-title"  href="/shoes">
    Переглянути все
  </NavDropdown.Item>
        
        </div>
      </div>
      </div>
      <div class="accordion-item">
  <h2 class="accordion-header" id="flush-headingClothes">
    <button
      class="accordion-button collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#flush-collapseClothes"
      aria-expanded="false"
      aria-controls="flush-collapseClothes"
    >
      ОДЯГ
    </button>
  </h2>
  <div
    id="flush-collapseClothes"
    class="accordion-collapse collapse"
    aria-labelledby="flush-headingClothes"
    data-bs-parent="#accordionFlushExample"
  >
    <div class="accordion-body">
      {subcategory1.map((x) => (
        <NavDropdown.Item className="item-title" key={x.id} href={`/clothes/${x.id}`}>
          {x.name}
        </NavDropdown.Item>
      ))}
         <NavDropdown.Item  className="item-title"  href="/clothes">
    Переглянути все
  </NavDropdown.Item>
    </div>
  </div>
</div>
<div class="accordion-item">
  <h2 class="accordion-header" id="flush-headingAccessorise">
    <button
      class="accordion-button collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#flush-collapseAccessorise"
      aria-expanded="false"
      aria-controls="flush-collapseAccessorise"
    >
      АКСЕСУАРИ
    </button>
  </h2>
  <div
    id="flush-collapseAccessorise"
    class="accordion-collapse collapse"
    aria-labelledby="flush-headingAccessorise"
    data-bs-parent="#accordionFlushExample"
  >
    <div class="accordion-body">
      {subcategory3.map((x) => (
        <NavDropdown.Item className="item-title" key={x.id} href={`/accessorise/${x.id}`}>
          {x.name}
        </NavDropdown.Item>
      ))}
         <NavDropdown.Item  className="item-title"  href="/accessorise">
    Переглянути все
  </NavDropdown.Item>
    </div>
  </div>
</div>
      </div>
      
                  <Nav.Link className="item-title" active  href="/faq">FAQ</Nav.Link>
                
                </Nav>
       
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <Navbar.Brand className="mx-auto" href="/">
            <img
              className="logo-icon"
              loading="eager"
              alt=""
              src={require('../assets/logo@2x.png')}
            />
</Navbar.Brand>
<div className="d-flex">

            <NavDropdown
             drop="up"
            style={{marginRight:'5px'}}
              id="nav-dropdown-dark-example"
              title={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
              <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
            </svg>}
              menuVariant="dark"
              
            >
             
              <NavDropdown.Item  href="/">Українська</NavDropdown.Item>
              <NavDropdown.Item href="/">English</NavDropdown.Item>
            </NavDropdown>
            
          
         
            <NavDropdown
            drop="up"
             style={{marginRight:'5px'}}
              id="nav-dropdown-dark-example"
              title={selectedCurrency}
              menuVariant="dark"
            >
              {currencies.map(currency => (
    currency !== selectedCurrency && (
      <NavDropdown.Item key={currency} onClick={() => handleCurrencyChange(currency)}>
        {currency}
      </NavDropdown.Item>
    )
  ))}
            </NavDropdown>
            
          

  <Nav.Link onClick={loginbtn} className="me-2"><svg xmlns="http://www.w3.org/2000/svg"width="20" height="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg></Nav.Link>
  <Nav.Link href="#action1"  className="me-2"> <div
                onClick={handleShowBasket}
               >
                <svg xmlns="http://www.w3.org/2000/svg"width="16" height="16"  fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
</svg> 

               </div>
              </Nav.Link>
              <Nav.Link href="#action1"  className="me-1"> <div style={{fontSize:10}}>({count})</div>
              </Nav.Link>
            
</div>
                  
          </Container>
        </Navbar>
     
        </header>
     
        </section>
      </div>
      </div>
  );
};

export default PxMainPage;
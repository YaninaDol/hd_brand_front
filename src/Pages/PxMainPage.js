import { useEffect,useState } from "react";
import CartBasket from '../Components/CartBasket';
// import "./PxMainPage.css";
import "./HeaderStyle.css"
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import {
  MDBPagination, MDBPaginationItem, MDBPaginationLink,
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBTypography,
  MDBBtn,
  MDBCard,
  MDBRange ,
  MDBCardBody,
  MDBCardImage
} from 'mdb-react-ui-kit';
const PxMainPage = () => {
  const [arrBasket,setArrBasket] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [count, setCount] = useState(parseInt(window.sessionStorage.getItem("cartItemCount")) || 0);
  const [total,setTotal] = useState(0);
  const [payamount,setPayAmount] = useState(0);
  const [show, setShow] = useState(false);
  const [delivery,setDelivery] = useState("");
  const [userId,setUserId] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
      setTotal(total - prod['price']);

      setPayAmount(payamount-prod['price']);
      window.sessionStorage.setItem("cartItemCount", count);
  
    }
  }
  function savechange()
  {
  
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
        
              <MDBTypography tag="h5" className="text-uppercase mb-3">
                Доставка:
              </MDBTypography>

              <div className="mb-4 pb-2">
                <select className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setDelivery((e.target.value) )}>
                  <option value="Нова Пошта">Нова Пошта </option>
                  <option value="Укр Пошта">Укр Пошта</option>
                  
                </select>
              </div>
              <MDBTypography tag="h5" className="text-uppercase mb-3">
                Спосіб оплати:
              </MDBTypography>

              <div className="mb-4 pb-2">
                <select className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setPayAmount(parseInt(e.target.value) )}>
                  <option value={total}>Повна </option>
                  <option value="200">Часткова (200грн)</option>
                  
                </select>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <MDBTypography tag="h5" className="text-uppercase">
                  До сплати: 
                </MDBTypography>
                <MDBTypography tag="h5">{payamount} &#8372;</MDBTypography>
              </div>

              <MDBCardBody>
            <p>
              <strong>Ми приймаємо</strong>
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
        
        </Modal.Body>
        <Modal.Footer>
        <Button  variant="dark"  onClick={savechange}>
            Сплатити
          </Button>
          <Button variant="outline-secondary" onClick={handleCloseBasket}>
            Продовжити
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
              <div className="menu-navigation-button-contain3">
              <Link to='/careshoes'>       <div className="button-nav3">догляд за взуттям</div></Link>
              </div>
              <div className="menu-navigation-button-contain4">
              <Link to='/shoes'>  <div className="button-nav4">знижки</div></Link>
              </div>
              <div className="menu-navigation-button-contain5">
              <Link to='/faq'>   <div className="button-nav5">FAQ</div></Link>
              </div>
            </div>
          </div>
          <div className="search-field-icons">
           
              <img
                className="icon-search"
                loading="eager"
                alt=""
                src={require('../assets/search.png')}
              />
             <input placeholder="Що будемо шукати?"  type="search"  className="search-field">
            </input>
            <div className="icons">
           

            <div className="language-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
          </svg>
          </div>
            
      {/* <Dropdown>
        <Dropdown.Toggle variant="outline" id="dropdown-basic">
        <div className="language-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
          </svg>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action1">Українська</Dropdown.Item>
          <Dropdown.Item href="#/action2">English</Dropdown.Item>
          <Dropdown.Item href="#/action3">Русский</Dropdown.Item>
        
        </Dropdown.Menu>
      </Dropdown>
    */}
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
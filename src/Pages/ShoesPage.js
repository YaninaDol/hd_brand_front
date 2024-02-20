
import React from 'react';
import PxMainPage from './PxMainPage';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Footer from '../Components/Footer';
import DropdownFrame from "../Components/DropdownFrame";
import { useState } from "react";
import { useEffect } from "react";
import CartBasket from '../Components/CartBasket';
import './Apple.css';
import axios from 'axios';
import { Link, Outlet } from "react-router-dom";
import Cart from "../Components/Cart";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import { Pagination } from 'react-bootstrap';
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


const ShoesPage = () => {
  
  const [mas,setMas] = useState([]);
  const [popular,setPopular] = useState([]);
  const [arrBasket,setArrBasket] = useState([]);
  const [findproducts,setFindProducts] = useState([]);
  const [f,setF] = useState(0);
  const [show, setShow] = useState(false);
  const [inputSearch, setInputSearch] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(true);
  const [h1,setH1] = useState('Apple products');
  const [count,setCount] = useState(0);
  const [newProd,setNewProd] = useState(new Object());
  const [userId,setUserId] = useState("");
  const [showM, setShowM] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [total,setTotal] = useState(0);
  const [masCategories,setMasCategories]=useState([]);
  const [range,setRange]=useState(0);
  const [chooseCategory,setChooseCategory] = useState(0);

const handleCloseM = () => setShowM(false);
const handleShowM = () => setShowM(true);

const [itemsPerPage,setItemsPerPage]=useState(6);



const totalItems = Math.ceil(mas.length / itemsPerPage);

const [active, setActive] = useState(1);



  const handleClick = (number) => {
    setActive(number);
    
  };


  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalItems; i++) {
      pageNumbers.push(
        <MDBPaginationItem key={i} active={i === active} onClick={() => handleClick(i)}>
          <span className="page-link">{i}</span>
        </MDBPaginationItem>
      );
    }
    return pageNumbers;
  };
  



 useEffect(()=>

{
 
  
// if(f==0)
//  {         
//   setUserId(window.sessionStorage.getItem("UserId"));
//    setIsLogin(true);

//           axios (

                  
//               {
//                   method:'get',
//                   url:'https://localhost:7211/api/Product/GetByCategory?ID=5',
                 
//                   headers: {
//                      'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
//                   },
//               }



//                 ).then  (res=>
//                     {
//                         console.log(res.data);
//                         setPopular(res.data);
//                         setMas(res.data);
//                         setF(1);
//                         setLoading(false);
//                     });

                  

//                   axios (

//                       {
//                       method:'get',
//                       url:'https://localhost:7211/api/Category/GetAll',
//                       headers: {
//                               'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
//                       },

//                       }



//               ).then  (res=>
//                   {
//                       console.log(res.data);
//                       setMasCategories(res.data.value);
//                       setF(1);
                     
//                   });



//  }
 
}




 )
 const indexOfLastItem = active * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentItems = mas.slice(indexOfFirstItem, indexOfLastItem);

function savechange()
{

for (const iterator of arrBasket) 
{
var bodyFormData = new FormData();
bodyFormData.append('prodID', iterator.id);
bodyFormData.append('userID', userId);
            axios (

              {
              method:'post',
              url:'https://localhost:7211/api/Product/Buy',
              data:bodyFormData,
              headers: {
                'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
                      'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
              },
             
              }



          ).then  (res=>
          {
            alert("Your order is accepted")
              console.log(res.data);
             
          });  
}
handleClose();
window.location.reload();


}
function addBasket()
{

setCount(count+1);
let Copy = [...arrBasket];
Copy.push(newProd);
setArrBasket(Copy);
console.log(arrBasket);
window.sessionStorage.setItem("Basket", arrBasket);
setTotal(total+newProd['price']);
handleCloseM();



}

function removeBasket(id)
{
let prod= arrBasket.find(item=>item.id == id);
setTotal(total-prod['price']);
  setArrBasket(arrBasket.filter(item => item.id !== id));
  setCount(count-1);

}

 
function getSearch()
    {
              setH1("");
              let Copy = [...findproducts];

              for (const iterator of popular) 
              {
              let name=iterator['model'];
                if(name.includes(inputSearch))
                {
                  Copy.push(iterator);
                  
                }
              }
            
              if(inputSearch!="")
            { setMas(Copy); }
            else
            {
              setMas(popular);
              setH1("Apple products");
            }

    }

function AddBtn(id)
        {
         
         if(isLogin==true)
          {
            setNewProd(popular.find(item => item.id == id));
          handleShowM();
          }
          else{alert("You are not loggin!")};
         
        }

function find()
{

 

  if(chooseCategory!=0 )
  {
      let config = {
          headers: {'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")},
          params: {
              categoryId:chooseCategory,from:0,to:range
          },
        }
        
     

const res = axios.get('https://localhost:7211/api/Product/GetFindApple',config );
console.log("resapi"+res.then((result)=>{console.log("find"+result.data);setMas(result.data)}));

          
  }

  else {
      setMas(popular);
      
      alert("Please, choose category")};


}

  return (
    <div >
      <Modal show={showM} onHide={handleCloseM}>
        <Modal.Header closeButton>
          <Modal.Title>Basket</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want add to Basket?</Modal.Body>
        <Modal.Footer>
        <Button variant="outline-success" onClick={addBasket}>
            Add
          </Button>
          <Button variant="secondary" onClick={handleCloseM}>
            Close
          </Button>
        
        </Modal.Footer>
      </Modal>
    

<Modal id='basket' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Basket</Modal.Title>
        </Modal.Header>
        <Modal.Body> {
        arrBasket.map(
            (x)=><CartBasket remove={removeBasket}  unic={x.id} name={x.name} model={x.model} picture={x.image} price={x.price} ></CartBasket>
        )
        }
        
              <MDBTypography tag="h5" className="text-uppercase mb-3">
                Shipping:
              </MDBTypography>

              <div className="mb-4 pb-2">
                <select className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setTotal(total+parseInt(e.target.value) )}>
                  <option value="50">Standard-Delivery - 50 &#8372;</option>
                  <option value="100">Express-Delivery - 100 &#8372;</option>
                  
                </select>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <MDBTypography tag="h5" className="text-uppercase">
                  Summary: 
                </MDBTypography>
                <MDBTypography tag="h5">{total} &#8372;</MDBTypography>
              </div>

              <MDBCardBody>
            <p>
              <strong>We accept</strong>
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
        <Button  variant="outline-success"  onClick={savechange}>
            Checkout 
          </Button>
          <Button variant="dark" onClick={handleClose}>
            Continue shopping
          </Button>
         
        </Modal.Footer>
      </Modal>
    

   <PxMainPage />
   


   <div>
 
   <div className="stock-status">
            <div className="div33">Головна </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
            <div className="div34">Взуття</div>
          
          </div>
          {/* <h2 className="h23">женская обувь</h2> */}
          <div className="color-picker">
            
              <div className="materials-list">
                <div >Сортувати:</div>
              </div>
              <div className="materials-list1">
              
                <DropdownButton variant='outline light' id="dropdown-basic-button" size="sm" title="По ціні">
      <Dropdown.Item href="#/action-1">Від дешевих до дорогих</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Від дорогих до дешевих</Dropdown.Item>
    
    </DropdownButton>
              </div>
            
          </div>
{/* <select  style={{marginLeft:800,marginTop:50}} className="select p-2 rounded bg-grey"  onChange={({ target: { value } }) => setItemsPerPage(value)} >
                      <option value='10'>Choose count of page</option>
                    <option  value='4'> 4</option>
                    <option  value='6'>6</option>
                    <option  value='8'>8</option>
                    <option  value='10'>10</option>
                    </select> */}
</div>
<section className="h-100 h-custom" >

  <MDBContainer className="py-5 h-100">
 
 
    <MDBRow className="justify-content-left align-items-left h-100">
      
   
                    <div className="div37">Фільтри</div>
              
      <MDBCol lg="3" className="bg-grey" >
      
                <div style={{backgroundColor:'rgb(247, 247, 247)'}}  className="p-2">
                <div className="div53">Ціна</div>
                <MDBRange
               onChange={(e)=>setRange(e.target.value)}
      defaultValue='0'
      min='0'
      max='100000'
      step='50'
      id='customRange3'
     
    />
         <hr className="my-4" />
  <div className="dropdown-frame1" />
                      <div className="text-components2">
                        <div className="div53">Сезон</div>
                        <div className="footer-container">
                          <div className="season-slider">
                            <div className="spring-summer-autumn">
                              <input
                                className="rectangle-frame1"
                                type="checkbox"
                              />
                              <input
                                className="rectangle-frame2"
                                type="checkbox"
                              />
                              <input
                                className="rectangle-frame3"
                                type="checkbox"
                              />
                                <input
                                className="rectangle-frame3"
                                type="checkbox"
                              />
                            </div>
                            <div className="div54">
                              <p className="p1">Весна</p>
                              <p className="p1">Осінь</p>
                              <p className="p2">Зима</p>
                              <p className="p3">Літо</p>
                            </div>
                          </div>
                        </div>
                      </div>

                  <hr className="my-4" />
                  <div className="line-frame1">
                        <div className="apply-button" />
                        <div className="tovares-group">
                          <div className="div55">Колір</div>
                          <div className="u-a-h-component">
                            <div className="frame-instance">
                              <div className="rectangle-parent">
                                <div className="rectangle">
                                  <div className="similarto-spring-summer-autumn">
                                    <div className="similarto-spring-summer-autumn1" />
                                    
                                    <input
                                      className="similarto-spring-summer-autumn3"
                                      type="checkbox"
                                    />
                                    <div className="similarto-spring-summer-autumn4" />
                                    <div className="similarto-spring-summer-autumn5" />
                                    <div className="similarto-spring-summer-autumn6" />
                                    <div className="similarto-spring-summer-autumn7" />
                                  </div>
                                  <div className="div56">
                                    <p className="p4">Чорний</p>
                                    <p className="p5">Білий</p>
                                    <p className="p6">Молочний</p>
                                    <p className="p8">Мокко</p>
                                    <p className="p9">Карамельний</p>
                                    <p className="p10">Хакі</p>
                                  </div>
                                </div>
                                <div className="div57">Показать еще</div>
                              </div>
                              <div className="similarto-spring-summer-autumn8">
                                <div className="div58" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                      <DropdownFrame
                        prop="Матеріал підкладу"
                        prop1="Байка"
                        prop2="Натуральна овчина"
                      />
 <hr className="my-4" />
 <DropdownFrame
                        prop="Матеріал верху"
                        prop1="Замша"
                        prop2="Комбі"
                        propPadding="0px var(--padding-lgi)"
                      />
                      <hr className="my-4" />
                      <div className="icons-payment-systems">
                        <div className="div59">применить <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
  <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg> </div>
                       
                      </div>
                   
                </div>
                
              </MDBCol>

              <MDBCol className="containerCart">
             
        {
        currentItems.map(
            (x)=><Cart add={AddBtn} key={x.id} unic={x.id} name={x.name} model={x.model} picture={x.image} price={x.price} category={x.categoryId}></Cart>
        
          )
         
        
        }
         <Cart unic='125' name='Замшеві ботинки на платформі' model="весна" picture={require('../assets/newimage.png')} price="2900" category="1"></Cart>
         <Cart unic='125' name='Замшеві ботинки на платформі' model="весна" picture={require('../assets/newimage.png')} price="2900" category="1"></Cart>
         <Cart unic='125' name='Замшеві ботинки на платформі' model="весна" picture={require('../assets/newimage.png')} price="2900" category="1"></Cart>
         <Cart unic='125' name='Замшеві ботинки на платформі' model="весна" picture={require('../assets/newimage.png')} price="2900" category="1"></Cart>
         <Cart unic='125' name='Замшеві ботинки на платформі' model="весна" picture={require('../assets/newimage.png')} price="2900" category="1"></Cart>
         <Cart unic='125' name='Замшеві ботинки на платформі' model="весна" picture={require('../assets/newimage.png')} price="2900" category="1"></Cart>
         <Cart unic='125' name='Замшеві ботинки на платформі' model="весна" picture={require('../assets/newimage.png')} price="2900" category="1"></Cart>
         <Cart unic='125' name='Замшеві ботинки на платформі' model="весна" picture={require('../assets/newimage.png')} price="2900" category="1"></Cart>
         <Cart unic='125' name='Замшеві ботинки на платформі' model="весна" picture={require('../assets/newimage.png')} price="2900" category="1"></Cart>
         <Cart unic='125' name='Замшеві ботинки на платформі' model="весна" picture={require('../assets/newimage.png')} price="2900" category="1"></Cart>
         <Cart unic='125' name='Замшеві ботинки на платформі' model="весна" picture={require('../assets/newimage.png')} price="2900" category="1"></Cart>
     
        </MDBCol>
        
      
<Button style={{borderRadius:'0px'}} variant="outline-dark">Показати ще товари </Button>
    </MDBRow>

   
  </MDBContainer>
</section>


    <Footer />
    </div>
  );
};

export default ShoesPage;


import React from 'react';
import PxMainPage from './PxMainPage';
import Footer from '../Components/Footer';
import { useState } from "react";
import { useEffect } from "react";

import axios from 'axios';
import { connect,useDispatch,useSelector } from 'react-redux';
import { Link, Outlet } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setProducts} from '../redux/actions';

import ContentPage from './ContentPage.js';


const ShoesPage = () => {
  const [types,setTypes] = useState([]);
  const [materials,setMaterials] = useState([]);
  
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
  const [count, setCount] = useState(parseInt(window.sessionStorage.getItem("cartItemCount")) || 0);
  const [newProd,setNewProd] = useState(new Object());
  const [userId,setUserId] = useState("");
  const [showM, setShowM] = useState(false);
  const [total,setTotal] = useState(0);
  const [range,setRange]=useState(0);
  const [chooseCategory,setChooseCategory] = useState(0);
  const [allproducts,setAllProducts] = useState([]);
const handleCloseM = () => setShowM(false);
const handleShowM = () => setShowM(true);

const dispatch = useDispatch();
const products = useSelector(state => state.products);

 useEffect(()=>

{
 
  axios.get('https://localhost:7269/api/Product/GetProductsByCategory?id=2')
  .then(response => {
    console.log(response.data)
    dispatch(setProducts(response.data))
    setAllProducts(products.filter(item => item.categoryid == 2));
  })
  .catch(error => console.error('Error fetching products:', error));



  axios.get('https://localhost:7269/api/Specification/GetSubCategoryNamesByCategoryId?id=2')
  .then(response => {
    console.log(response.data)
    setTypes(response.data)
  })
  .catch(error => console.error('Error fetching products:', error));



  axios.get('https://localhost:7269/api/Specification/MaterialNamesByCategoryId?id=2')
  .then(response => {
    console.log(response.data)
    setMaterials(response.data)
  })
  .catch(error => console.error('Error fetching products:', error));

  const storedBasket = window.sessionStorage.getItem("Basket");
  if (storedBasket) {
    const parsedBasketData = JSON.parse(storedBasket);
    setArrBasket(parsedBasketData);
    setCount(parsedBasketData.length);
    const totalSum = parsedBasketData.reduce((sum, item) => sum + item.salePrice, 0);//
    setTotal(totalSum);
   }

}, [dispatch]);



function addBasket() {
  setCount((prevCount) => {
    const newCount = prevCount + 1;
    window.sessionStorage.setItem("cartItemCount", newCount);
    return newCount;
  });

  let copy = [...arrBasket];
  copy.push(newProd);
  setArrBasket(copy);

  
  window.sessionStorage.setItem("Basket", JSON.stringify(copy));

  setTotal(total + newProd['salePrice']);//
  handleCloseM();
  window.location.reload();
};


 
function getSearch()
    {
            
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
            
            }

    }

function AddBtn(id)
        {
         
         
            setNewProd(products.find(item => item.id == id));
          handleShowM();
          
         
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
          <Modal.Title>Придбати товар</Modal.Title>
        </Modal.Header>
        <Modal.Body>Додати товар до кошику ?</Modal.Body>
        <Modal.Footer>
        <Button variant="outline-secondary" onClick={addBasket}>
            Так
          </Button>
          <Button variant="dark" onClick={handleCloseM}>
            Ні
          </Button>
        
        </Modal.Footer>
      </Modal>

   <PxMainPage />

   <div>

</div>

<ContentPage items={products} link='shoes' materials={materials} types={types} page='взуття' AddBtn={AddBtn}></ContentPage>


    <Footer />
    </div>
  );
};

export default ShoesPage;

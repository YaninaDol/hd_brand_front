
import React from 'react';
import PxMainPage from './PxMainPage.js';
import Footer from '../Components/Footer.js';
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { connect,useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ContentPage from './ContentPage.js';


const CategoryPage = () => {
  const [types,setTypes] = useState([]);
  const [materials,setMaterials] = useState([]);
  const [popular,setPopular] = useState([]);
  const [arrBasket,setArrBasket] = useState([]);
 

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState( 0);
  
  const [userId,setUserId] = useState("");
  const [showM, setShowM] = useState(false);
  const [total,setTotal] = useState(0);
  const [range,setRange]=useState(0);
  const [allproducts,setAllProducts] = useState([]);
const handleCloseM = () => setShowM(false);
const handleShowM = () => setShowM(true);

const dispatch = useDispatch();
const products = useSelector(state => state.products);
const {categoryName } = useParams();

function generatePath(categoryName) {
  switch (categoryName) {
    case 'clothes':
      return 1;
    case'shoes':
      return 2;
    case 'accessorise':
      return 3;

    default:
      return 'unknown';
  }
}



 useEffect(()=>

{
 
  axios.get(`https://localhost:7269/api/Product/GetProductsByCategory?id=${generatePath(categoryName)}`)
  .then(response => {
    setAllProducts(response.data);
  })
  .catch(error => console.error('Error fetching products:', error));



  axios.get(`https://localhost:7269/api/Specification/GetSubCategoryNamesByCategoryId?id=${generatePath(categoryName)}`)
  .then(response => {
  
    setTypes(response.data)
  })
  .catch(error => console.error('Error fetching products:', error));



  axios.get(`https://localhost:7269/api/Specification/MaterialNamesByCategoryId?id=${generatePath(categoryName)}`)
  .then(response => {
   
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

}, [dispatch,categoryName,allproducts]);

  return (
    <div >
    

   <PxMainPage />

   <div>

</div>

<ContentPage items={allproducts} link='shoes' materials={materials} types={types} page='Взуття' ></ContentPage>


    <Footer />
    </div>
  );
};

export default CategoryPage;
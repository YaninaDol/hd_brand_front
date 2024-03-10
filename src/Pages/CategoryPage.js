
import React from 'react';
import PxMainPage from './PxMainPage.js';
import Footer from '../Components/Footer.js';
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { connect,useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ContentPage from './ContentPage.js';
import { setProducts } from '../redux/actions.js';


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

function generatePathName(categoryName) {
  switch (categoryName) {
    case 'clothes':
      return 'Одяг';
    case'shoes':
      return 'Взуття';
    case 'accessorise':
      return 'Аксесуари';

    default:
      return 'unknown';
  }
}


 useEffect(()=>

{
 

  
  axios.get(`https://localhost:7269/api/Product/GetProductsByCategory?id=${generatePath(categoryName)}`)
  .then(response => {
  console.log(response.data);
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
  fetchExchangeRates();

  const savedCurrency =  window.sessionStorage.getItem('selectedCurrency');


if (savedCurrency) {
  setSelectedCurrency(savedCurrency);
}
 

}, [dispatch,categoryName,allproducts]);
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
  return (
    <div >
    

   <PxMainPage convertPrice={convertPrice} selectedCurrency={selectedCurrency} handleCurrencyChange={handleCurrencyChange} />

   <div>

</div>

<ContentPage selectedCurrency={selectedCurrency} convertPrice={convertPrice} items={allproducts} link={categoryName} materials={materials} types={types} page={generatePathName(categoryName)} ></ContentPage>


    <Footer />
    </div>
  );
};

export default CategoryPage;

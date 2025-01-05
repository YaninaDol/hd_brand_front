
import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  
  const [showM, setShowM] = useState(false);
  const [allproducts,setAllProducts] = useState([]);

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
      case 'sale':
        return 4;
      case 'instock':
          return 5;
    default:
      return 'unknown';
  }
}

function generatePathName(categoryName) {
  switch (categoryName) {
    case 'clothes':
      return t('clothes');
    case'shoes':
      return t('shoes');
    case 'accessorise':
      return t('accessorise');
      case 'sale':
        return t('sale');
      case 'instock':
          return t('instock');
    default:
      return 'unknown';
  }
}


 useEffect(()=>
{
 

  
  axios.get(`${API_BASE_URL}/api/Product/GetProductsByCategory?id=${generatePath(categoryName)}`)
  .then(response => {
   
    setAllProducts(response.data);
  })
  .catch(error => console.error('Error fetching products:', error));



  axios.get(`${API_BASE_URL}/api/Specification/GetSubCategoryNamesByCategoryId?id=${generatePath(categoryName)}`)
  .then(response => {
  
    setTypes(response.data)
  })
  .catch(error => console.error('Error fetching products:', error));



  axios.get(`${API_BASE_URL}/api/Specification/MaterialNamesByCategoryId?id=${generatePath(categoryName)}`)
  .then(response => {
   
    setMaterials(response.data)
  })
  .catch(error => console.error('Error fetching products:', error));
  fetchExchangeRates();

  const savedCurrency =  window.sessionStorage.getItem('selectedCurrency');


if (savedCurrency) {
  setSelectedCurrency(savedCurrency);
}
 

}, [dispatch,categoryName,products]);
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
    

    <div style={{ position: 'fixed', width: '100%', zIndex: '1000', top: '0' }}>
  <PxMainPage convertPrice={convertPrice} selectedCurrency={selectedCurrency} handleCurrencyChange={handleCurrencyChange} />
</div>

   <div style={{marginTop:'150px'}}>
   <ContentPage selectedCurrency={selectedCurrency} convertPrice={convertPrice} items={allproducts} link={categoryName} materials={materials} types={types} page={generatePathName(categoryName)} ></ContentPage>

</div>



    <Footer />
    </div>
  );
};

export default CategoryPage;

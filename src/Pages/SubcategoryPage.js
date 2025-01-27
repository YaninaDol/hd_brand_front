
import React from 'react';
import PxMainPage from './PxMainPage';
import Footer from '../Components/Footer';
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { connect,useDispatch,useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { setSubCategory} from '../redux/actions';
import { useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import ContentPageSubCat from './ContentPageSubCat';
const SubcategoryPage = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { categoryName, subcategoryid } = useParams();
    const [materials,setMaterials] = useState([]);
    const [items,setItems] = useState([]);
  const dispatch = useDispatch();
  const subcategory = useSelector(state => state.subcategory);
  const category = useSelector(state => state.category);
  const material = useSelector(state => state.material);
  const season = useSelector(state => state.season);
  const {i18n, t } = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useState('UAH');
  const [exchangeRates, setExchangeRates] = useState({
    usd: 1, 
    eur: 1,
  });
 
  const handleCurrencyChange = (selectedCurrency) => {
    setSelectedCurrency((prevCurrency) => {
     
      const newCurrency = selectedCurrency;
  
     
      window.sessionStorage.setItem('selectedCurrency', selectedCurrency);
      window.localStorage.setItem('selectedCurrency', selectedCurrency);
      return newCurrency;
    });
  };


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
  function generatePathName(categoryName) {
    switch (categoryName) {
      case 'clothes':
        return t('clothes');
      case'shoes':
        return t('shoes');
      case 'accessorise':
        return t('accessorise');
  
      default:
        return 'unknown';
    }
  }


  function generateId(categoryName) {
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
  
    axios.get(`${API_BASE_URL}/api/Specification/GetSubCategoryRepById?id=${subcategoryid}`)
    .then(response => {
      dispatch(setSubCategory(response.data.value));
    })
    .catch(error => console.error('Error fetching products:', error));

    axios.get(`${API_BASE_URL}/api/Product/GetProductsBySubcategory?id=${subcategoryid}`)
    .then(response => {
    
     setItems(response.data);
    
    })
    .catch(error => console.error('Error fetching products:', error));
    axios.get(`${API_BASE_URL}/api/Specification/MaterialNamesByCategoryId?id=${generateId(categoryName)}`)
  .then(response => {
   
    setMaterials(response.data)

    fetchExchangeRates();

    const savedCurrency =  window.localStorage.getItem('selectedCurrency');


  if (savedCurrency) {
    setSelectedCurrency(savedCurrency);
  }
  })
  .catch(error => console.error('Error fetching products:', error));
  
  }, [categoryName, subcategoryid, dispatch]);



//   if (!subcategory) {
//     return <div>Loading...</div>;
//   }
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
    <div style={{ margin: '0', padding: '0', overflowX: 'hidden' }}>
     
      <div style={{ position: 'fixed', width: '100%', zIndex: '1000', top: '0' }}>
  <PxMainPage convertPrice={convertPrice} selectedCurrency={selectedCurrency} handleCurrencyChange={handleCurrencyChange} />
</div>
   <div className="stock-status" style={{marginTop:'150px'}}>
      <Link to="/"><div className="div33">{t('home')} </div></Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>

<NavLink  to={`/${categoryName}`}>{generatePathName(categoryName)}</NavLink>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
{i18n.language === 'en' ? subcategory.nameEng : subcategory.name}
</div>
 
<ContentPageSubCat selectedCurrency={selectedCurrency} convertPrice={convertPrice} items={items} link={generatePathName(categoryName)} materials={materials}  page={i18n.language === 'en' ? subcategory.nameEng : subcategory.name} ></ContentPageSubCat>





    <Footer />
    </div>
  );
};

export default SubcategoryPage;

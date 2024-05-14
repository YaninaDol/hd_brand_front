import React, { useEffect, useState } from 'react';
import { connect,useDispatch,useSelector } from 'react-redux';
import { setProducts, setUsers, addProduct, deleteUser,setSizes,setProductSizes,deleteProduct,setCategories,editProduct,setMaterials,setSeasons,setSubCategories, addSubCategory } from '../redux/actions';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import PxMainPage from './PxMainPage';
import ContentPage from './ContentPage';
import Footer from '../Components/Footer';
import { API_BASE_URL} from '../config';
const FilteredProductsPage = () => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const subcategories = useSelector(state => state.subcategories);
  const materials = useSelector(state => state.materials);
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const [contents,setContents] = useState([]);
  const [allmaterials,setAllMAterials] = useState([]);
  const [allsubcategories,seAllSubcategories] = useState([]);
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

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('search') || '';
  setSearchQuery(query);

    axios.get(`${API_BASE_URL}/api/Product/GetProducts`)
      .then(response => {
    
       
        setContents(response.data)
      })
      .catch(error => console.error('Error fetching products:', error));


      axios.get(`${API_BASE_URL}/api/Specification/GetAllMaterials`)
      .then(response => {
      
      
        setAllMAterials(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));

      axios.get(`${API_BASE_URL}/api/Specification/GetAllSubCategories`)
      .then(response => {
      
      
        seAllSubcategories(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
      fetchExchangeRates();

      const savedCurrency =  window.sessionStorage.getItem('selectedCurrency');

 
    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
    }

  },[dispatch]);


  const filterProductsBySearchQuery = (query, contents) => {
    const filteredProducts = contents.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  
  
    if (filteredProducts.length === 0) {
      return contents;
    }
  
    return filteredProducts;
  };

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

  const filteredProducts = filterProductsBySearchQuery(searchQuery, contents);

  return (
    <div>
  <div style={{ position: 'fixed', width: '100%', zIndex: '1000', top: '0' }}>
  <PxMainPage convertPrice={convertPrice} selectedCurrency={selectedCurrency} handleCurrencyChange={handleCurrencyChange} />
</div>
    
      <div style={{marginTop:'150px'}}>
      <ContentPage selectedCurrency={selectedCurrency} convertPrice={convertPrice} items={filteredProducts} link='search' materials={allmaterials} types={allsubcategories} page='Пошук' ></ContentPage>


<Footer />
      </div>
    </div>
  );
};

export default FilteredProductsPage;

import React, { useEffect, useState } from 'react';
import { connect,useDispatch,useSelector } from 'react-redux';
import { setProducts, setUsers, addProduct, deleteUser,setSizes,setProductSizes,deleteProduct,setCategories,editProduct,setMaterials,setSeasons,setSubCategories, addSubCategory } from '../redux/actions';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import PxMainPage from './PxMainPage';
import ContentPage from './ContentPage';
import Footer from '../Components/Footer';
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

    axios.get('https://localhost:7269/api/Product/GetProducts')
      .then(response => {
    
       
        setContents(response.data)
      })
      .catch(error => console.error('Error fetching products:', error));


      axios.get('https://localhost:7269/api/Specification/GetAllMaterials')
      .then(response => {
        console.log(response.data)
      
        setAllMAterials(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));

      axios.get('https://localhost:7269/api/Specification/GetAllSubCategories')
      .then(response => {
        console.log(response.data)
      
        seAllSubcategories(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
      fetchExchangeRates();

      const savedCurrency =  window.sessionStorage.getItem('selectedCurrency');

 
    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
    }

  },[dispatch,allmaterials,allsubcategories]);


  const filterProductsBySearchQuery = (query, contents) => {
    return contents.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
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

<PxMainPage convertPrice={convertPrice} selectedCurrency={selectedCurrency} handleCurrencyChange={handleCurrencyChange} />
    
      <div>
      <ContentPage selectedCurrency={selectedCurrency} convertPrice={convertPrice} items={filteredProducts} link='search' materials={allmaterials} types={allsubcategories} page='Пошук' ></ContentPage>


<Footer />
      </div>
    </div>
  );
};

export default FilteredProductsPage;

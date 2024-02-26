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
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('search') || '';
  setSearchQuery(query);

    axios.get('https://localhost:7269/api/Product/GetProducts')
      .then(response => {
        console.log(response.data)
        dispatch(setProducts(response.data))
      })
      .catch(error => console.error('Error fetching products:', error));


      axios.get('https://localhost:7269/api/Specification/GetAllMaterials')
      .then(response => {
        console.log(response.data)
        dispatch(setMaterials(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));
      axios.get('https://localhost:7269/api/Specification/GetAllSubCategories')
      .then(response => {
        console.log(response.data)
        dispatch(setSubCategories(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));


  },[dispatch]);


  const filterProductsBySearchQuery = (query, products) => {
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  };


  const filteredProducts = filterProductsBySearchQuery(searchQuery, products);

  return (
    <div>

   <PxMainPage></PxMainPage>
    
      <div>
      <ContentPage items={filteredProducts} link='search' materials={materials} types={subcategories} page='Пошук' ></ContentPage>


<Footer />
      </div>
    </div>
  );
};

export default FilteredProductsPage;

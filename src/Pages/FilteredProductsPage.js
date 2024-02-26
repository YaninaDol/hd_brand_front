import React, { useEffect, useState } from 'react';
import { connect,useDispatch,useSelector } from 'react-redux';
import { setProducts, setUsers, addProduct, deleteUser,setSizes,setProductSizes,deleteProduct,setCategories,editProduct,setMaterials,setSeasons,setSubCategories, addSubCategory } from '../redux/actions';
import axios from 'axios';
const FilteredProductsPage = () => {
  
  const [searchQuery, setSearchQuery] = useState('');

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
  }, []);


  const filterProductsBySearchQuery = (query, products) => {
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  };


  const filteredProducts = filterProductsBySearchQuery(searchQuery, products);

  return (
    <div>
      <h1>Filtered Products</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
      />

    
      <div>
        {filteredProducts.map(product => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    </div>
  );
};

export default FilteredProductsPage;

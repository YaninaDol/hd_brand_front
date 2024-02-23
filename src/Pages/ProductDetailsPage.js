
import React from 'react';
import PxMainPage from './PxMainPage';
import Footer from '../Components/Footer';
import { useState } from "react";
import { useEffect } from "react";
import {setProductSizes } from '../redux/actions';
import axios from 'axios';
import { connect,useDispatch,useSelector } from 'react-redux';
import { Link, Outlet } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setProducts,setProduct,setCategory,setSeason,setMaterial,setSubCategory} from '../redux/actions';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
    const [total,setTotal] = useState(0);
    const { id, subcategoryid } = useParams();
  const dispatch = useDispatch();
  const productsizes = useSelector(state => state.productsizes);
  const product = useSelector(state => state.product);
  const subcategory = useSelector(state => state.subcategory);
  const category = useSelector(state => state.category);
  const material = useSelector(state => state.material);
  const season = useSelector(state => state.season);
  const [arrBasket,setArrBasket] = useState([]);
  const [count, setCount] = useState(parseInt(window.sessionStorage.getItem("cartItemCount")) || 0);
  useEffect(()=>

  {
   
    axios.get(`https://localhost:7269/api/Specification/GetSubCategoryRepById?id=${subcategoryid}`)
    .then(response => {
    
     
    
     dispatch(setSubCategory(response.data.value))
      console.log(response.data.value);
    })
    .catch(error => console.error('Error fetching products:', error));
  
  
  
    axios.get(`https://localhost:7269/api/Product/GetSizeofProduct?id=${id}`)
    .then(response => {
   
      dispatch(setProductSizes(response.data));
      console.log(response.data);
    })
    .catch(error => console.error('Error fetching products:', error));
  
   
  
    axios.get(`https://localhost:7269/api/Product/GetProductById?id=${id}`)
    .then(response => {
      
        dispatch(setProduct(response.data.value))
      console.log(response.data.value);
      axios.get(`https://localhost:7269/api/Specification/GetCategoryById?id=${response.data.value.categoryid}`)
      .then(response => {
     
        dispatch(setCategory(response.data.value));
        console.log(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
    })
    .catch(error => console.error('Error fetching products:', error));


   
  
    // const storedBasket = window.sessionStorage.getItem("Basket");
    // if (storedBasket) {
    //   const parsedBasketData = JSON.parse(storedBasket);
    //   setArrBasket(parsedBasketData);
    //   setCount(parsedBasketData.length);
    //   const totalSum = parsedBasketData.reduce((sum, item) => sum + item.salePrice, 0);//
    //   setTotal(totalSum);
    //  }
  
  }, [dispatch]);



//   if (!subcategory) {
//     return <div>Loading...</div>;
//   }

  // Отображение подробных данных о товаре
  return (
    <div>
      {/* <Modal show={showM} onHide={handleCloseM}>
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
      </Modal> */}

   <PxMainPage />
   <div className="stock-status">
      <Link to="/"><div className="div33">Головна </div></Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
{category.name}
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
{subcategory.name}
</div>
   <div>

</div>



    <Footer />
    </div>
  );
};

export default ProductDetailsPage;

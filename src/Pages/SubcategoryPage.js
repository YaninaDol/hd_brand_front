
import React from 'react';
import PxMainPage from './PxMainPage';
import Footer from '../Components/Footer';
import { useState } from "react";
import { useEffect } from "react";
import {setProductSizes } from '../redux/actions';
import axios from 'axios';
import { connect,useDispatch,useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link, Outlet } from "react-router-dom";
import Carousels from 'react-multi-carousel';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import { setProducts,setSimilar,setProduct,setCategory,setSeason,setMaterial,setSubCategory} from '../redux/actions';
import { useParams } from 'react-router-dom';
import { MDBCardImage, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import ShoppingAssistant from '../Components/ShoppingAssistant';

import CartProduct from '../Components/CartProduct';
const SubcategoryPage = () => {
    const [total,setTotal] = useState(0);
    const { categoryName, subcategoryid } = useParams();
  const dispatch = useDispatch();
  const productsizes = useSelector(state => state.productsizes);
  const product = useSelector(state => state.product);
  const silimarproducts=useSelector(state => state.silimarproducts);
  const products = useSelector(state => state.products);
  const subcategory = useSelector(state => state.subcategory);
  const category = useSelector(state => state.category);
  const material = useSelector(state => state.material);
  const season = useSelector(state => state.season);
  const [newProd,setNewProd] = useState(new Object());
  const [arrBasket,setArrBasket] = useState([]);
  const [count, setCount] = useState(0);
  const [showM, setshowM] = useState(false);
  const handleCloseM = () => setshowM(false);
  const handleShowM = () => setshowM(true);


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
        return 'Одяг';
      case'shoes':
        return 'Взуття';
      case 'accessorise':
        return 'Аксесуари';
  
      default:
        return 'unknown';
    }
  }
  const responsive = {
    desktopLarge: {
      breakpoint: { max: 3000, min: 1400 },
      items: 5,
      slidesToSlide: 5,
      partialVisible: true,
      itemWidth: 20,
    },
    desktop: {
      breakpoint: { max: 1400, min: 800 },
      items: 4,
      slidesToSlide: 4,
      itemWidth: 20,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 3,
      slidesToSlide: 3,
      itemWidth: 20,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2,
      itemWidth: 20,
    },
  };
  




  useEffect(()=>

  {
  


    axios.get(`https://localhost:7269/api/Specification/GetSubCategoryRepById?id=${subcategoryid}`)
    .then(response => {
    
     
    
     dispatch(setSubCategory(response.data.value))
    
    })
    .catch(error => console.error('Error fetching products:', error));
  
  
  }, [ subcategoryid, dispatch]);



  
  function addBasket() {
   
    if(product.categoryid != 3)
         {     if (newProd.size !== null) {
              
                const existingProduct = arrBasket.find(item => item.size === newProd.size);
            
                if (existingProduct) {
              
                  alert("Товар вже доданий у кошик !");
                } else {
              

                  setCount(prevCount => {
                    const newCount = prevCount + 1;
                  
                    return newCount;
                  });
              


                  let copy = [...arrBasket];
                  copy.push(newProd);
                  setArrBasket(copy);
                  handleShowM();
                  window.sessionStorage.setItem("Basket", JSON.stringify(copy));
            
                  setTotal(total + newProd['price']);
              
                
                  window.location.reload();
                }
              } else {
            
                alert("Оберіть розмір!");
              }
            }
    else
            {
           
              const existingProduct = arrBasket.find(item => item.productid === product.id);
            
              if (existingProduct) {
            
                alert("Товар вже доданий у кошик !");
              } else {
            

                setCount(prevCount => {
                  const newCount = prevCount + 1;
                
                  return newCount;
                });
            


                let copy = [...arrBasket];
                copy.push(productsizes.find(item => item.productid == product.id));
                setArrBasket(copy);
                handleShowM();
                window.sessionStorage.setItem("Basket", JSON.stringify(copy));
          
                setTotal(total + product['salePrice']);
            
              
                window.location.reload();
              }
            
            }
  }
  function AddBtn(id)
  {
      setNewProd(productsizes.find(item => item.id == id));
    

  }
//   if (!subcategory) {
//     return <div>Loading...</div>;
//   }

  return (
    <div>
      <Modal show={showM} onHide={handleCloseM}>
        <Modal.Header closeButton>
        <Modal.Body>Товар додано до кошику </Modal.Body>
        </Modal.Header>
      
      
      </Modal>

   <PxMainPage />
   <div className="stock-status">
      <Link to="/"><div className="div33">Головна </div></Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
<a style={{color:'black'}} href={`/${categoryName}`}>{generatePathName(categoryName)}</a>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
{subcategory.name}
</div>
 





    <Footer />
    </div>
  );
};

export default SubcategoryPage;

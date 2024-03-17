
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
import '../Pages/ProductdetailPage.css';
import CartProduct from '../Components/CartProduct';
const ProductDetailsPage = () => {
    const { id, subcategoryid } = useParams();
    const [isFavourite, setIsFavourite] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const productsizes = useSelector(state => state.productsizes);
  const product = useSelector(state => state.product);
  const silimarproducts=useSelector(state => state.silimarproducts);
  const products = useSelector(state => state.products);
  const subcategory = useSelector(state => state.subcategory);
  const category = useSelector(state => state.category);
  const material = useSelector(state => state.material);
  const season = useSelector(state => state.season);
  const [newProd,setNewProd] = useState(null);
  const [showM, setshowM] = useState(false);
  const handleCloseM = () => setshowM(false);
  const handleShowM = () => setshowM(true);
  const [showTableSize, setshowTableSize] = useState(false);
  const handleClosetableSize = () => setshowTableSize(false);
  const handleShowtableSize = () => setshowTableSize(true);
  const [selectedCurrency, setSelectedCurrency] = useState('UAH');
  const [showValidation, setShowValidation] = useState(false);
  const [exchangeRates, setExchangeRates] = useState({
    usd: 1, 
    eur: 1,
  });
  const handleLikeClick = () => {
    setIsFavourite(!isFavourite);
    

      axios({method:'post',
      url:`https://localhost:7269/api/Authenticate/setLike?prodId=${id}&like=${!isFavourite}`,
    headers: {         'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                  }})
       .then(response => {
       

  
  })
  .catch(error => console.error('Error fetching products:', error));
    


  };



  const handleCurrencyChange = (selectedCurrency) => {
    setSelectedCurrency((prevCurrency) => {
     
      const newCurrency = selectedCurrency;
  
     
      window.sessionStorage.setItem('selectedCurrency', selectedCurrency);
  
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
    fetchExchangeRates();

    const savedCurrency =  window.sessionStorage.getItem('selectedCurrency');


  if (savedCurrency) {
    setSelectedCurrency(savedCurrency);
  }

  axios({method:'post',
      url:`https://localhost:7269/api/Authenticate/getlike?prodId=${id}`,
    headers: {         'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                  }})
       .then(response => {
  
   
        setIsFavourite(response.data);

  
  })
  .catch(error => console.error('Error fetching products:', error));


    axios.get(`https://localhost:7269/api/Specification/GetSubCategoryRepById?id=${subcategoryid}`)
    .then(response => {
    
     
    
     dispatch(setSubCategory(response.data.value))
    
    })
    .catch(error => console.error('Error fetching products:', error));
  
  
  
    axios.get(`https://localhost:7269/api/Product/GetSizeofProduct?id=${id}`)
    .then(respons => {
      dispatch(setProductSizes(respons.data));
     
    })
    .catch(error => console.error('Error fetching products:', error));
  
   
  
    axios.get(`https://localhost:7269/api/Product/GetProductById?id=${id}`)
    .then(res => {
      
        dispatch(setProduct(res.data.value))
  
      axios.get(`https://localhost:7269/api/Specification/GetCategoryById?id=${res.data.value.categoryid}`)
      .then(resp => {
     
        dispatch(setCategory(resp.data.value));
     
      })
      .catch(error => console.error('Error fetching products:', error));
      axios.get(`https://localhost:7269/api/Specification/GetMaterialById?id=${res.data.value.materialid}`)
      .then(resp => {
     
        dispatch(setMaterial(resp.data.value));
    
      })
      .catch(error => console.error('Error fetching products:', error));
      axios.get(`https://localhost:7269/api/Specification/GetSeasonById?id=${res.data.value.seasonid}`)
      .then(resp => {
     
        dispatch(setSeason(resp.data.value));
      
      })
      .catch(error => console.error('Error fetching products:', error));
      axios.get(`https://localhost:7269/api/Product/GetProductsBySubcategory?id=${subcategoryid}`)
    .then(responses => {
      dispatch(setSimilar(responses.data));
     
    })
    .catch(error => console.error('Error fetching products:', error));
  
      
    })
    .catch(error => console.error('Error fetching products:', error));


   
  
  }, [id, subcategoryid, dispatch]);

  // const fetchExchangeRates = async () => {
  //   try {
    
  //     const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
  //     const data = await response.json();

     
  //     const newExchangeRates = {};
  //     data.forEach(currency => {
  //       newExchangeRates[currency.cc.toLowerCase()] = currency.rate;
  //     });
  //     setExchangeRates(newExchangeRates);
  //   } catch (error) {
  //     console.error('Error fetching exchange rates:', error);
  //   }
  // };
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
    if (!exchangeRates || Object.keys(exchangeRates).length === 0) {
      return price;
    }
  
    const usdRate = exchangeRates.usd
    const eurRate = exchangeRates.eur;
  
    if (currency === 'USD') {
      return (price * usdRate).toFixed(0);
    } else if (currency === 'EUR') {
      return (price * eurRate).toFixed(0);
    } else {
      return price;
    }
  };

  
  const addToBasket = () => {
  
    if (!newProd)
      {
        setShowValidation(true);
        return;
      }
    
    
      const storedBasket = window.sessionStorage.getItem("Basket");
      const existingBasket = storedBasket ? JSON.parse(storedBasket) : [];
  
      
        const existingItem = existingBasket.find((item) => item.id === newProd.id);
  
        if (existingItem) {
         
          existingItem.quantity += 1;
        } else {
         
          existingBasket.push({ ...newProd, quantity: 1 });
        }
     
  
      
      window.sessionStorage.setItem("Basket", JSON.stringify(existingBasket));
  
     
      alert("Додано!");
  
    
     setNewProd(null);
     setShowValidation(false);
     
    
      window.location.reload();
  
  };
 
  function getTableImage(sizeId) {
    switch (sizeId) {
      case "1":
        return require('../assets/table2.png');
      case "2":
        return require('../assets/table4.png');
      case "11":
        return require('../assets/table3.png');
      case "12":
        return require('../assets/table1.png');
      default:
        return  require('../assets/table1.png');
    }
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
      <Modal show={showTableSize} onHide={handleClosetableSize}>
        <Modal.Header closeButton>
        <Modal.Body>
        <img id='sizemodal'  src={getTableImage(product.sizes)} alt={`Table for size ${product.sizes}`} />
          
           </Modal.Body>
        </Modal.Header>
      
      
      </Modal>
      <div style={{ position: 'fixed', width: '100%', zIndex: '1000', top: '0' }}>
  <PxMainPage convertPrice={convertPrice} selectedCurrency={selectedCurrency} handleCurrencyChange={handleCurrencyChange} />
</div>
   <div className="stock-status" style={{marginTop:'150px'}}>
      <Link to="/"><div className="div33">Головна </div></Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
<a style={{color:'black'}} href={`/${generatePath(category.id)}`}>{category.name}</a>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
<a style={{color:'black'}} href={`/${generatePath(category.id)}/${subcategory.id}`}>{subcategory.name}</a>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
 {product.name}
</div>
   <div>

<MDBContainer id='container50'>
<MDBRow id='rowmargin50' >
   

    <MDBCol id='photocolumn'>
            <MDBRow>
   
    <MDBCol  ><img src={product.image} style={{margin:'5px'}} class="card-img-top" alt="Hollywood Sign on The Hill"/></MDBCol>
             </MDBRow>
             <MDBRow>
   
   <MDBCol  ><img src={product.image2} style={{margin:'5px'}} class="card-img-top" alt="Hollywood Sign on The Hill"/></MDBCol>
            </MDBRow>
   </MDBCol>
   <MDBCol  id='photocolumn'>
            <MDBRow>
   
    <MDBCol  id='photocolumn'><img src={product.image3} style={{margin:'5px'}} class="card-img-top" alt="Hollywood Sign on The Hill"/></MDBCol>
             </MDBRow>
             <MDBRow>
   
   <MDBCol  id='photocolumn'><img src={product.image} style={{margin:'5px'}} class="card-img-top" alt="Hollywood Sign on The Hill"/></MDBCol>
            </MDBRow>
   </MDBCol>
<MDBCol style={{margin:'25px'}}>

<MDBRow >
<Carousel id='photocolumnmob'>
<Carousel.Item>
<img src={product.image} style={{margin:'5px'}} class="card-img-top" alt="Hollywood Sign on The Hill"/>
</Carousel.Item>
<Carousel.Item>
<img src={product.image2} style={{margin:'5px'}} class="card-img-top" alt="Hollywood Sign on The Hill"/>
</Carousel.Item>
<Carousel.Item>
<img src={product.image3} style={{margin:'5px'}} class="card-img-top" alt="Hollywood Sign on The Hill"/>
</Carousel.Item>
<Carousel.Item>
<img src={product.image} style={{margin:'5px'}} class="card-img-top" alt="Hollywood Sign on The Hill"/>
</Carousel.Item>
</Carousel>

              { isFavourite
                  ? <div  onClick={handleLikeClick} className='text-end'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg></div>
                  : <div  onClick={handleLikeClick} className='text-end'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg></div>
          }
            
     <h1>{product.name} </h1>
   
    </MDBRow>

<MDBRow  style={{marginTop:'5px',fontFamily:'monospace',fontSize:'20px'}}> <h7>{convertPrice(product.salePrice, selectedCurrency)} {selectedCurrency}</h7> </MDBRow>
<MDBRow style={{marginTop:'75px'}}><h6>Характеристика товару: </h6></MDBRow>
                <MDBRow style={{marginTop:'5px'}}><MDBCol> Сезон: </MDBCol> <MDBCol> {season.name} </MDBCol> </MDBRow>
                <MDBRow style={{marginTop:'5px'}}><MDBCol> Категорія: </MDBCol> <MDBCol> {category.name} </MDBCol> </MDBRow>
                <MDBRow style={{marginTop:'5px'}}><MDBCol> Тип: </MDBCol> <MDBCol> {subcategory.name} </MDBCol> </MDBRow>
                <MDBRow style={{marginTop:'5px'}}><MDBCol> Матеріал: </MDBCol> <MDBCol> {material.name} </MDBCol> </MDBRow>

  <MDBRow style={{marginTop:'55px'}}>
    <div>
     <MDBCol>
      <select className="select p-2 bg-grey" style={{ width: "100%" }} onChange={(e) => setNewProd(JSON.parse(e.target.value))}>
      <option selected value="0">Оберіть розмір</option>
      
        {productsizes.map((x) => (
            
          <option key={x.id} value={JSON.stringify(x)}>
            {x.size}
          </option>
        ))}
      </select>
    </MDBCol>
    </div>
    {showValidation && (newProd===null || newProd===0)&& (
          <div style={{ color: 'red', marginTop: '10px' }}>
            Виберіть розмір перед додаванням в корзину.
          </div>
        )}
        {category.id!=3&&( <MDBCol style={{marginTop:'5px'}}>  <MDBRow><a style={{color:'black',textDecoration:'underline'}} onClick={handleShowtableSize}>Таблиця розмірів</a></MDBRow> </MDBCol>
   )}
    
  </MDBRow>


<MDBRow className='text-center'  style={{marginTop:'55px'}}> <Button
onClick={addToBasket}
                  style={{ borderRadius: '0px' }}
                  variant="dark"
                 
                >
                  Додати в кошик
                </Button>   </MDBRow>



          
              
</MDBCol>
      
</MDBRow>
<MDBRow style={{marginTop:'75px'}}>
<ShoppingAssistant></ShoppingAssistant>
</MDBRow>
<MDBRow style={{marginTop:'35px'}}>
  <div style={{marginBottom:35,fontSize:20}}>Вам також може сподобатись :</div>

<Carousels responsive={responsive} itemClass="carousel-item-padding" containerClass="carousel-container">
  
{silimarproducts.length > 0 ? (
    silimarproducts.map((x) => (
      <Link to={`/${generatePath(category.id)}/${x.subCategoryid}/${x.id}`}>
      <CartProduct
      id_key={x.id}
      imageSrc1={x.image}
      imageSrc2={x.image2}
      isNew={x.isNew}
      isDiscount={x.isDiscount}
      isLiked={false}
      descriprion={x.name}
      price1={convertPrice(x.price,selectedCurrency)}
      currency={selectedCurrency}
      price2={convertPrice(x.salePrice,selectedCurrency)}
      />
      </Link>
    ))
  ) : (
    <div></div>
  )}
   </Carousels>
</MDBRow>
</MDBContainer>


</div>



    <Footer />
    </div>
  );
};

export default ProductDetailsPage;

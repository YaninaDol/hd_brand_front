
import React from 'react';
import PxMainPage from './PxMainPage';
import Footer from '../Components/Footer';
import { useState,useRef } from "react";
import { useEffect } from "react";
import {setProductSizes } from '../redux/actions';
import axios from 'axios';
import {useDispatch,useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';
import { Link,NavLink } from "react-router-dom";
import Carousels from 'react-multi-carousel';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { setProducts,setSimilar,setProduct,setCategory,setSeason,setMaterial,setSubCategory} from '../redux/actions';
import { useParams } from 'react-router-dom';
import { MDBCardImage, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import ShoppingAssistant from '../Components/ShoppingAssistant';
import BasketModal from '../Components/BasketModal';
import '../Pages/ProductdetailPage.css';
import CartModal from '../Components/CartModal';
import NewProductCardItem from '../Components/NewProductCardItem';
const ProductDetailsPage = () => {
  const {i18n, t } = useTranslation();
  const [loading, setLoading] = useState(true);
    const { id, subcategoryid } = useParams();
    const [isFavourite, setIsFavourite] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
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
  const [showNotice, setShowNotice] = useState(false);


  const [selectedCurrency, setSelectedCurrency] = useState('UAH');
  const [showValidation, setShowValidation] = useState(false);
  const variant_season = 4;
  const variant_clogs= 11;
  const plus_price = 200;
  const [selectedInsulator, setSelectedInsulator] = useState(t('baize')); 
  const [availableInsulators, setAvailableInsulators] = useState([ t('baize'), t('fur')]); 
  const [selectedInsulatorClog, setSelectedInsulatorClog] = useState(t('baize')); 
  const [availableInsulatorsClog, setAvailableInsulatorsClog] = useState([ t('baize'), t('leather_inside')]); 
  const [exchangeRates, setExchangeRates] = useState({
    usd: 1, 
    eur: 1,
  });
  
  const handleLikeClick = () => {
    setIsFavourite(!isFavourite);
    

      axios({method:'post',
      url:`${API_BASE_URL}/api/Authenticate/setLike?prodId=${id}&like=${!isFavourite}`,
    headers: {         'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                  }})
       .then(response => {
       

  
  })
  .catch(error => console.log(''));
    


  };
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef2 = useRef(null);
  const [isPlaying2, setIsPlaying2] = useState(false);

  const handleVideoToggle = () => {
    const video = videoRef.current;
    if (video.paused || video.ended) {
      video.play(); 
      setIsPlaying(true);
    } else {
      video.pause(); 
      setIsPlaying(false);
    }
  };

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video.paused) {
      video.pause();
      setIsPlaying(false);
    }
    else {
      video.play(); // Если видео воспроизводится, ставим его на паузу
      setIsPlaying(true);
    }
  };
  const handleVideoToggle2 = () => {
    const video = videoRef2.current;
    if (video.paused || video.ended) {
      video.play(); // Если видео на паузе или завершено, запускаем его
      setIsPlaying2(true);
    } else {
      video.pause(); // Если видео воспроизводится, ставим его на паузу
      setIsPlaying2(false);
    }
  };

  const handleVideoClick2 = () => {
    const video = videoRef2.current;
    if (!video.paused) {
      video.pause();
      setIsPlaying2(false);
    }
    else {
      video.play(); // Если видео воспроизводится, ставим его на паузу
      setIsPlaying2(true);
    }
  };
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
  



  const removeFromCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem('Basket')) || [];
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('Basket', JSON.stringify(updatedCart));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchExchangeRates();
    setIsPlaying(true);
    setIsPlaying2(true);
    if (videoRef2.current) {
     
      videoRef2.current.play(); // Начать воспроизведение видео сразу после загрузки
     
    };
    if (videoRef.current) {
   
      videoRef.current.play(); // Начать воспроизведение видео сразу после загрузки
     
    };

  const savedCurrency =  window.sessionStorage.getItem('selectedCurrency');


if (savedCurrency) {
  setSelectedCurrency(savedCurrency);
}

    const fetchData = async () => {
      try {
        if (window.sessionStorage.getItem("AccessToken")) {
          const likeResponse = await axios.post(`${API_BASE_URL}/api/Authenticate/getlike`, null, {
            params: { prodId: id },
            headers: { Authorization: `Bearer ${window.sessionStorage.getItem("AccessToken")}` },
          });
          setIsFavourite(likeResponse.data);
        }

        const [subcategoryRes, productSizeRes, productRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/Specification/GetSubCategoryRepById`, { params: { id: subcategoryid } }),
          axios.get(`${API_BASE_URL}/api/Product/GetSizeofProduct`, { params: { id } }),
          axios.get(`${API_BASE_URL}/api/Product/GetProductById`, { params: { id } }),
        ]);

        dispatch(setSubCategory(subcategoryRes.data.value));
        dispatch(setProductSizes(productSizeRes.data));
        dispatch(setProduct(productRes.data.value));
        if(productRes.data.value.visible=== false){throw new Error('Product not found');}
        const { categoryid, materialid, seasonid } = productRes.data.value;

        const [categoryRes, materialRes, seasonRes, similarRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/Specification/GetCategoryById`, { params: { id: categoryid } }),
          axios.get(`${API_BASE_URL}/api/Specification/GetMaterialById`, { params: { id: materialid } }),
          axios.get(`${API_BASE_URL}/api/Specification/GetSeasonById`, { params: { id: seasonid } }),
          axios.get(`${API_BASE_URL}/api/Product/GetProductsBySubcategory`, { params: { id: subcategoryid } }),
        ]);

        dispatch(setCategory(categoryRes.data.value));
        dispatch(setMaterial(materialRes.data.value));
        dispatch(setSeason(seasonRes.data.value));
        dispatch(setSimilar(similarRes.data));

        setTimeout(() => setLoading(false), 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        removeFromCart(id);
        window.location.href='/';
      }
    };

    fetchData();
  }, [id, subcategoryid, dispatch]);

  useEffect(() => {
    if ((product?.isDiscount || product?.isInStock) && Array.isArray(productsizes) && productsizes.length > 0) {
      setNewProd({ ...productsizes[0], size: '' });
    }
  }, [product?.isDiscount, product?.isInStock, productsizes]);



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

  const convertPrice1 = (price, currency) => {
    if (!exchangeRates || Object.keys(exchangeRates).length === 0) {
      return price;
    }
  
    const usdRate = exchangeRates.usd
    const eurRate = exchangeRates.eur;
 price= selectedInsulator==t('fur')?price+plus_price:price;

    if (currency === 'USD') {
      return (price * usdRate).toFixed(0);
    } else if (currency === 'EUR') {
      return (price * eurRate).toFixed(0);
    } else {
      return price;
    }
  };
  var spray= {productid:1,article:"spray", id: 5865, name: 'Спрей для замшового взуття',nameEng: 'Shoe Care Spray',image:'https://ralf.ru/upload/iblock/f3a/f3aed76dacbee86b6ca8e8e11f8d3e84.jpg', price: 200, size:'one size' }
  const [showModalSpray, setShowModalSpray] = useState(false);
  
  const handleShowModalSpray = () => {
   
    setShowModalSpray(true);  
      
  };
  const handleCloseModalSpray = () => {
   
    setShowModalSpray(false);  
    handleShowM();
  };

  const addSprayToBasket = () => {
    const sprayItem = {productid:1,article:"spray", id: 5865, name: 'Спрей для замші',nameEng: 'Spray for Suede',image:'https://ralf.ru/upload/iblock/f3a/f3aed76dacbee86b6ca8e8e11f8d3e84.jpg', price: 200, quantity: 1,size:'' };
    const storedBasket = window.localStorage.getItem("Basket");
    const existingBasket = storedBasket ? JSON.parse(storedBasket) : [];

    // Проверка, есть ли уже спрей в корзине
    const existingItem = existingBasket.find(item => item.id === sprayItem.id);

    if (existingItem) {
      existingItem.quantity += 1; // Увеличиваем количество, если спрей уже в корзине
    } else {
      existingBasket.push(sprayItem); // Добавляем новый спрей, если его ещё нет в корзине
    }

    // Сохраняем обновлённую корзину в сессии
    window.localStorage.setItem("Basket", JSON.stringify(existingBasket));
    handleCloseModalSpray(); 
    handleShowM();
  };
  const addToBasket = () => {
    
    if (!newProd) {
      setShowValidation(true);
    
      return;
    }
  
    const storedBasket = window.localStorage.getItem("Basket");
    const existingBasket = storedBasket ? JSON.parse(storedBasket) : [];
    
    
    const itemToAdd = {
      ...newProd,
      quantity: 1,
      insulator: (product.seasonid === variant_season && selectedInsulator) ||
                 (product.subCategoryid.includes(variant_clogs) && selectedInsulatorClog) || 
                 null,
    };
    const existingItem = existingBasket.find(item => 
      item.id === itemToAdd.id && item.insulator === itemToAdd.insulator
    );

    const existingSpray = existingBasket.find(item => 
      item.id === 5865
    );

    if (product.isDiscount||product.isInStock) {
      if (existingItem) {
        alert('Товар вже доданий до кошика');
      } else {
        existingBasket.push(itemToAdd);
        window.localStorage.setItem("Basket", JSON.stringify(existingBasket));
      //   if(itemToAdd.article.includes('z')&&product.categoryid==2&&!existingSpray)
      //  { handleShowModalSpray();}
      //   else {handleShowM();}
      handleShowM();
        setNewProd(null);
        setShowValidation(false);
      }
      return;
    }
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      itemToAdd.price = selectedInsulator==t('fur')? product.price + plus_price : product.price;
      existingBasket.push(itemToAdd);
    }
  
    window.localStorage.setItem("Basket", JSON.stringify(existingBasket));
    // if(itemToAdd.article.includes('z')&&product.categoryid==2&&!existingSpray)
    //   { handleShowModalSpray();}
    //    else {handleShowM();}
       handleShowM();
    setNewProd(null);
    setShowValidation(false);
  };

  
 
  function getTableImage(sizeId) {
    switch (sizeId) {
      case "1":
        return require('../assets/table2.png');
      case "2":
        return require('../assets/table4.jpg');
      case "11":
        return require('../assets/table3.png');
      case "12":
        return require('../assets/table1.png');
        case "13":
        return require('../assets/table5.JPG');
        case "14":
          return require('../assets/table7.jpg');
        case "16":
          return require('../assets/table6.jpg');
        case "17":
          return require('../assets/table8.JPG');
        case "19":
          return require('../assets/table9.png');
        case "20":
            return require('../assets/table20.png');
        case "21":
              return require('../assets/table21.png');


      default:
        return  require('../assets/table1.png');
    }
  }
  const [hasSeenNotice, setHasSeenNotice] = useState(false); // новое состояние

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (product?.sizes === "21") {
        setShowNotice(true);
      }
    }, 200); // ждём, пока придут все данные
    return () => clearTimeout(timeout);
  }, [product?.id]);
  const handleCloseNotice = () => setShowNotice(false);
//   if (!subcategory) {
//     return <div>Loading...</div>;
//   }

  return (
    <div style={{ margin: '0', padding: '0', overflowX: 'hidden' }}>
      
      <Modal show={showModalSpray} onHide={handleCloseModalSpray}>
        <Modal.Header closeButton>
          <Modal.Title>Спрей для замші </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <MDBCardImage
              fluid
              src='https://ralf.ru/upload/iblock/f3a/f3aed76dacbee86b6ca8e8e11f8d3e84.jpg'
              alt="Cotton T-shirt"
              style={ { height:'50%',position:'relative',objectFit:'cover'}}
            />
       
       Чи хочете ви додати до кошика?
        </Modal.Body>
        
        <Modal.Footer>
      
          <Button variant="outline-secondary" onClick={handleCloseModalSpray}>
            Ні, дякую
          </Button>
          <Button variant="dark" onClick={addSprayToBasket}>
            {t('add')}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showNotice} onHide={handleCloseNotice} onExited={() => setShowNotice(false)}>
  <Modal.Header closeButton>
    <Modal.Title>{i18n.language === 'en' ? 'Attention' : 'Увага!'}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {i18n.language === 'en' ? (
      <>
        ⚠️ The model is undersized. Please pay attention to the{' '}
        <a style={{ color: 'black', textDecoration: 'underline' }} onClick={handleShowtableSize}>
          size guide.
        </a>
      </>
    ) : (
      <>
        ⚠️ Модель маломірна! Будь ласка, зверніть увагу на{' '}
        <a style={{ color: 'black', textDecoration: 'underline' }} onClick={handleShowtableSize}>
          розмірну сітку.
        </a>
      </>
    )}
  </Modal.Body>
</Modal>

      <Modal show={showTableSize} onHide={handleClosetableSize}>
        <Modal.Header closeButton>
        <Modal.Body>
        <img id='sizemodal'  src={getTableImage(product.sizes)} alt={`Table for size ${product.sizes}`} />
          
           </Modal.Body>
        </Modal.Header>
      
      
      </Modal>
      <div style={{ position: 'fixed', width: '100%', zIndex: '1000', top: '0' }}>

      <BasketModal show={showM} handleClose={handleCloseM} convertPrice={convertPrice} selectedCurrency={selectedCurrency} />



  <PxMainPage convertPrice={convertPrice} selectedCurrency={selectedCurrency} handleCurrencyChange={handleCurrencyChange} />
</div>
<div>
   {loading ? (
       <div  style={{marginTop:'250px'}} class="d-flex justify-content-center">
       <Spinner  variant="secondary"  animation="border"  />
       </div>
      ) : (<>
   <div className="stock-status" style={{marginTop:'150px'}}>
      <Link to="/"><div className="div33">{t('home')} </div></Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>

<NavLink  to={`/${generatePath(category.id)}`}>{i18n.language === 'en' ? category.nameEng : category.name}</NavLink>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
<NavLink style={{color:'black',textAlign:'center'}} to={`/${generatePath(category.id)}/${subcategory.id}`}>{i18n.language === 'en' ? subcategory.nameEng : subcategory.name}</NavLink>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
{i18n.language === 'en' ? product.nameEng : product.name}
</div>
   
<Carousel id='photocolumnmob'>
  {product.image && (
    <Carousel.Item  >
      <img 
        src={product.image} 
        style={{   aspectRatio:'3/4',position:'relative', width: '100%', height: '100%' }} 
        className="card-img-top" 
        alt="photo" 
      />
    </Carousel.Item>
  )}
  {product.image2 && (
    <Carousel.Item >
      <img 
        src={product.image2} 
        style={{   aspectRatio:'3/4',position:'relative', width: '100%', height: '100%' }} 
        className="card-img-top" 
        alt="photo" 
      />
    </Carousel.Item>
  )}
  {product.image3 && (
    <Carousel.Item >
      <img 
        src={product.image3} 
        style={{   aspectRatio:'3/4',position:'relative', width: '100%', height: '100%' }} 
        className="card-img-top" 
        alt="photo" 
      />
    </Carousel.Item>
  )}
  {product.video && (
    <Carousel.Item >
      
      <video
      
      ref={videoRef2}
      preload="auto"
      className="card-img-top"
      playsInline
      muted
      loop
      autoPlay
      src={product.video}
      onClick={handleVideoClick2}
      style={ { aspectRatio:'3/4',position:'relative',objectFit:'cover'}}
    />

    
    <button
      onClick={handleVideoToggle2}
      style={{
        position: 'absolute',
        bottom: '35px',
        right: '5px',
        background: 'transparent', 
        border: 'none', 
        cursor: 'pointer' 
      }}
    >
      {isPlaying2 ? (
       <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" color='black' class="bi bi-pause" viewBox="0 0 16 16">
       <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
     </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" color='black' fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
        <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
      </svg>
        )}
      </button>
      {/* <video
       controls
       preload="auto"
       poster={product.image} 
      
        src={product.video}
        style={{ margin: '5px', objectFit: 'cover', width: '100%', height: '100%' }} 
        className="card-img-top"
        alt="product video"
      /> */}
    </Carousel.Item>
  )}
</Carousel>
     
<MDBContainer fluid 
           
           style={{
               margin: '0 auto', 
               padding: '0 5px', 
               maxWidth: '95%', 
           }}>
<MDBRow id='rowmargin50' >
   

    <MDBCol id='photocolumn'>
    {product.image&&(<MDBRow>
  
             <MDBCol  ><img src={product.image} style={{ aspectRatio:'3/4',position:'relative',objectFit:'cover'}} class="card-img-top" alt="photo"/></MDBCol>
            </MDBRow>)}
           
            {product.image2&&(  <MDBRow>
   
   <MDBCol  ><img src={product.image2} style={{ aspectRatio:'3/4',position:'relative',objectFit:'cover'}} class="card-img-top" alt="photo"/></MDBCol>
            </MDBRow>)}
   </MDBCol>
   {(product.image3 || product.video)&&(
   <MDBCol  id='photocolumn'>
   {product.image3&&(    <MDBRow>
   
    <MDBCol  id='photocolumn'><img src={product.image3} style={{ aspectRatio:'3/4',position:'relative',objectFit:'cover'}} class="card-img-top" alt="photo"/></MDBCol>
             </MDBRow>)}
             {product.video&&(      <MDBRow>
   
   <MDBCol  id='photocolumn'> <div style={{ position: 'relative' }}>
   <video
      
      ref={videoRef}
      preload="auto"
      className="card-img-top"
      playsInline
      muted
      autoPlay
      loop
      src={product.video}
      onClick={handleVideoClick}
      style={ { aspectRatio:'3/4',position:'relative',objectFit:'cover'}}
    />


    
    <button
      onClick={handleVideoToggle}
      style={{
        position: 'absolute',
        bottom: '25px',
        right: '10px',
        background: 'transparent', 
        border: 'none', 
        cursor: 'pointer' 
      }}
    >
      {isPlaying ? (
       <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"  color='black' fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16">
       <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
     </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"  color='black' fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
        <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
      </svg>
        )}
      </button>
    </div></MDBCol>
            </MDBRow>)}
   </MDBCol>)}






   <MDBCol style={{margin:'5px'}}>

<MDBRow >

<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<p style={{opacity:'0.5',color:'gray'}} >{t('article')}: {product.article}</p>

{ isFavourite
                  ? <div   onClick={handleLikeClick}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg></div>
                  : <div  onClick={handleLikeClick} ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg></div>
          }
         
          
    
</div>
<h2>{i18n.language === 'en' ? product.nameEng : product.name} </h2>
   
    </MDBRow>
    {product.isDiscount ? (
  <>
    <MDBRow style={{ marginTop: '5px', fontSize: '20px', textDecoration: 'line-through',opacity:'0.5' }}>
      <h7>{convertPrice1(product.price, selectedCurrency)} {selectedCurrency}</h7>
    </MDBRow>
    <MDBRow style={{ marginTop: '5px', fontSize: '20px',color:'var(--typography-additional)' }}>
      <h7>{convertPrice1(product.salePrice, selectedCurrency)} {selectedCurrency}</h7>
    </MDBRow>
  </>
) : (
  <MDBRow style={{ marginTop: '5px', fontSize: '20px' }}>
    <h7>{convertPrice1(product.salePrice, selectedCurrency)} {selectedCurrency}</h7>
  </MDBRow>
)}
<MDBRow style={{marginTop:'75px'}}><h6>{t('product_information')}: </h6></MDBRow>
{category.id!=3&&( <MDBRow  style={{marginTop:'5px'}}><MDBCol> {t('season')}: </MDBCol> <MDBCol className='text-end'> {i18n.language === 'en' ? season.nameEng : season.name} </MDBCol> </MDBRow>)}
                {/* <MDBRow style={{marginTop:'5px'}}><MDBCol> {t('category')}: </MDBCol> <MDBCol className='text-end'>{i18n.language === 'en' ? category.nameEng : category.name}  </MDBCol> </MDBRow> */}
                <MDBRow style={{marginTop:'5px'}}><MDBCol> {t('type')}: </MDBCol> <MDBCol className='text-end'>{i18n.language === 'en' ? subcategory.nameEng : subcategory.name}  </MDBCol> </MDBRow>
                <MDBRow style={{marginTop:'5px'}}><MDBCol> {t('material')}: </MDBCol> <MDBCol className='text-end'>{i18n.language === 'en' ? material.nameEng : material.name}   </MDBCol> </MDBRow>
          
                {(!product.isDiscount &&!product.isInStock)&& (
  <MDBRow style={{marginTop:'55px'}}>
    <div>
     <MDBCol>
      <select className="select p-3 bg-grey" style={{ width: "100%",marginBottom:'5px' }} onChange={(e) => setNewProd(JSON.parse(e.target.value))}>
     <option selected value="0">{t('size')}</option>
     
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
            {t('alert')}
          </div>
        )}
        {category.id!=3&&( <MDBCol style={{marginTop:'5px'}}>  <MDBRow><a style={{color:'black',textDecoration:'underline'}} onClick={handleShowtableSize}>{t('size_table')}</a></MDBRow> </MDBCol>
   )}
    
  </MDBRow>)}

  {(!product.isDiscount &&!product.isInStock) && ( <MDBRow className='text-start'  style={{marginTop:'55px'}}>
    {product.seasonid === variant_season && (
  <div>
    <label htmlFor="insulatorSeason"> {t('insulator')}:  </label>
    <select
      id="insulatorSeason"
      className="select p-3 bg-grey"
      style={{ width: "100%" }}
      value={selectedInsulator}
      onChange={(e) => setSelectedInsulator(e.target.value)}
    >
      {availableInsulators.map((insulator, index) => (
        <option key={index} value={insulator}>{insulator}</option>
      ))}
    </select>
  </div>
)}
{product.subCategoryid.includes(variant_clogs) && (
  <div>
    <label htmlFor="insulatorClog"> {t('insulator')}:  </label>
    <select
      id="insulatorClog"
      className="select p-3 bg-grey"
      style={{ width: "100%" }}
      value={selectedInsulatorClog}
      onChange={(e) => setSelectedInsulatorClog(e.target.value)}
    >
      {availableInsulatorsClog.map((insulator, index) => (
        <option key={index} value={insulator}>{insulator}</option>
      ))}
    </select>
  </div>
)}

                    </MDBRow>)}
                    
<MDBRow className='text-center'  style={{marginTop:'55px'}}> <Button
onClick={addToBasket}
                  style={{ borderRadius: '0px' }}
                  variant="dark"
                 
                >
                  {t('add')}
                </Button>   </MDBRow>



          
              
</MDBCol>
      
</MDBRow>
<MDBRow style={{marginTop:'75px'}}>
<ShoppingAssistant></ShoppingAssistant>
</MDBRow>
<MDBRow style={{marginTop:'35px'}}>
  <div style={{marginBottom:35,fontSize:20}}>{t('related')} :</div>

<Carousels responsive={responsive} itemClass="carousel-item-padding" containerClass="carousel-container">
{silimarproducts.length > 0 ? (
        silimarproducts
          .filter(_product => {
            const productArticlePrefix = _product.article.split('-')[0];
            const targetArticlePrefix = product.article.split('-')[0];
            return productArticlePrefix === targetArticlePrefix;
          })
          .map((x, index, array) => {
            if (array.length === 1) {
              return silimarproducts.map((x) => (
               
                 <NewProductCardItem
                 link={`/${generatePath(category.id)}/${x.subCategoryid}/${x.id}`}
                    id_key={x.id}
                    imageSrc1={x.image}
                    imageSrc2={x.image2}
                    isNew={x.isNew}
                    isDiscount={x.isDiscount}
                    isLiked={false}
                    descriprion={i18n.language === 'en' ? x.nameEng : x.name}
                    price1={convertPrice(x.price, selectedCurrency)}
                    currency={selectedCurrency}
                    price2={convertPrice(x.salePrice, selectedCurrency)}
                  />
                
              ));
            } else {
              return (
              
                  <NewProductCardItem
                  link={`/${generatePath(category.id)}/${x.subCategoryid}/${x.id}`}
                    id_key={x.id}
                    imageSrc1={x.image}
                    imageSrc2={x.image2}
                    isNew={x.isNew}
                    isDiscount={x.isDiscount}
                    isLiked={false}
                    descriprion={i18n.language === 'en' ? x.nameEng : x.name}
                    price1={convertPrice(x.price, selectedCurrency)}
                    currency={selectedCurrency}
                    price2={convertPrice(x.salePrice, selectedCurrency)}
                  />
                
              );
            }
          })
      ) : (
        <div></div>
      )}
   </Carousels>
</MDBRow>
</MDBContainer>
</>
      )}

</div>



    <Footer />
    </div>
  );
};

export default ProductDetailsPage;

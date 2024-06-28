import axios from 'axios';
import React,{Fragment} from 'react';
import Carousels from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PxMainPage from './PxMainPage';
import Carousel from 'react-bootstrap/Carousel';
import CatalogsItemContainer from "../Components/CatalogsItemContainer";
import NewProductCardItem from "../Components/NewProductCardItem";
import '../Components/CardsContainer.css'
import '../Components/NewProductCardItem.css'
import WeeklyPreview from '../Components/WeeklyPreview'
import { Link} from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { setProducts} from '../redux/actions';
import { CardGroup } from 'react-bootstrap';
import Footer from '../Components/Footer';
import { useEffect,useState } from 'react';
import { useTranslation } from 'react-i18next';
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
    items: 3,
    slidesToSlide: 3,
    itemWidth: 20,
  },
  tablet: {
    breakpoint: { max: 800, min: 540 },
    items: 3,
    slidesToSlide: 3,
    itemWidth: 20,
  },
  mobile: {
    breakpoint: { max: 540, min: 280 },
    items: 2,
    slidesToSlide: 2,
    itemWidth: 20,
  },
  minmobile: {
    breakpoint: { max: 280, min: 0 },
    items: 1,
    slidesToSlide: 1,
    itemWidth: 20,
  },
};

const Home = () => {
  const {i18n, t } = useTranslation(); 
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const [contents,setContents] = useState([]);
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
    window.scrollTo(0, 0);
    
    axios.get(`${API_BASE_URL}/api/Product/GetProducts`)
  .then(response => {
    
    dispatch(setProducts(response.data));
    setContents(response.data);
    
    
   
  })
  .catch(error => {
    
    console.error('Error fetching products data:', error);
   // window.location.href = '/notfound';
  });

      fetchExchangeRates();

      const savedCurrency =  window.sessionStorage.getItem('selectedCurrency');

 
    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
    }
  },[dispatch]);
  
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
  const showSection = contents.filter((x) => x.isDiscount === true).length > 4;
  return (
    <div >
   <div style={{ position: 'fixed', width: '100%', zIndex: '1000', top: '0' }}>
  <PxMainPage convertPrice={convertPrice} selectedCurrency={selectedCurrency} handleCurrencyChange={handleCurrencyChange} />
</div>
    <Carousel fade style={{marginTop:'150px'}} >
      <Carousel.Item active>
   
        <img
        id='carousel-image'
          className="d-block "
          src={require('../assets/bunner@2x.png')}
          alt="First slide"
          style={responsive}
        />
       
      </Carousel.Item>
     
      <Carousel.Item>
        <img
     id='carousel-image'
          className="d-block "
          src={require('../assets/bunner3@2x.png')}
          alt="Third slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
       id='carousel-image'
          className="d-block "
          src={require('../assets/bunner4@2x.png')}
          alt="Third slide"
        />

      </Carousel.Item>

     


      

    </Carousel>
    {/* <CardGroup style={{marginTop:35,marginLeft:5,marginRight:5,alignItems:'center'}}> */}
    <CardGroup style={{ display: 'flex', justifyContent:'space-around', alignItems:'center' }}>
      <div className="something">
        <CatalogsItemContainer link='/shoes' image={require('../assets/categoryImage1.png')} prop={t('shoes')} />
      </div>
   
      {/* <div className="something">
        <CatalogsItemContainer link='/clothes' image={require('../assets/categoryImage2.png')} prop={t('clothes')} />
      </div> */}
      <div className="something">
        <CatalogsItemContainer link='/accessorise' image={require('../assets/categoryImage3.png')} prop={t('accessorise')}/>
      </div>
    </CardGroup>

    
   <div>
   <section className="graphic">
        <div className="new-items">
          <div className="head">
            <div className="title-h2">
              <h2 className="h2">{t('new_items')}</h2>
            </div>
          </div>
        </div>
      </section>
      <Carousels  responsive={responsive} itemClass="carousel-item-padding" containerClass="carousel-container">
        
      {
        contents
        .filter((x) => x.isNew === true)
        .map((x) => (
          <div className="something" >
          <Link to={`/${generatePath(x.categoryid)}/${x.subCategoryid}/${x.id}`}>
            <NewProductCardItem

               id_key={x.id}
               imageSrc1={x.image}
               imageSrc2={x.image2}
               imageSrc3={x.image3}
             
               isNew={x.isNew}
               isDiscount={x.isDiscount}
               isLiked={false}
               descriprion={i18n.language === 'en' ? x.nameEng : x.name}
               price1={convertPrice(x.price,selectedCurrency)}
               currency={selectedCurrency}
               price2={convertPrice(x.salePrice,selectedCurrency)}
            />
          </Link>
          </div>
        ))
      }
     
      </Carousels>
      </div>
      <section className="graphic">
        <div className="new-items">
          <div className="head">
            <div className="title-h2">
              <h2 className="h2">{t('weekly_preview')}</h2>
            </div>
          </div>
        </div>
      </section>
    
   <WeeklyPreview convertPrice={convertPrice} selectedCurrency={selectedCurrency}  weekly={contents.filter((x) => x.weeklyLook === true)}  generatePath={generatePath} />
 
  
   <div id='videocontent' style={{
      position: 'relative',
      width: '100%',
      overflow: 'hidden'
    }}>
      <video 
        className="d-block w-100" 
        autoPlay 
        preload="auto"
        muted 
        loop
        playsInline
      
      >
        <source src='https://hdbrandblob.blob.core.windows.net/storage/videoContent.MP4' type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
 
 
   {showSection && (
      <section className="graphic">
        <div className="new-items">
          <div className="head">
            <div className="title-h2">
              <h2 className="h2">{t('discount_items')}</h2>
            </div>
          </div>
        </div>
      </section>
    )}
    <Carousels  responsive={responsive} itemClass="carousel-item-padding" containerClass="carousel-container">
      {contents
        .filter((x) => x.isDiscount === true)
        .map((x) => (
          <React.Fragment key={x.id}>
            {showSection && (
             <div className="something" >
                <Link to={`/${generatePath(x.categoryid)}/${x.subCategoryid}/${x.id}`}>
                <NewProductCardItem
               id_key={x.id}
               imageSrc1={x.image}
               imageSrc2={x.image2}
               imageSrc3={x.image3}
            
               isNew={x.isNew}
               isDiscount={x.isDiscount}
               isLiked={false}
             
               descriprion={i18n.language === 'en' ? x.nameEng : x.name}
               price1={convertPrice(x.price,selectedCurrency)}
               currency={selectedCurrency}
               price2={convertPrice(x.salePrice,selectedCurrency)}
            />
                </Link>
                </div>
            )}
          </React.Fragment>
        ))}
   </Carousels>
   <Footer />
    </div>
    
  );
};

export default Home;

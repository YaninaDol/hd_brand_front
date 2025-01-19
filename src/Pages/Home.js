import axios from 'axios';
import React,{Fragment} from 'react';
import Carousels from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PxMainPage from './PxMainPage';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';
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
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const [contents,setContents] = useState([]);
  const [sales,setSales] = useState([]);
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
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
   
  })
  .catch(error => {
    
    console.error('Error fetching products data:', error);
    setLoading(true);
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
    <Carousel fade style={{marginTop:'135px'}} >
      <Carousel.Item active>
   
        <img
        id='carousel-image'
          className="d-block  w-100"
          src={require('../assets/bunner1.jpg')}
          alt="First slide"
          style={responsive}
        />
       
      </Carousel.Item>
     
      <Carousel.Item>
        <img
     id='carousel-image'
          className="d-block  w-100"
          src={require('../assets/bunner31.jpg')}
          alt="Third slide"
        />

      </Carousel.Item>
      <Carousel.Item >
        <img
       
       id='carousel-image'
          className="d-block  w-100"
          src={require('../assets/bunner2.webp')}
          alt="Third slide"
        />

      </Carousel.Item>

     





    </Carousel>
    <CardGroup style={{ display: 'flex', justifyContent:'space-around', alignItems:'center' }}>
      <div className="something">
        <CatalogsItemContainer link='/shoes' image={require('../assets/category1.webp')} prop={t('shoes')} />
      </div>
   
      
      <div className="something">
        <CatalogsItemContainer  link='/accessorise' image={require('../assets/category2.webp')} prop={t('accessorise')}/>
      </div>
    </CardGroup>

    
    <div>
  {loading ? (
    <div style={{marginTop: '50px'}} className="d-flex justify-content-center">
      <Spinner variant="secondary" animation="border" />
    </div>
  ) : (
    <>
      <section className="graphic">
        <div className="new-items">
          <div className="head">
            <div className="title-h2">
              <h2 className="h2">{t('new_items')}</h2>
            </div>
          </div>
        </div>
      </section>

      <Carousels responsive={responsive} itemClass="carousel-item-padding" containerClass="carousel-container">
        {contents
          .filter((x) => x.isNew)
          .map((x) => (
            <div className="something" key={x.id}>
           
                <NewProductCardItem
                link={`/${generatePath(x.categoryid)}/${x.subCategoryid}/${x.id}`}
                  id_key={x.id}
                  imageSrc1={x.image}
                  imageSrc2={x.image2}
                  imageSrc3={x.image3}
                  isNew={x.isNew}
                  isDiscount={x.isDiscount}
                  isLiked={false}
                  descriprion={i18n.language === 'en' ? x.nameEng : x.name}
                  price1={convertPrice(x.price, selectedCurrency)}
                  currency={selectedCurrency}
                  price2={convertPrice(x.salePrice, selectedCurrency)}
                />
             
            </div>
          ))}
      </Carousels>

      <section className="graphic">
        <div className="new-items">
          <div className="head">
            <div className="title-h2">
              <h2 className="h2">{t('weekly_preview')}</h2>
            </div>
          </div>
        </div>
      </section>

      <WeeklyPreview 
        convertPrice={convertPrice} 
        selectedCurrency={selectedCurrency} 
        weekly={contents.filter((x) => x.weeklyLook)} 
        generatePath={generatePath} 
      />
   

    
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
   {showSection && ( <Carousels  responsive={responsive} itemClass="carousel-item-padding" containerClass="carousel-container">
    {contents
  .filter((x) => x.isDiscount === true)
  .slice(-10) 
  .map((x) => (
    <React.Fragment key={x.id}>
     
        <div className="something">
         
            <NewProductCardItem
            link={`/${generatePath(x.categoryid)}/${x.subCategoryid}/${x.id}`}
              id_key={x.id}
              imageSrc1={x.image}
              imageSrc2={x.image2}
              imageSrc3={x.image3}
              isNew={x.isNew}
              isDiscount={x.isDiscount}
              isLiked={false}
              descriprion={i18n.language === 'en' ? x.nameEng : x.name}
              price1={convertPrice(x.price, selectedCurrency)}
              currency={selectedCurrency}
              price2={convertPrice(x.salePrice, selectedCurrency)}
            />
   
        </div>
      
    </React.Fragment>
  ))}
     <Link to='/sale'>
  <div style={{display:'flex',justifyContent:'center'}}>
  <Button  style={{ borderRadius: '0px',marginTop:'50%' }}  variant="outline-dark">
              {t('show_more')}
            </Button>
  </div>
  </Link>
   </Carousels>)}
   </>
  )}
</div>
   <Footer />
    </div>
    
  );
};

export default Home;


import React from 'react';
import Carousels from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PxMainPage from './PxMainPage';
import Carousel from 'react-bootstrap/Carousel';
import CatalogsItemContainer from "../Components/CatalogsItemContainer";
import NewProductCardItem from "../Components/NewProductCardItem";
import '../Components/CardsContainer.css'
import '../Components/NewProductCardItem.css'
import WeeklyPreview from '../Components/WeeklyPreview'

import { CardGroup,Card } from 'react-bootstrap';
import DiscountItem from '../Components/DiscountItem';
import Footer from '../Components/Footer';
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

const Home = () => {
  
  
  return (
    <div >
    <PxMainPage />
    <Carousel  >
      <Carousel.Item active>
      <Carousel.Caption>
        <h3>SPRING COLLECTION ‘ 24</h3>
          <p>Створи свій власний стиль з HD BRAND</p>
        </Carousel.Caption>
        <img
          className="d-block w-100"
          src={require('../assets/bunner@2x.png')}
          alt="First slide"
        />
       
      </Carousel.Item>
     
      <Carousel.Item>
        <img
    
          className="d-block w-100"
          src={require('../assets/bunner3@2x.png')}
          alt="Third slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
      
          className="d-block w-100"
          src={require('../assets/bunner4@2x.png')}
          alt="Third slide"
        />

      </Carousel.Item>

      <Carousel.Item>
        <img
        
          className="d-block w-100"
          src={require('../assets/bunner5@2x.png')}
          alt="Third slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
        
          className="d-block w-100"
          src={require('../assets/bunner2@2x.png')}
          alt="Third slide"
        />

      </Carousel.Item>


      

    </Carousel>
    <div  className='some'>
      
      <div className="something">
        <CatalogsItemContainer link='/shoes' image={require('../assets/categoryImage1.png')} prop="взуття" />
      </div>
   
      <div className="something">
        <CatalogsItemContainer link='/clothes' image={require('../assets/categoryImage2.png')} prop="одяг" />
      </div>
      <div className="something">
        <CatalogsItemContainer link='/accessorise' image={require('../assets/categoryImage3.png')} prop="аксесуари" />
      </div>
    </div>
   <div>
   <section className="graphic">
        <div className="new-items">
          <div className="head">
            <div className="title-h2">
              <h2 className="h2">новинки</h2>
            </div>
          </div>
        </div>
      </section>
      <Carousels responsive={responsive} itemClass="carousel-item-padding" containerClass="carousel-container">
        
      <NewProductCardItem 
     
           imageSrc1={require('../assets/newimage.png')}
           imageSrc2={require('../assets/newimage.png')}
           isNew={true}
           isLiked={true}
           descriprion=" Кеди із замшевими вставками на стильній подошві"
           price="2700 uah"
        />
        <NewProductCardItem
          imageSrc1={require('../assets/newimage.png')}
          imageSrc2={require('../assets/newimage.png')}
          isNew={true}
          isLiked={false}
           descriprion=" Кеди із замшевими вставками на стильній подошві"
           price="2700 uah"
        />
          <NewProductCardItem
          imageSrc1={require('../assets/newimage.png')}
          imageSrc2={require('../assets/newimage.png')}
          isNew={true}
          isLiked={false}
           descriprion=" Кеди із замшевими вставками на стильній подошві"
           price="2700 uah"
        />
          <NewProductCardItem
        
          imageSrc1={require('../assets/newimage.png')}
          imageSrc2={require('../assets/newimage.png')}
          isNew={true}
          isLiked={false}
           descriprion=" Кеди із замшевими вставками на стильній подошві"
           price="2700 uah"
        />
          <NewProductCardItem
          
           imageSrc1={require('../assets/newimage.png')}
           imageSrc2={require('../assets/newimage.png')}
           isNew={true}
          isLiked={false}
           descriprion=" Кеди із замшевими вставками на стильній подошві"
           price="2700 uah"
        />
      </Carousels>
      </div>
      <section className="graphic">
        <div className="new-items">
          <div className="head">
            <div className="title-h2">
              <h2 className="h2">образ тижня</h2>
            </div>
          </div>
        </div>
      </section>
    
   <WeeklyPreview image1={require('../assets/look1.png')} image2={require('../assets/look2.png')} image3={require('../assets/look3.png')}   />
   <section className="graphic">
        <div className="new-items">
          <div className="head">
            <div className="title-h2">
              <h2 className="h2">акційні товари</h2>
            </div>
          </div>
        </div>
      </section>
      <Carousels responsive={responsive} itemClass="carousel-item-padding" containerClass="carousel-container">
   <DiscountItem   imageSrc1={require('../assets/newimage.png')}
           imageSrc2={require('../assets/newimage.png')}
           isDiscount={true}
          isLiked={false}
           descriprion=" Кеди із замшевими вставками на стильній подошві"
           price1="2700" 
           price2="1800" 
           ></DiscountItem>
            <DiscountItem   imageSrc1={require('../assets/newimage.png')}
           imageSrc2={require('../assets/newimage.png')}
           isDiscount={true}
          isLiked={false}
           descriprion=" Кеди із замшевими вставками на стильній подошві"
           price1="2700" 
           price2="1800" 
           ></DiscountItem>
            <DiscountItem   imageSrc1={require('../assets/newimage.png')}
           imageSrc2={require('../assets/newimage.png')}
           isDiscount={true}
          isLiked={false}
           descriprion=" Кеди із замшевими вставками на стильній подошві"
           price1="2700" 
           price2="1800" 
           ></DiscountItem>
            <DiscountItem   imageSrc1={require('../assets/newimage.png')}
           imageSrc2={require('../assets/newimage.png')}
           isDiscount={true}
          isLiked={false}
           descriprion=" Кеди із замшевими вставками на стильній подошві"
           price1="2700" 
           price2="1800" 
           ></DiscountItem>
            <DiscountItem   imageSrc1={require('../assets/newimage.png')}
           imageSrc2={require('../assets/newimage.png')}
           isDiscount={true}
          isLiked={false}
           descriprion=" Кеди із замшевими вставками на стильній подошві"
           price1="2700" 
           price2="1800" 
           ></DiscountItem>
            <DiscountItem   imageSrc1={require('../assets/newimage.png')}
           imageSrc2={require('../assets/newimage.png')}
           isDiscount={true}
          isLiked={false}
           descriprion=" Кеди із замшевими вставками на стильній подошві"
           price1="2700" 
           price2="1800" 
           ></DiscountItem>
   </Carousels>
   <Footer />
    </div>
    
  );
};

export default Home;

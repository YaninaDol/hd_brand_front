
import React from 'react';
import Carousels from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PxMainPage from './PxMainPage';
import Carousel from 'react-bootstrap/Carousel';
import CatalogsItemContainer from "./CatalogsItemContainer";
import './CardsContainer.css'
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
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
          src={require('./assets/bunner@2x.png')}
          alt="First slide"
        />
       
      </Carousel.Item>
     
      <Carousel.Item>
        <img
    
          className="d-block w-100"
          src={require('./assets/bunner3@2x.png')}
          alt="Third slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
      
          className="d-block w-100"
          src={require('./assets/bunner4@2x.png')}
          alt="Third slide"
        />

      </Carousel.Item>

      <Carousel.Item>
        <img
        
          className="d-block w-100"
          src={require('./assets/bunner5@2x.png')}
          alt="Third slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
        
          className="d-block w-100"
          src={require('./assets/bunner2@2x.png')}
          alt="Third slide"
        />

      </Carousel.Item>


      

    </Carousel>
    <div  className='some'>
      
      <div className="something">
        <CatalogsItemContainer link='/shoes' image={require('./assets/categoryImage1.png')} prop="взуття" />
      </div>
   
      <div className="something">
        <CatalogsItemContainer link='/clothes' image={require('./assets/categoryImage2.png')} prop="одяг" />
      </div>
      <div className="something">
        <CatalogsItemContainer link='/accessorise' image={require('./assets/categoryImage3.png')} prop="аксесуари" />
      </div>
    </div>
   
    </div>
  );
};

export default Home;

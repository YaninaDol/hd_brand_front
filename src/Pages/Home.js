
import React from 'react';
import Carousels from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PxMainPage from './PxMainPage';
import Carousel from 'react-bootstrap/Carousel';
import CatalogsItemContainer from "../Components/CatalogsItemContainer";
import NewProductCardItem from "../Components/NewProductCardItem";
import '../Components/CardsContainer.css'
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1500 },
    items: 5,
    slidesToSlide: 5,
    partialVisible: false,
    itemWidth: 20, // 20% от ширины экрана
   
  },
  tablet: {
    breakpoint: { max: 760, min: 464 },
    items: 2,
    slidesToSlide: 2,
    itemWidth: 20, // 20% от ширины экрана
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
    itemWidth: 20, // 20% от ширины экрана
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
      <Carousels  responsive={responsive}   itemClass="carousel-item-padding"
      containerClass="carousel-container" >
        
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
    </div>
  );
};

export default Home;

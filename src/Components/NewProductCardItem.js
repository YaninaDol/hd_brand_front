import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import './NewProductCardItem.css';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
const NewProductCardItem = ({id_key, imageSrc1, imageSrc2, isNew, isDiscount, isLiked, descriprion, price1,price2}) => {
  const [isFavourite, setIsFavourite] = useState(isLiked);
    const discountPercentage = ((parseInt(price1) - parseInt(price2)) /parseInt(price1)) * 100;
    const handleLikeClick = () => {
      setIsFavourite(!isFavourite);
    };

  return (
    <Card className="no-gutters" style={{ marginLeft: '15px', marginRight: '15px', border: 'none' }}>
    <MDBCarousel> 
      <MDBCarouselItem itemId={1}>
        <Card.Img
          variant="top"
          style={{ objectFit: 'cover',border: 'none' }}
          className='cardIMG'
          src={imageSrc1}
        />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <Card.Img
          variant="top"
          style={{ objectFit: 'cover',border: 'none' }}
        className='cardIMG'
          src={imageSrc2}
        />
      </MDBCarouselItem>
    </MDBCarousel>
    <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        {isDiscount ? (
            <div className="card3">
            <div className="tag-container4">
              <div className="div13">{discountPercentage.toFixed(0)}%</div>
            </div>
          </div>
          ) : (
            
           <div className="card3">
           <button className="tag-container3">
             <div className="new">{isNew && 'new'}</div>
           </button>
         </div>
          )}


       
        </div>
        <div onClick={handleLikeClick} style={{ width: '50px', position: 'fixed', top: '10px', right: '1px' }}>
        <img
          className="component-25-container"
          loading="eager"
          alt=""
          src={
            isFavourite
              ? require('../assets/icon=favourite, color=white, fill=on.png')
              : require('../assets/component-25-container.png')
          }
        />
      </div>
        <Card.Body style={{ paddingTop: '10px' }}>
          <Card.Text>
          <div  className="description-price">{descriprion}</div>
          </Card.Text>
          <Card.Title style={{textAlign: 'left'}}>
          {isDiscount ? (
            <div  className="price4" style={{display:'inline-block'}}>
              <div  className="uah8">{price1} &#8372;</div>
              <div className="uah9">{price2} &#8372;</div>
            </div>
          ) : (
            <div className="price3"style={{display:'inline-block'}}>
              <div  className="uah7">{price1} &#8372;</div>
            </div>
          )}
        </Card.Title>
        </Card.Body>
      </Card>
  
  );
};

export default NewProductCardItem;

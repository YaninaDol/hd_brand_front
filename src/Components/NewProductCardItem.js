import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import './NewProductCardItem.css';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
const NewProductCardItem = ({ imageSrc1, imageSrc2, isNew, isLiked, descriprion, price }) => {
  const [isFavourite, setIsFavourite] = useState(isLiked);

  const handleLikeClick = () => {
    alert('Like clicked!');
    setIsFavourite(!isFavourite);
  };

  return (
    <Card  className="img-fluid no-gutters" style={{  marginLeft: '15px', marginRight:'15px', border: 'none' }}>
    <Carousel >
      <Carousel.Item>
        <Card.Img   variant="top" style={{borderTopLeftRadius:'0px',borderTopRightRadius:'0px'}}   className="img-fluid" src={imageSrc1} />
      </Carousel.Item>
      <Carousel.Item>
        <Card.Img variant="top" style={{borderTopLeftRadius:'0px',borderTopRightRadius:'0px'}}  className="img-fluid" src={imageSrc2} />
      </Carousel.Item>
    </Carousel>
    <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
      <div className="head3">
        <button className="tag-container3">
          <div className="new">{isNew && 'new'}</div>
        </button>
      </div>
    </div>
    <div  onClick={handleLikeClick}  style={{width:'50px', position: 'absolute', top: '10px', right: '15px' }}>
     
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
    <Card.Body style={{ padding: '0px' }}>
      <Card.Text >
        <div className="div12">{descriprion}</div>
      </Card.Text>
      <Card.Title>
        <div className="price3">
          <div className="uah7">{price}</div>
        </div>
      </Card.Title>
    </Card.Body>
  </Card>
  );
};

export default NewProductCardItem;

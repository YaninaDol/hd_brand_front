import "./DiscountItem.css";
import React, { useState } from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

import { Card } from 'react-bootstrap';
const DiscountItem = ({ imageSrc1, imageSrc2, isDiscount, isLiked, descriprion, price1,price2 }) => {
    const discountPercentage = ((parseInt(price1) - parseInt(price2)) /parseInt(price1)) * 100;
   
    const [isFavourite, setIsFavourite] = useState(isLiked);

    const handleLikeClick = () => {
      alert('Like clicked!');
      setIsFavourite(!isFavourite);
    };
  
  return (
    // <div className="item-card3">
    //   <div className="card3">
    //     <img className="image-icon6" alt="" src={image} />
    //     <div className="tag-container-container">
    //       <div className="tag-container4">
    //         <div className="div13">-25%</div>
    //       </div>
    //       <img className="icon3" alt="" src="/icon.svg" />
    //     </div>
    //     <div className="pagination-wrapper">
    //       <div className="pagination5">
    //         <div className="pagination-element16" />
    //         <div className="pagination-element17" />
    //         <div className="pagination-element18" />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="description3">
    //     <div className="text3">
    //       <div className="frame-div">
    //         <div className="div14">
    //           <span className="txt3">
    //             <p className="p17">Кеди із замшевими вставками</p>
    //             <p className="p18">на стильній подошві</p>
    //           </span>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="price4">
    //       <div className="uah8">2700 uah</div>
    //       <div className="uah9">1800 uah</div>
    //       <img
    //         className="shopping-bag-1-icon3"
    //         alt=""
    //         src="/shoppingbag-1.svg"
    //       />
    //     </div>
    //   </div>
    // </div>
    <Card  className="img-fluid no-gutters" style={{  marginLeft: '15px', marginRight:'15px', border: 'none' }}>
      <MDBCarousel  >
      <MDBCarouselItem itemId={1}>
        <Card.Img   variant="top" style={{borderTopLeftRadius:'0px',borderTopRightRadius:'0px'}}   className="img-fluid" src={imageSrc1} />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <Card.Img variant="top" style={{borderTopLeftRadius:'0px',borderTopRightRadius:'0px'}}  className="img-fluid" src={imageSrc2} />
        </MDBCarouselItem>
    </MDBCarousel>
    <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
      <div className="card3">
        <div className="tag-container4">
          <div className="div13">{discountPercentage.toFixed(0)}%</div>
        </div>
      </div>
    </div>
    <div  onClick={handleLikeClick}  style={{width:'50px', position:'fixed', top: '10px', right: '15px' }}>
     
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
        <div className="price4">
          <div className="uah8">{price1} uah</div>
          <div className="uah9">{price2} uah</div>
        </div>
      </Card.Title>
    </Card.Body>
  </Card>
  );
};

export default DiscountItem;

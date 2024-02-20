
import { CardGroup,Card } from 'react-bootstrap';
import React from 'react';
import './WeeklyPreview.css'
const WeeklyPreview = ({ image1, image2, image3 }) => {
  return (
    <CardGroup className="d-flex flex-row flex-sm-row">
     
     
        <Card  style={{marginRight:'15px',marginLeft:'15px', border: 'none'}}>
      <Card.Img variant="center" style={{borderTopLeftRadius:'0px',borderTopRightRadius:'0px'}} className="img-fluid"  src={image1} />
      </Card>
      <Card   style={{ border: 'none'}}>
      <Card.Img variant="center" style={{borderTopLeftRadius:'0px',borderTopRightRadius:'0px'}}  className="img-fluid" src={image2} />
      </Card>
      <Card  style={{marginRight:'15px',marginLeft:'15px', border: 'none'}}>
      <Card.Img variant="center" style={{borderTopLeftRadius:'0px',borderTopRightRadius:'0px'}}  className="img-fluid" src={image3} />
      </Card>
     
      <div className="button-block d-flex flex-column align-items-center">
        <div className="block-elements">
          <div className="circle-elements">
            <img className="circle-element-icon" alt="" src={image1} />
            <img className="circle-element-icon1" alt="" src={image2} />
            <img className="circle-element-icon2" alt="" src={image3} />
          </div>
          <button className="button-container">
            <div className="div1">Збери весь образ</div>
          </button>
        </div>
      </div>
     

    
    </ CardGroup>
  );
};

export default WeeklyPreview;


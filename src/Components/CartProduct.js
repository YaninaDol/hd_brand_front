import React, { useState, useEffect } from 'react';
import { Card,Spinner } from 'react-bootstrap';
import axios from 'axios';
import './NewProductCardItem.css';
import "./DiscountItem.css";
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

const CartProduct = ({ id_key, imageSrc1, imageSrc2,imageSrc3,video, isNew, isDiscount, isLiked, descriprion, price1, price2,currency }) => {
  const [isFavourite, setIsFavourite] = useState(isLiked);
  const [loading, setLoading] = useState(true);
  const discountPercentage = ((parseInt(price1) - parseInt(price2)) / parseInt(price1)) * 100;

  useEffect(() => {
    axios({method:'post',
    url:`https://localhost:7269/api/Authenticate/getlike?prodId=${id_key}`,
  headers: {         'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                }})
     .then(response => {

 
      setIsFavourite(response.data);


})
.catch(error => console.error('Error fetching products:', error));
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

   
    return () => clearTimeout(loadingTimeout);
  }, []);

  const handleLikeClick = () => {
    setIsFavourite(!isFavourite);
    

      axios({method:'post',
      url:`https://localhost:7269/api/Authenticate/setLike?prodId=${id_key}&like=${!isFavourite}`,
    headers: {         'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                  }})
       .then(response => {
       

  
  })
  .catch(error => console.error('Error fetching products:', error));
    


  };
  function changeImg(path) {
  
    let lastIndex = path.lastIndexOf('/');
    let fileName = path.substring(lastIndex + 1); 
    return require(`../assets/${fileName}`);
  }
  return (
    <Card id={id_key} className='cart-item' style={{ marginLeft: '15px', marginRight: '15px', marginTop: '5px', border: 'none', marginBottom: '25px', position: 'relative' }}>
      {loading ? (
       
       <Spinner variant="secondary"  animation="grow" />
      ) : (
      
        <>
          <MDBCarousel>
          {imageSrc1 && (   <MDBCarouselItem itemId={1}>
              <Card.Img id='id_img' variant="top" style={{  borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }} src={changeImg(imageSrc1)} />
            </MDBCarouselItem>)}
            {imageSrc2 && (   <MDBCarouselItem itemId={2}>
              <Card.Img   id='id_img'  variant="top" style={{ borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}  src={changeImg(imageSrc2)} />
            </MDBCarouselItem>)}
            {imageSrc3 && (   <MDBCarouselItem itemId={3}>
              <Card.Img   id='id_img'  variant="top" style={{ borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}  src={changeImg(imageSrc2)} />
            </MDBCarouselItem>)}
            {video && (   <MDBCarouselItem itemId={4}>
              <Card.Img   id='id_img'  variant="top" style={{ borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}  src={changeImg(imageSrc2)} />
            </MDBCarouselItem>)}
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
          <div  onClick={handleLikeClick} style={{color:'white', width: '40px', position: 'absolute', top: '10px', right: '5px' }}>
          { isFavourite
                  ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg>
                  :<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg>
          }
          </div>
         
          <Card.Body style={{ paddingTop: '10px' }}>
            <Card.Text>
              <div className="div12">{descriprion}</div>
            </Card.Text>
            <Card.Title style={{ textAlign: 'center' }}>
              {isDiscount ? (
                <div className="price4" style={{ display: 'inline-block' }}>
                  <div className="uah8">{price1}{currency}</div>
                  <div className="uah9">{price2} {currency}</div>
                </div>
              ) : (
                <div className="price3" style={{ display: 'inline-block' }}>
                  <div className="uah7">{price1} {currency}</div>
                </div>
              )}
            </Card.Title>
          </Card.Body>
        </>
      )}
    </Card>
  );
};

export default CartProduct;

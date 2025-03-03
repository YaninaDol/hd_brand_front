import React, { useState, useEffect } from 'react';
import { Card,Spinner } from 'react-bootstrap';
import axios from 'axios';
import './NewProductCardItem.css';
import "./DiscountItem.css";
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import { Link} from "react-router-dom";
const CartProductClick = ({ id_key, imageSrc1, imageSrc2,imageSrc3,isNew, isDiscount, isLiked, descriprion, price1, price2,currency,link }) => {
  const [isFavourite, setIsFavourite] = useState(isLiked);
  const [loading, setLoading] = useState(true);
  const discountPercentage = ((parseInt(price1) - parseInt(price2)) / parseInt(price1)) * 100;
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    if(window.sessionStorage.getItem("AccessToken"))
    {
    axios({method:'post',
    url:`${API_BASE_URL}/api/Authenticate/getlike?prodId=${id_key}`,
  headers: {         'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                }})
     .then(response => {

 
      setIsFavourite(response.data);


})
.catch(error => console.log(''));


  }
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

   
    return () => clearTimeout(loadingTimeout);
  
  }, []);

  const handleItemClick = () => {
    sessionStorage.setItem('selectedProduct', id_key); 
  };


  const handleLikeClick = () => {
    setIsFavourite(!isFavourite);

      axios({method:'post',
      url:`${API_BASE_URL}/api/Authenticate/setLike?prodId=${id_key}&like=${!isFavourite}`,
    headers: {         'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                  }})
       .then(response => {
       

  
  })
  .catch(error => console.log(''));
    


  };
  
  return (
    <div onClick={handleItemClick} style={{ cursor: 'pointer' }}>
    <Card
    key={id_key}
    id={id_key}
    className="cart-item_"
    style={{
      margin: '0', // Убираем внешний отступ
      border: 'none',
      position: 'relative',
      width: '100%', // Карточка занимает всю ширину своей ячейки
    }}
  >
    {loading ? (
      <div className="spinner-container">
        <Spinner variant="secondary" animation="grow" />
      </div>
    ) : (
      <>
        {imageSrc1 && (
          <MDBCarouselItem itemId={1}>
              <Link to={link}>
            <Card.Img
  id="id_img_"
  variant="top"
  style={{
    width: '100%', // Заполняет ширину карточки
    aspectRatio: '3 / 4', // Соотношение сторон 4:3
    objectFit: 'cover', // Обрезка по краям
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
  }}
  src={imageSrc1}
/>
</Link>
          </MDBCarouselItem>
        )}
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
        <div
          onClick={handleLikeClick}
          style={{
            color: 'white',
            width: '40px',
            position: 'absolute',
            top: '10px',
            right: '5px',
          }}
        >
          {isFavourite ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>
          )}
        </div>
        <Link to={link}>
        <Card.Body style={{ paddingTop: '5px' }}>
       
          <Card.Text>
            <div className="div12 text-center">{descriprion}</div>
          </Card.Text>
          <Card.Title style={{ textAlign: 'center' }}>
            {isDiscount ? (
              <div className="price4" style={{ display: 'inline-block' }}>
                <div className="uah8">
                  {price1}
                  {currency}
                </div>
                <div className="uah9">
                  {price2} {currency}
                </div>
              </div>
            ) : (
              <div className="price3" style={{ display: 'inline-block' }}>
                <div className="uah7">
                  {price1} {currency}
                </div>
              </div>
            )}
          </Card.Title>
        </Card.Body>
        </Link>
      </>
    )}
  </Card>
  </div>
  );
};

export default CartProductClick;

import { useEffect, useState } from "react";
import axios from 'axios';
import { CardGroup, Card } from 'react-bootstrap';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './WeeklyPreview.css';
import WeeklyModalItem from './WeeklyModalItem';
import BasketModal from '../Components/BasketModal';

const WeeklyPreview = ({ weekly, convertPrice,selectedCurrency }) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [arrBasket, setArrBasket] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [size1, setSize1] = useState(null);
  const [size2, setSize2] = useState(null);
  const [size3, setSize3] = useState(null);
  const [copy, setCopy] = useState([]);
  const getSizes = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Product/GetSizeofProduct?id=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sizes:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const sizesData = await Promise.all(weekly.map((item) => getSizes(item.id)));
      setSizes(sizesData);
    };

    fetchData();

    const storedBasket = window.sessionStorage.getItem("Basket");
    if (storedBasket) {
      const parsedBasketData = JSON.parse(storedBasket);
      setArrBasket(parsedBasketData);
    }
  }, [weekly]);






  const addSize = (size,index) => {
   if (index==0)
   {
    setSize1(size);
   
    
   }
   else if(index==1)
   {
    setSize2(size);
   

   }
   else
   {
    setSize3(size);
    
   }

  };
  const [showM, setshowM] = useState(false);
  const handleCloseM = () => setshowM(false);
  const handleShowM = () => setshowM(true);

  const addToBasket = () => {
    const selectedSizes = [size1, size2, size3].filter((size) => size !== null);
  
    if (selectedSizes.length > 0) {
     
      const storedBasket = window.sessionStorage.getItem("Basket");
      const existingBasket = storedBasket ? JSON.parse(storedBasket) : [];
  
      // Update quantities for existing sizes
      selectedSizes.forEach((selectedSize) => {
        const existingItem = existingBasket.find((item) => item.id === selectedSize.id);
  
        if (existingItem) {
          // If the size already exists, update its quantity
          existingItem.quantity += 1;
        } else {
         
          existingBasket.push({ ...selectedSize, quantity: 1 });
        }
      });
  
      
      window.sessionStorage.setItem("Basket", JSON.stringify(existingBasket));
  
     handleClose();
      
  
    
      setSize1(null);
      setSize2(null);
      setSize3(null);
      handleShowM();
     
     
    } else {
      
      alert("Оберіть розміри для товарів.");
    }
  };
  const showModal = () => {
    handleShow();
  };


  return (
    <div>
        <BasketModal show={showM} handleClose={handleCloseM} convertPrice={convertPrice} />
       {/* <Modal show={showM} onHide={handleCloseM}>
        <Modal.Header closeButton>
        <Modal.Body>Товар додано до кошику </Modal.Body>
        </Modal.Header>
      
      
      </Modal> */}
      <Modal id='basket' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Обрані товари</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {weekly.map((x, index) => (
            <WeeklyModalItem
              key={index}
              unic={x.id}
              name={x.name}
              sizes={sizes[index]}
              picture={x.image}
              price={convertPrice(x.price,selectedCurrency)}
              currency={selectedCurrency}
              choosesize={(size) => addSize(size, index)}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button style={{borderRadius:'0px'}} variant="outline-dark" onClick={handleClose}>
          Продовжити
          </Button> */}
          <Button style={{borderRadius:'0px'}} variant="dark" onClick={addToBasket}>
            Додати у кошик
          </Button>
        </Modal.Footer>
      </Modal>

      <CardGroup style={{ marginBottom: '15px' }}>
        {weekly.map((x) => (
          <Card key={x.id} style={{ marginRight: '15px', marginLeft: '15px', border: 'none' }}>
            <Card.Img variant="center" style={{ height: '90%', borderTopLeftRadius: '0px', borderTopRightRadius: '0px',aspectRatio:'3/4',position:'relative',objectFit:'cover' }} className="img-fluid" src={x.image} />
          </Card>
        ))}
        <div className="button-block d-flex flex-column align-items-center">
          <div className="block-elements">
            <div className="circle-elements">
              {weekly.map((x) => (
                <img key={x.id} className="circle-element-icon" alt="" src={x.image} />
              ))}
            </div>
            <button onClick={showModal} className="button-container">
              <div className="div1">Збери весь образ</div>
            </button>
          </div>
        </div>
      </CardGroup>
    </div>
  );
};

export default WeeklyPreview;

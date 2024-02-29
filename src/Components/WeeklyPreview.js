import { useEffect, useState } from "react";
import axios from 'axios';
import { CardGroup, Card } from 'react-bootstrap';
import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './WeeklyPreview.css';
import WeeklyModalItem from './WeeklyModalItem';

const WeeklyPreview = ({ weekly, generatePath }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [arrBasket, setArrBasket] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [copy, setCopy] = useState([]);
  const getSizes = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7269/api/Product/GetSizeofProduct?id=${id}`);
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

  const addToBasket = () => {
    // Retrieve the existing basket from sessionStorage
    const storedBasket = window.sessionStorage.getItem("Basket");
    const existingBasket = storedBasket ? JSON.parse(storedBasket) : [];

    // Create a new array that includes both the existing items and the new sizes from the state
    const updatedBasket = [...existingBasket, ...copy];

    // Save the updated basket to sessionStorage
    window.sessionStorage.setItem("Basket", JSON.stringify(updatedBasket));

    // Inform the user
    alert("Додано!");
window.location.reload();
    // Optionally, reset the state to clear the selected sizes
    setCopy([]);
  };

  const showModal = () => {
    handleShow();
  };

  const addSize = (size) => {
   
    setCopy((prevCopy) => [...prevCopy, size]);
  };


  return (
    <div>
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
              price={x.price}
              choosesize={(size) => addSize(size)}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button style={{borderRadius:'0px'}} variant="outline-dark" onClick={handleClose}>
          Продовжити
          </Button>
          <Button style={{borderRadius:'0px'}} variant="dark" onClick={addToBasket}>
            Додати у кошик
          </Button>
        </Modal.Footer>
      </Modal>

      <CardGroup style={{ marginBottom: '15px' }}>
        {weekly.map((x) => (
          <Card key={x.id} style={{ marginRight: '15px', marginLeft: '15px', border: 'none' }}>
            <Card.Img variant="center" style={{ height: '90%', borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }} className="img-fluid" src={x.image} />
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

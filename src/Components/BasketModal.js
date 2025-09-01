import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { MDBRow, MDBCol, MDBTypography } from 'mdb-react-ui-kit';
import CartBasket from './CartBasket';
import { useEffect, useState } from "react";
import axios from 'axios';
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const BasketModal = ({
  show,
  handleClose,
  selectedCurrency,
  convertPrice
}) => {
  const [arrBasket, setArrBasket] = useState([]);
  const [count, setCount] = useState(0);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const storedBasket = window.localStorage.getItem("Basket");
    if (storedBasket) {
      const parsedBasketData = JSON.parse(storedBasket);
      // checkImages(parsedBasketData);
      checkProductsVisibility(parsedBasketData);
    }
  }, [show]);

  // const checkImages = (basket) => {
  //   const validItems = [];

  //   let checkedCount = 0;
  //   basket.forEach((item) => {
  //     const img = new Image();
  //     img.src = item.image;
  //     img.onload = () => {
  //       validItems.push(item);
  //       checkedCount++;
  //       if (checkedCount === basket.length) {
  //         updateBasket(validItems);
  //       }
  //     };
  //     img.onerror = () => {
  //       checkedCount++;
  //       if (checkedCount === basket.length) {
  //         updateBasket(validItems);
  //       }
  //     };
  //   });
  // };
const checkProductsVisibility = async (basket) => {
  const validItems = [];
   
  for (const item of basket) {
  
    try {
      const res = await axios.get(`${API_BASE_URL}/api/Product/GetProductById?id=${item.productid}`);
      const product = res.data.value;

      if (product && product.visible === true) {
        
        validItems.push(item);
      }
    } catch (err) {
     
    }
  }

  updateBasket(validItems);
};

  const updateBasket = (basket) => {
    setArrBasket(basket);
    const totalCount = basket.reduce((sum, item) => sum + item.quantity, 0);
    setCount(totalCount);
    window.localStorage.setItem("Basket", JSON.stringify(basket));
  };

  const removeBasket = (id, insulator) => {
    const updatedBasket = arrBasket.filter(item => !(item.id === id && item.insulator === insulator));
    updateBasket(updatedBasket);
  };

  const decrementQuantity = (id, insulator) => {
    const updatedBasket = arrBasket.map(item =>
      item.id === id && item.insulator === insulator && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateBasket(updatedBasket);
  };

  const incrementQuantity = (id, insulator) => {
    const updatedBasket = arrBasket.map(item =>
      item.id === id && item.insulator === insulator
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateBasket(updatedBasket);
  };

  const getOrder = () => {
    if (arrBasket.length > 0) {
      window.location.href = '/checkout';
    }
  };

  return (
    <Modal className="h-100 h-custom" id='basket' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('basket')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {arrBasket.length < 1 ? (
          <p>{t('emptybasket')}</p>
        ) : (
          <>
            <MDBRow id='titleRow' className="justify-content-between align-items-center">
              <MDBCol md="1" lg="1" xl="1"></MDBCol>
              <MDBCol md="3" lg="3" xl="3"></MDBCol>
              <MDBCol md="3" lg="3" xl="3" className="text-center">
                {t('product')}
              </MDBCol>
              <MDBCol md="2" lg="2" xl="2">
                {t('count')}
              </MDBCol>
              <MDBCol md="2" lg="2" xl="3" className="text-center">
                <MDBTypography tag="h7" className="mx-2">
                  {t('price')}
                </MDBTypography>
              </MDBCol>
            </MDBRow>
            {arrBasket.map((x) => (
              <CartBasket
                key={x.id}
                selectedCurrency={selectedCurrency}
                remove={removeBasket}
                unic={x.id}
                name={i18n.language === 'en' ? x.nameEng : x.name}
                quantity={x.quantity}
                size={x.size}
                insulator={x.insulator}
                picture={x.image}
                price1={convertPrice(x.price, selectedCurrency)}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
              />
            ))}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" style={{ borderRadius: '0px' }} onClick={handleClose}>
          {t('continue')}
        </Button>
        <Button variant="dark" style={{ borderRadius: '0px' }} onClick={getOrder}>
          {t('checkout')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BasketModal;

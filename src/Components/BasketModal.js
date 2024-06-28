import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { MDBRow, MDBCol, MDBTypography } from 'mdb-react-ui-kit';
import CartBasket from './CartBasket'; // Adjust the import path according to your project structure
import { useEffect,useState } from "react";
const BasketModal = ({
  show,
  handleClose,
  selectedCurrency,
  convertPrice
}) => {
    const [arrBasket,setArrBasket] = useState([]);
    const [count, setCount] = useState(0);
    const {i18n, t } = useTranslation();
  useEffect(() => {
    const storedBasket = window.sessionStorage.getItem("Basket");
    if (storedBasket && storedBasket.length > 0) {
      const parsedBasketData = JSON.parse(storedBasket);
      setArrBasket(parsedBasketData);
      const totalCount = parsedBasketData.reduce((sum, item) => sum + item.quantity, 0);
      setCount(totalCount);
    }
  }, [show]);

  const removeBasket = (id) => {
    let prod = arrBasket.find(item => item.id === id);
    if (prod) {
      setCount(count - prod.quantity);
      const updatedBasket = arrBasket.filter(item => item.id !== id);
      setArrBasket(updatedBasket);
      window.sessionStorage.setItem("Basket", JSON.stringify(updatedBasket));
    }
  };

  const decrementQuantity = (id) => {
    let prod = arrBasket.find(item => item.id === id);
    if (prod && prod.quantity > 1) {
      const updatedBasket = arrBasket.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      const filteredBasket = updatedBasket.filter(item => item.quantity > 0);
      setArrBasket(filteredBasket);
      window.sessionStorage.setItem("Basket", JSON.stringify(filteredBasket));
    }
  };

  const incrementQuantity = (id) => {
    let prod = arrBasket.find(item => item.id === id);
    if (prod) {
      const updatedBasket = arrBasket.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setArrBasket(updatedBasket);
      window.sessionStorage.setItem("Basket", JSON.stringify(updatedBasket));
    }
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
              ></CartBasket>
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

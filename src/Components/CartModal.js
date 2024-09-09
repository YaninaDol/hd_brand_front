import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import BasketModal from '../Components/BasketModal';
import { useTranslation } from 'react-i18next';

function Cart({showM, showB, convertPrice }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    
    setShowModal(showM);
    setShowModalB(showB);
  }, [showM, showB]);

  const handleClose = () => {
   
    setShowModal(false);  
    setShowModalB(true);  
  };

  const handleCloseM = () =>{setShowModalB(false);  };
  
  const handleAddSpray = () => {
  
    //addToCart({ id: 'spray', name: 'Shoe Care Spray', price: 100 });
    handleClose();  
   
  };

  return (
    <>
      {/* Остальные компоненты корзины */}
      <BasketModal show={showModalB} handleClose={handleCloseM} convertPrice={convertPrice} />
      
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Спрей для замшевого взуття</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Чи хочете ви додати до кошика?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ні, дякую
          </Button>
          <Button variant="primary" onClick={handleAddSpray}>
            {t('add')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cart;

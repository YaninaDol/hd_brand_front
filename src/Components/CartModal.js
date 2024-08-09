import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
function Cart({ cartItems, addToCart }) {
  const [showModal, setShowModal] = useState(false);
  const {t,i18n } = useTranslation();
  useEffect(() => {
    // Check if any shoe in the cart has an article containing 'z'
    const hasShoeWithZ = cartItems.some(item => item.article.includes('z'));

    if (hasShoeWithZ) {
      setShowModal(true);
    }
  }, [cartItems]);

  const handleClose = () => setShowModal(false);

  const handleAddSpray = () => {
    // Add spray to the cart
    addToCart({ id: 'spray', name: 'Shoe Care Spray', price: 10 });
    handleClose();
  };

  return (
    <>
      {/* Other cart components */}

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

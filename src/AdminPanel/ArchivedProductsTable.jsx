import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

export default function ArchivedProductsTable() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const allProducts = useSelector(state => state.products);
  const [archivedProducts, setArchivedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [idToDelete, setIdToDelete] = useState(null);
  const [showRemove, setShowRemove] = useState(false);

  const handleCloseRemove = () => setShowRemove(false);
  const handleShowRemove = () => setShowRemove(true);

 useEffect(() => {
  axios.get(`${API_BASE_URL}/api/Product/GetNOVisibleProducts`)
    .then(response => {
      setArchivedProducts(response.data);
      setFilteredProducts(response.data);
    })
    .catch(error => console.error('Error fetching products:', error));
}, []); 


  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const result = archivedProducts.filter(
      prod =>
        prod.article.toLowerCase().includes(lowerQuery) ||
        prod.id.toString().includes(lowerQuery)
    );
    setFilteredProducts(result);
  }, [searchQuery, archivedProducts]);

  const handleRestore = async (id) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('visible', true);
    try {
      await axios.post(`${API_BASE_URL}/api/Product/SetVisibility`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + window.sessionStorage.getItem("AccessToken")
        }
      });
      alert("Товар відновлено");
      window.location.reload();
    } catch (err) {
        console.error(err);
      alert("Помилка при оновленні видимості");
    }
  };

  const confirmDelete = async () => {
    const formData = new FormData();
    formData.append('id', idToDelete);

    try {
      await axios.post(`${API_BASE_URL}/api/Product/Delete`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + window.sessionStorage.getItem("AccessToken")
        }
      });
      alert("Товар остаточно видалений");
      handleCloseRemove();
      window.location.reload();
    } catch (err) {
      alert("Помилка при видаленні");
    }
  };

  return (
    <div className="p-3">
      <h2 className="text-center mb-4">Архів товарів</h2>

      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Пошук за ID або Артикулом..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Артикул</th>
            <th>Фото</th>
            <th>Назва</th>
            <th>Відновити</th>
            <th>Видалити повністю</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(prod => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.article}</td>
              <td>
                {prod.image && <img src={prod.image} alt="Фото" width={50} />}
              </td>
              <td>{prod.name}</td>
              <td>
                <Button variant="success" onClick={() => handleRestore(prod.id)}>
                  Повернути
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => { setIdToDelete(prod.id); handleShowRemove(); }}>
                  Видалити
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showRemove} onHide={handleCloseRemove}>
        <Modal.Header closeButton>
          <Modal.Title>Підтвердження видалення</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ви впевнені, що хочете остаточно видалити товар?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRemove}>
            Відміна
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Так, видалити
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

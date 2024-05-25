// CategoryTable.js
import React, { useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBInput} from 'mdb-react-ui-kit';
import CategoryTableItem from './CategoryTableItem';

import Button from 'react-bootstrap/Button';
const CategoryTable = ({ type,categories, onAddCategory, onDeleteCategory, onUpdateCategory }) => {
  const [addCategoryHide, setAddCategoryHide] = useState('hidden');
  const [addCatName, setAddCatName] = useState('');

  const [updateCategoryHide, setUpdateCategoryHide] = useState('hihdden');
  const [updateCatId, setUpdateCatId] = useState(0);
  const [updateCatName, setUpdateCatName] = useState('');

  const handleAddCategory = () => {
    onAddCategory(type,addCatName);
    setAddCatName('');
    setAddCategoryHide('hidden');
  };

  const handleUpdateCategory = () => {
    onUpdateCategory(type,updateCatId,updateCatName);
    setUpdateCategoryHide('hidden');
  };

  const handleUpdateBtn = (id, name) => {
    setUpdateCatId(id);
    setUpdateCatName(name);
    setUpdateCategoryHide('');
  };
  
  return (
    <div>
      <h1 style={{ marginLeft: 30 }}>{type}</h1>

      <MDBTable>
        <Button variant='dark' onClick={() => setAddCategoryHide('')}>
          + Додати
        </Button>

        <MDBTableHead dark>
          <tr>
            <th scope='col'></th>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Actions</th>
            <th scope='col'></th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {categories.map((x) => (
            <CategoryTableItem key={x.id} id={x.id} unic={x.id} type={type} name={x.name?x.name:x.value} delete={onDeleteCategory} updateBtn={handleUpdateBtn} />
          ))}
          <tr hidden={addCategoryHide}>
            <th scope='row'></th>
            <td></td>
            <td>
              <MDBInput onChange={(e) => setAddCatName(e.target.value)} type='text' />
            </td>
            <td>
              <Button onClick={handleAddCategory} variant='dark'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
</svg>
              </Button>
            </td>
          </tr>

          <tr hidden={updateCategoryHide}>
            <th scope='row'></th>
            <td>
              <MDBInput disabled value={updateCatId} type='text' />
            </td>
            <td>
              <MDBInput onChange={(e) => setUpdateCatName(e.target.value)} value={updateCatName} type='text' />
            </td>
            <td>
              <Button onClick={handleUpdateCategory} variant='dark'>
                Confirm to database
              </Button>
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default CategoryTable;

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
          + Add new category
        </Button>

        <MDBTableHead dark>
          <tr>
            <th scope='col'></th>
            <th scope='col'>#</th>
            <th scope='col'>Category Name</th>
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
                Confirm to database
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

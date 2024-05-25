
import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import CategoryTableItem from './CategoryTableItem';
import CategoryTable from './CategoryTable';
import { connect,useDispatch,useSelector } from 'react-redux';
import {MDBBtn,MDBInputGroup,MDBCheckbox , MDBTable, MDBTableHead, MDBTableBody, MDBInput } from 'mdb-react-ui-kit';
import { setProducts, setUsers, addProduct, deleteUser,setSizes,setProductSizes,deleteProduct,setCategories,editProduct,setMaterials,setSeasons,setSubCategories, addSubCategory } from '../redux/actions';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CategorySpecification = () => {
  
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [addCategoryHide,setAddCategoryHide] = useState("hidden");
    const [addCatName,setAddCatName] = useState("");

    const [updateCategoryHide,setUpdateCategoryHide] = useState("hidden");
    const [UpdateCatId,setUpdateCatId] = useState(0);
    const [UpdateCatName,setUpdateCatName] = useState("");
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    const subcategories = useSelector(state => state.subcategories);
    const materials = useSelector(state => state.materials);
    const seasons = useSelector(state => state.seasons);
    const sizes = useSelector(state => state.sizes);
  

    useEffect(()=>

    {
    

     
     
  
      axios.get(`${API_BASE_URL}/api/Specification/GetAllCategory`)
      .then(response => {
        
        dispatch(setCategories(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));

      axios.get(`${API_BASE_URL}/api/Specification/GetAllMaterials`)
      .then(response => {
       
        dispatch(setMaterials(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));
      axios.get(`${API_BASE_URL}/api/Specification/GetAllSubCategories`)
      .then(response => {
       
        dispatch(setSubCategories(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));
      axios.get(`${API_BASE_URL}/api/Specification/GetAllSeasons`)
      .then(response => {
       
        dispatch(setSeasons(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));
    }, [dispatch]);


  

  function deletecategory(type,id)
  {
     
    var bodyFormData = new FormData();
    bodyFormData.append('id', id);
                axios (
  
                  {
                  method:'post',
                  url:`${API_BASE_URL}/api/Specification/Delete${type}`,
                  data:bodyFormData,
                  headers: {
                    'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
                          'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                  },
                 
                  }
  
  
  
              ).then  (res=>
              {
                if(res.data.statusCode==400)
               alert('Помилка! В категорії є товари !')
                else
                {
                  alert('Категорія успішно видалена ')
                   window.location.reload();
                }
                
                 
              });  
  
  }
function addCategory(type,name)
{

    
    var bodyFormData = new FormData();
  bodyFormData.append('Name', name);

    axios (

                {
                method:'post',
                url:`${API_BASE_URL}/api/Specification/Add${type}`,
                data:bodyFormData,
                headers: {
                  'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
                        'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                },
               
                }



            ).then  (res=>
            {
              alert('Категорія успішно добавлена ')
              
               window.location.reload();
               
            });  
        


}


function updateCategory(type,id,name)
{
    
    var bodyFormData = new FormData();
  bodyFormData.append('id', id);
  bodyFormData.append('newName', name);
              axios (

                {
                method:'post',
                url:`${API_BASE_URL}/api/Specification/Update${type}`,
                data:bodyFormData,
                headers: {
                  'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
                        'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                },
               
                }



            ).then  (res=>
            {
              alert("Category updated successfull")
             
               window.location.reload();
               
            });  



}

//update btn
 function updateBtn(id,name)
 {
  setUpdateCatId(id);
  setUpdateCatName(name);
  setUpdateCategoryHide("");

 }
  return (
    <div >
  


      <CategoryTable categories={categories} type='Category' onAddCategory={addCategory} onDeleteCategory={deletecategory} onUpdateCategory={updateCategory} />
      <CategoryTable categories={materials} type='Material' onAddCategory={addCategory} onDeleteCategory={deletecategory} onUpdateCategory={updateCategory} />
      <CategoryTable categories={subcategories} type='Subcategory' onAddCategory={addCategory} onDeleteCategory={deletecategory} onUpdateCategory={updateCategory} />
      <CategoryTable categories={seasons} type='Season' onAddCategory={addCategory} onDeleteCategory={deletecategory} onUpdateCategory={updateCategory} />
     
    </div>
  );
};

export default CategorySpecification;

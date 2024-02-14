import React, { useEffect, useState } from 'react';
import { connect,useDispatch,useSelector } from 'react-redux';
import { setProducts, setUsers, addProduct, deleteUser } from './actions';
import axios from 'axios';


const AdminPanel = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);



  // useEffect(() => {


 
  //   axios.get('https://localhost:7269/api/Authenticate/getUsers')
  //     .then(response => dispatch(setUsers(response.data)))
  //     .catch(error => console.error('Error fetching users:', error));
  // }, [dispatch]);

function postrequest()
{
  const products = [];
products.push({
    id: "1", // id товару
    name: "артикул", // назва товару
    costPerItem: "100", // ціна
    amount: "1", // кількість
    description: "", // опис товарної позиції в заявці
    discount: "", // знижка, задається в % або в абсолютній величині
    sku: "артикул200", // артикул (SKU) товару
});

const salesdriveUrl = "https://wdclotheshop.salesdrive.me/handler/";
const express = require('express');
const cors = require('cors');
const salesdriveValues = {
    form: "94pE9E24qErPymNKcJcXdLYDq_dsGWRZ6-CZqkIsfdj_DDWX5QmdAh9HTF",
    getResultData: "1", // Отримувати дані створеної заявки (0 - не отримувати, 1 - отримувати)
    products: products, //Товари/Послуги
    comment: "", // Коментар
    fName: "TestUser", // Ім'я
    lName: "User", // Прізвище
    mName: " ", // По батькові
    phone: "0585888855", // Телефон
    email: "hh", // E-mail
    con_comment: "", // Коментар
    shipping_method: "nova posta", // Спосіб доставки
    payment_method: "online", // Спосіб оплати
    shipping_address: "address", // Адреса доставки
    novaposhta: {
        ServiceType: "", // возможные значения: Warehouse, Doors
        payer: "", // можливі значення: "sender", "recipient"
        area: "", // область російською або українською мовою, або Ref області в системі Нової пошти
        region: "", // район російською або українською мовою (використовується тільки якщо cityNameFormat=settlement)
        city: "", // назва міста російською або українською мовою, або Ref міста в системі Нової пошти
        cityNameFormat: "", // можливі значення: full (за замовчуванням), short, settlement (населений пункт із нової адресної системи: ref або назва)
        WarehouseNumber: "", // відділення Нової Пошти в одному з форматів: номер, опис, Ref
        Street: "", // назва і тип вулиці, або Ref вулиці в системі Нової пошти
        BuildingNumber: "", // номер будинку
        Flat: "", // номер квартири
    },
    ukrposhta: {
        ServiceType: "", // возможные значения: Warehouse, Doors
        payer: "", // можливі значення: "sender", "recipient"
        type: "", // можливі значення: express, standard
        city: "", // місто російською або українською мовою, або CITY_ID Укрпошти
        WarehouseNumber: "", // номер відділення Укрпошти
        Street: "", // STREET_ID Укрпошти
        BuildingNumber: "", // номер будинку
        Flat: "" // номер квартири
    },
    sajt: "", // Сайт
    organizationId: "", // id організації
    shipping_costs: "", // Витрати на доставку
    stockId: "", // id складу
    prodex24source_full: "",
    prodex24source: "",
    prodex24medium: "",
    prodex24campaign: "",
    prodex24content: "",
    prodex24term: "",
    prodex24page: "", // isset($_SERVER["HTTP_REFERER"])?$_SERVER["HTTP_REFERER"]:"",
};

axios.post(salesdriveUrl, salesdriveValues, { headers: { 'Content-Type': 'application/json' } })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
}

  // const handleToggleLike = (productId) => {
  //  
  //   if (likedProducts.includes(productId)) {
  //     const updatedLikedProducts = likedProducts.filter(id => id !== productId);
  //     window.localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
  //     setLikedProducts(updatedLikedProducts);
      
  //   } else {
  //     const updatedLikedProducts = [...likedProducts, productId];
  //     window.localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
  //     setLikedProducts(updatedLikedProducts);
  //   }
   
  // };

  const handleDeleteUser = (userId) => {
    axios.post(`https://localhost:7269/api/Authenticate/deleteUser/${userId}`)
      .then(() => dispatch(deleteUser(userId)))
      .catch(error => console.error('Error deleting user:', error));
      
  };

  return (
    <div>
    
      <div>
      

      <h2>CATEGORY</h2>
      <button onClick={postrequest}>Delete</button>
     
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  products: state.products,
  users: state.users,
});

export default connect(mapStateToProps)(AdminPanel);

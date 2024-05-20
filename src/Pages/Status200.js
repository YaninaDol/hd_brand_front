import React from 'react';
import { Button } from 'react-bootstrap';

import axios from 'axios';
const Status200 = () => {
  window.sessionStorage.removeItem("Basket");

 
      axios({method:'post',
      url:`https://localhost:7269/api/Authenticate/ConfirmPayment?orderId=${window.sessionStorage.getItem('order')}`
   })
       .then(response => {
  
  })
  .catch(error => console.log(''));
    
      return (
    
        <div >
    <div className="text-center" style={{marginTop:100}}>
        <h2><svg xmlns="http://www.w3.org/2000/svg" width="86" height="86" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg></h2>
      <h2>Платіж прийнятий</h2>
      <p>Дякуємо за покупку в нашому магазині!</p>

     <a href='/'> <Button variant='dark' >На головну </Button></a>
    </div>
        </div>
      );
    };
    
    export default Status200;
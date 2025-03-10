import React, { useEffect, useState } from 'react'; 
import { Button,Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardOverlay, MDBCardImage } from 'mdb-react-ui-kit';

const Status200 = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState(null);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/Authenticate/getOrderInfo?orderId=${window.localStorage.getItem('order')}`);
        const crmId = response.data;
        const cleanOrderNumber = crmId.replace(/^crm#/i, ''); 
        setOrderNumber(cleanOrderNumber);
        window.sessionStorage.removeItem("Basket");
        window.localStorage.removeItem("Basket");
        window.localStorage.removeItem("order");
        window.sessionStorage.removeItem("order");
        window.sessionStorage.removeItem("filters");
        localStorage.removeItem("filters");
        setIsPaymentConfirmed(true);
      } catch (error) {
        console.error('Ошибка подтверждения оплаты:', error);
        window.sessionStorage.removeItem("Basket");
        window.localStorage.removeItem("Basket");
        window.localStorage.removeItem("order");
        window.sessionStorage.removeItem("order");
        window.sessionStorage.removeItem("filters");
        localStorage.removeItem("filters");
        setIsPaymentConfirmed(false);
      }
    };

   

   
    const timer = setTimeout(() => {
      confirmPayment();
      setIsLoading(false);
     
    }, 10000);

    return () => clearTimeout(timer);
  }, [API_BASE_URL]);

  useEffect(() => {
    if (isPaymentConfirmed === false) {
      navigate('/');
    }
  }, [isPaymentConfirmed, navigate]);

  return (
    <div>
      {isLoading ? (
        <div className="text-center" style={{ marginTop: 100 }}>
           <p>Перевірка статуса платежу ...</p>
          <Spinner variant="secondary" animation="border" />
        </div>
      ) : isPaymentConfirmed ? (
        <div className="text-center">
          <MDBCard background='dark' className='text-white'>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100vh'
            }}>
              <MDBCardImage 
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  width: '100%',
                  height: '50vh'
                }} 
                overlay 
                src={require('../assets/orderconfirmed.png')}
                alt='...' 
              />
              <MDBCardOverlay style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                <MDBCardTitle style={{ position: 'absolute', fontSize: '35px', fontStyle: 'oblique' }}>
                  ORDER CONFIRMED
                </MDBCardTitle>
              </MDBCardOverlay>
              <div style={{
                backgroundColor: '#424949',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                {orderNumber && <p>Ваше замовлення: <strong>№{orderNumber} прийняте!</strong></p>}
                <p>Дякуємо за покупку в нашому магазині!</p>
                <Button variant="dark" onClick={() => navigate('/')}>На головну</Button>

              
                <div style={{ textAlign: 'center',margin: '20px 0' }}>
  <div>Звертайтесь до нас з будь-яких питань</div>
  <div style={{ margin: '15px 0' }} >Наші контакти :</div>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 20 16">
        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
      </svg>
      <div>
        <a style={{ color: 'white' }} href='tel:+38 (098) 639 86 39'>+38 (098) 639 86 39</a>
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 20 16">
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
      </svg>
      <a style={{color: 'white'}} href="https://www.instagram.com/hd_brand_" target="_blank" rel="noopener noreferrer">
        <div>Instagram</div>
      </a>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 20 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
      </svg>
      <a href="tel:+38 (098) 639 86 39" style={{color: 'white'}} target="_blank" rel="noopener noreferrer">
        <div>Telegram</div>
      </a>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 20 16">
        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
      </svg>
      <a href="https://www.tiktok.com/@_hd_brand_" style={{color: 'white'}} target="_blank" rel="noopener noreferrer">
        <div>Tik Tok</div>
      </a>
    </div>
  </div>
</div>

   
 
              </div>
            </div>
          </MDBCard>
        </div>
      ) : (
        <div className="text-center" style={{ marginTop: 100 }}>
          <p>Перевірка статуса платежу ...</p>
        </div>
      )}
    </div>
  );
};

export default Status200;

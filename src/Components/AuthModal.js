import { MDBRow } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
const AuthModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [isRegistration, setIsRegistration] = useState(false);

  const validateForm = () => {
    let isValid = true;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Введіть коректний e-mail');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password || password.length < 6) {
      setPasswordError('Пароль повинен містити принаймні 6 символів');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isRegistration && repeatPassword !== password) {
      setRepeatPasswordError('Паролі не співпадають');
      isValid = false;
    } else {
      setRepeatPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
        if (isRegistration) {
            axios (

                {
                    method:'post',
                    url:'https://localhost:7269/api/Authenticate/regUser',
                    data:
                    JSON.stringify({ email:email, Password: password}),
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }

                }



            ).then  (res=>

                    
                    {
                            window.sessionStorage.setItem("AccessToken", res.data.token);
                         
                           if(res.data.userRole[0]=="User")

                           {
                                           
                            window.location.href='/account';
                            
                        
                        
                            handleClose();

                           }


                    })
                    .catch(function (error) {
                        alert("Сталась помилка. Перевірте данні");
                      window.location.href = "/";
                    
                        console.log("Error:"+error);
                      });
          } else {
            axios (

                {
                    method:'post',
                    url:'https://localhost:7269/api/Authenticate/login',
                    data:
                    JSON.stringify({ email:email, Password: password}),
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }

                }



            ).then  (res=>

                    
                    {
                            window.sessionStorage.setItem("AccessToken", res.data.token);
                         
                           if(res.data.userRole[0]=="User")

                           {
                                           
                            window.location.href='/account';
                            
                        
                        
                            handleClose();

                           }

                           if(res.data.userRole[0]=="Admin")
                           {
                           
                              window.location.href='/admin';
                           }
                           if(res.data.userRole[0]=="Menager")
                           {
                           
                              window.location.href='/admin';
                           }


                    })
                    .catch(function (error) {
                        alert("Сталась помилка. Перевірте данні");
                      window.location.href = "/";
                    
                        console.log("Error:"+error);
                      });
          }
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isRegistration ? 'Реєстрація' : 'Авторизація'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Введіть e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-danger">{emailError}</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введіть пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-danger">{passwordError}</Form.Text>
          </Form.Group>

          {isRegistration && (
            <Form.Group controlId="formBasicRepeatPassword">
              <Form.Label>Повторити пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введіть пароль"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <Form.Text className="text-danger">{repeatPasswordError}</Form.Text>
            </Form.Group>
          )}
<MDBRow className="mx-4">
<Button variant="dark" type="submit" size='lg' style={{marginTop:'15px'}}>
            {isRegistration ? 'Зареєструватися' : 'Увійти'}
          </Button>
          <Button variant="outline-dark"  size='lg' onClick={() => setIsRegistration(!isRegistration)}style={{marginTop:'15px'}}>
            {isRegistration ? 'У мене є акаунт' : 'Реєстрація'}
          </Button>

</MDBRow>
         
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
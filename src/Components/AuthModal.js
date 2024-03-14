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
  const [showReset, setShowReset] = useState(false);
  const handleCloseReset = () => setShowReset(false);
  const handleShowReset = () => setShowReset(true);
  const validateForm = () => {
    let isValid = true;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Введіть коректний e-mail');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password || password.length < 8 || !/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
  setPasswordError('Пароль повинен містити принаймні 8 символів і включати хоча б одну букву і одну цифру');
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
                         
                                           
                            window.location.href='/account';
                            
                        
                        
                            handleClose();

                           


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
const handlesend=()=>
{
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    setEmailError('Введіть коректний e-mail');
   
  } else {

    axios.get(`https://localhost:7269/api/Email/sendCustomEmail?mail=${email}`)
    .then(response => {
      console.log(response.data); 
      
    })
    .catch(error => {
      console.error(error); 
    });
   
  }
}
  return (
    <div>
<Modal show={showReset} onHide={handleCloseReset}>
        <Modal.Header closeButton>
          <Modal.Title>Відновлення пароля</Modal.Title>
        </Modal.Header>
        <Modal.Body> <Form.Control
              type="email"
              placeholder="Введіть e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> <Form.Text className="text-danger">{emailError}</Form.Text> 
            <MDBRow style={{marginTop:'15px',marginLeft:'1px',marginRight:'1px'}}>
            <Button size="lg" variant="dark" onClick={handlesend}>
            Відновити
          </Button>
              
            </MDBRow>
           </Modal.Body>
             
        <Modal.Footer>
        
         
        </Modal.Footer>
      </Modal>



  
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
            <Form.Label style={{marginTop:'10px'}}>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введіть пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isRegistration &&( <Form.Text onClick={()=>{handleShowReset();handleClose()}} className="text-end">Забули пароль?</Form.Text>)}
            <Form.Text className="text-danger">{passwordError}</Form.Text>
          </Form.Group>

          {isRegistration && (
            <Form.Group controlId="formBasicRepeatPassword">
              <Form.Label style={{marginTop:'10px'}}>Повторити пароль</Form.Label>
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
    </div>
  );
};

export default AuthModal;
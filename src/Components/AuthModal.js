import { MDBRow } from 'mdb-react-ui-kit';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
const AuthModal = ({ show, handleClose }) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const {t } = useTranslation();
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
      setEmailError(t('erorr_mail'));
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password || password.length < 8 || !/(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setPasswordError(t('erorr_password'));
       isValid = false;
    }else {
  setPasswordError('');
}

    if (isRegistration && repeatPassword !== password) {
      setRepeatPasswordError(t('erorr_pass2'));
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
                    url:`${API_BASE_URL}/api/Authenticate/regUser`,
                    data:
                    JSON.stringify({ email:email, Password: password}),
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }

                }



            ).then  (res=>

                    
                    {
                         
                      handleClose();             
                      alert(t('success'));
                      window.location.href = "/";
                        
                        
                           

                           


                    })
                    .catch(function (error) {
                      if (error.response) {
                      
                       alert(t('erorr') + error.response.data);
                    }
                    else {
                     
                      alert(t('erorr') + error.message);
                  }
                     window.location.href = "/";
                    
                       
                      });
          } else {
            axios (

                {
                    method:'post',
                    url:`${API_BASE_URL}/api/Authenticate/login`,
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
                           
                              window.location.href='/admin/products';
                              window.sessionStorage.setItem("Role", 1);
                           }
                           if(res.data.userRole[0]=="Menager")
                           {
                           
                              window.location.href='/admin/products';
                           }


                    })
                    .catch(function (error) {
                        alert(t('erorr'));
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
    setEmailError(t('erorr_mail'));
   
  } else {

    axios.get(`${API_BASE_URL}/api/Email/sendCustomEmail?mail=${email}`)
    .then(response => {
      console.log(response.data); 
      handleCloseReset();
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
          <Modal.Title>{t('reset_password')}</Modal.Title>
        </Modal.Header>
        <Modal.Body> <Form.Control
              type="email"
              placeholder={t('enter_email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> <Form.Text className="text-danger">{emailError}</Form.Text> 
            <MDBRow style={{marginTop:'15px',marginLeft:'1px',marginRight:'1px'}}>
            <Button size="lg" variant="dark" onClick={handlesend}>
            {t('reset')}
          </Button>
              
            </MDBRow>
           </Modal.Body>
             
        <Modal.Footer>
        
         
        </Modal.Footer>
      </Modal>



  
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isRegistration ? t('registration') : t('authorization')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder={t('enter_email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-danger">{emailError}</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{marginTop:'10px'}}>{t('password')}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t('enter_password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isRegistration &&( <Form.Text onClick={()=>{handleShowReset();handleClose()}} className="text-end">{t('forgot_password')}</Form.Text>)}
            <Form.Text className="text-danger">{passwordError}</Form.Text>
          </Form.Group>

          {isRegistration && (
            <Form.Group controlId="formBasicRepeatPassword">
              <Form.Label style={{marginTop:'10px'}}>{t('repeat_password')}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('enter_password')}
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <Form.Text className="text-danger">{repeatPasswordError}</Form.Text>
            </Form.Group>
          )}
<MDBRow className="mx-4">
<Button variant="dark" type="submit" size='lg' style={{marginTop:'15px'}}>
            {isRegistration ? t('registration') : t('authorization')}
          </Button>
          <Button variant="outline-dark"  size='lg' onClick={() => setIsRegistration(!isRegistration)}style={{marginTop:'15px'}}>
            {isRegistration ? t('account') : t('registration') }
          </Button>

</MDBRow>
         
        </Form>
      </Modal.Body>
    </Modal>
    </div>
  );
};

export default AuthModal;
import {MDBBtn,MDBInputGroup,MDBCheckbox , MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { connect,useDispatch,useSelector } from 'react-redux';
import {setUsers, deleteUser } from './actions';
import {MDBNavbarItem} from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserTableItem from './UserTableItem';
import axios from 'axios';

export default function UserTable(){

    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
  




    const [showRemove, setShowRemove] = useState(false);

    const handleCloseRemove = () => setShowRemove(false);
    const handleShowRemove = () => setShowRemove(true);


    const [idRemove,setIdRemove]=useState(0);

    const [idUserUpdate,setIdUserUpdate]=useState(0);
    const [userLoginUpdate,setUserLoginUpdate]=useState('');
    const [userEmailUpdate,setUserEmailUpdate]=useState('');

    const [showUp, setShowUp] = useState(false);
    const handleCloseUp = () => setShowUp(false);
    const handleShowUp = () => setShowUp(true);

    const [showAddU,setShowAddU] = useState(false);
    const handleCloseAddU = () => setShowAddU(false);
    const handleShowAddU = () => setShowAddU(true);

    const [UserLoginAddU,setUserLoginAddU]=useState('');
    const [userEmailAddU,setUserEmailAddU]=useState('');
    const [userPasswordAddU,setUserPasswordAddU]=useState('');


    const [showAddA,setShowAddA] = useState(false);
    const handleCloseAddA = () => setShowAddA(false);
    const handleShowAddA = () => setShowAddA(true);

    const [UserLoginAddA,setUserLoginAddA]=useState('');
    const [userEmailAddA,setUserEmailAddA]=useState('');
    const [userPasswordAddA,setUserPasswordAddA]=useState('');

    useEffect(() => {


 
      axios.get('https://localhost:7269/api/Authenticate/getUsers')
        .then(response => dispatch(setUsers(response.data)))
        .catch(error => console.error('Error fetching users:', error));
    }, [dispatch]);

    function removebtn(id)
    {
   
    setIdRemove(id);
    handleShowRemove();
       
    }

 
    function confirmRemove()
    {
   var bodyFormData = new FormData();
      bodyFormData.append('userID', idRemove);
                  axios (
    
                    {
                    method:'post',
                    url:'https://localhost:7269/api/Authenticate/deleteUser',
                    data:bodyFormData
                    // ,headers: {
                    //   'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
                    //         'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                    // },
                   
                    }
    
    
    
                ).then  (res=>
                {
                  dispatch(deleteUser(idRemove))
                  alert("User deleted successfull")
                    
                   window.location.reload();
                   
                }).catch(error => {
      
                  if (error.response) {
                   
                    console.error('Response error:', error.response.data);
                  } else if (error.request) {
                  
                    console.error('Request error:', error.request);
                  } else {
                   
                    console.error('Error during request:', error.message);
                  }
                 
                });  
    


    }


    function updatebtn(id)
    {
    
        
      let user= users.find(item=>item.id == id);
    
      setIdUserUpdate(id);
    
        setUserLoginUpdate(user['userName']);
        setUserEmailUpdate(user['email']);
    
    handleShowUp();
    
    
    }
    function confirmUp()
{
  if(userEmailUpdate.includes('@'))
{
          var bodyFormData = new FormData();
          bodyFormData.append('userID', idUserUpdate);
          bodyFormData.append('UserName', userLoginUpdate);
          bodyFormData.append('email', userEmailUpdate);
        
          axios (

            {
            method:'post',
            url:'https://localhost:7269/api/Authenticate/updateUser',
            data:bodyFormData,
            // ,headers: {
            //   'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
            //         'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
            // },
          
            }



        ).then  (res=>
        {
          alert("User updated successfull!")
            console.log(res.data);
            window.location.reload();
          
        }).catch(error => {
              
          if (error.response) {
          
            console.error('Response error:', error.response.data);
          } else if (error.request) {
          
            console.error('Request error:', error.request);
          } else {
          
            console.error('Error during request:', error.message);
          }
        
        });   
      }else alert ("Not correct email!")


}

function confirmAddUser()
{
   
    genPassword();
    function genPassword() {
       var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
       var passwordLength = 9;
       var password = "";
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber +1);
     }
        setUserPasswordAddU(password);
    }
    if(userEmailAddU.includes('@'))
        {axios (
      
          {
          method:'post',
          url:'https://localhost:7269/api/Authenticate/regUser',
          data: JSON.stringify({ UserName: UserLoginAddU, Password: userPasswordAddU,Email:userEmailAddU}), 
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        
          }
        
      
      
      
      ).then  (res=>
      {
        alert("User registered successfull!")
          console.log(res.data);
          window.location.reload();
        
      }).catch(error => {
     
        if (error.response) {
        
          console.error('Response error:', error.response.data);
        } else if (error.request) {
         
          console.error('Request error:', error.request);
        } else {
        
          console.error('Error during request:', error.message);
        }
       
      });  

}
else alert("Not correct email !")

}

function confirmAddAdmin()
{
   
    genPassword();
    function genPassword() {
       var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
       var passwordLength = 9;
       var password = "";
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber +1);
     }
        setUserPasswordAddA(password);
    }

    if(userEmailAddA.includes('@'))
    {    axios (
      
          {
          method:'post',
          url:'https://localhost:7269/api/Authenticate/regMenager',
          data: JSON.stringify({ UserName: UserLoginAddA, Password: userPasswordAddA,Email:userEmailAddA}), 
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',
          'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken") },
        
          }
      
      
      
      ).then  (res=>
      {
        alert("Admin registered successfull!")
          console.log(res.data);
          window.location.reload();
        
      }).catch(error => {
      
        if (error.response) {
         
          console.error('Response error:', error.response.data);
        } else if (error.request) {
        
          console.error('Request error:', error.request);
        } else {
         
          console.error('Error during request:', error.message);
        }
       
      });  
    }
    else alert("Not correct email !")

}







    
    return(
        <div>



      <Modal show={showRemove} onHide={handleCloseRemove}>
        <Modal.Header closeButton>
          <Modal.Title>Remove user</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRemove}>
            Cancel
          </Button>
          <Button variant="dark" onClick={confirmRemove}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showUp}
        onHide={handleCloseUp}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <MDBInputGroup className='mb-3'  textBefore='User ID'>
      <input disabled value={idUserUpdate} className='form-control' type='text' />
    </MDBInputGroup>
    <MDBInputGroup className='mb-3' textBefore='Login User'>
      <input onChange={(e)=>setUserLoginUpdate(e.target.value)} value={userLoginUpdate} className='form-control' type='text' />
      </MDBInputGroup>
      <MDBInputGroup className='mb-3' textBefore='Email User'>
      <input onChange={(e)=>setUserEmailUpdate(e.target.value)} value={userEmailUpdate} type='email' className='form-control' />
      </MDBInputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUp}>
            Close
          </Button>
          <Button variant="dark" onClick={confirmUp}>Confirm</Button>
        </Modal.Footer>
      </Modal>


      <Modal
        show={showAddU}
        onHide={handleCloseAddU}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Registration User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <MDBInputGroup className='mb-3' textBefore='Login User'>
      <input onChange={(e)=>setUserLoginAddU(e.target.value)} className='form-control' type='text' />
      </MDBInputGroup>
      <MDBInputGroup className='mb-3' textBefore='Email User'>
      <input onChange={(e)=>setUserEmailAddU(e.target.value)} type='email' className='form-control' />
      </MDBInputGroup>
      <MDBInputGroup className='mb-3' textBefore='Password'>
      <input  disabled type="password"  class="form-control"  placeholder="generate password"/>
      </MDBInputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddU}>
            Close
          </Button>
          <Button variant="dark" onClick={confirmAddUser}>Confirm</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAddA}
        onHide={handleCloseAddA}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Registration Menager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <MDBInputGroup className='mb-3' textBefore='Login'>
      <input onChange={(e)=>setUserLoginAddA(e.target.value)} className='form-control' type='text' />
      </MDBInputGroup>
      <MDBInputGroup className='mb-3' textBefore='Email'>
      <input onChange={(e)=>setUserEmailAddA(e.target.value)} type='email' className='form-control' />
      </MDBInputGroup>
      <MDBInputGroup className='mb-3' textBefore='Password'>
      <input  disabled type="password"  class="form-control"  placeholder="generate password"/>
      </MDBInputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddA}>
            Close
          </Button>
          <Button variant="dark" onClick={confirmAddAdmin}>Confirm</Button>
        </Modal.Footer>
      </Modal>

<div>

      
<Button style={{textAlign:'center',alignItems:'left'}} outline onClick={()=>handleShowAddU()} variant='dark'>
       REGISTER USER
</Button>

<Button  style={{textAlign:'center',alignItems:'left'}} outline onClick={()=>handleShowAddA()} variant='dark'>
REGISTER MENAGER
</Button>

</div>




      
<h1 style={{textAlign:'center',alignItems:'center'}} >TABLE OF USERS</h1>
<MDBTable>
<MDBTableHead dark>
  <tr>
  <th scope='col'></th>
    <th scope='col'>#</th>
    <th scope='col'>User Name</th>
    <th scope='col'>Email</th>
    <th scope='col'></th>
    <th scope='col'></th>
  </tr>
</MDBTableHead>
<MDBTableBody >
 {
  users.map((x)=> <UserTableItem id={x.id} unic={x.id} name ={x.userName} email={x.email} remove={removebtn} update={updatebtn}></UserTableItem>)
 }
</MDBTableBody>
</MDBTable>

    </div>
    );
}
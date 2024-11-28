import { MDBInputGroup, MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, deleteUser } from '../redux/actions';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserTableItem from './UserTableItem';
import axios from 'axios';
import OrderTableItem from './OrderTableItem';

export default function UserTable() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showRemove, setShowRemove] = useState(false);
    const handleCloseRemove = () => setShowRemove(false);
    const handleShowRemove = () => setShowRemove(true);

    const [idRemove, setIdRemove] = useState(0);
    const [idUserUpdate, setIdUserUpdate] = useState(0);
    const [userLoginUpdate, setUserLoginUpdate] = useState('');
    const [userEmailUpdate, setUserEmailUpdate] = useState('');
    const [surname, setSurname] = useState("");
    const [phoneNumber, setPhonenumber] = useState("");
    const [showUp, setShowUp] = useState(false);
    const handleCloseUp = () => setShowUp(false);
    const handleShowUp = () => setShowUp(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddU, setShowAddU] = useState(false);
    const handleCloseAddU = () => setShowAddU(false);
    const handleShowAddU = () => setShowAddU(true);

    const [userEmailAddU, setUserEmailAddU] = useState('');
    const [userPasswordAddU, setUserPasswordAddU] = useState('');

    const [showAddA, setShowAddA] = useState(false);
    const handleCloseAddA = () => setShowAddA(false);
    const handleShowAddA = () => setShowAddA(true);

    const [userEmailAddA, setUserEmailAddA] = useState('');
    const [userPasswordAddA, setUserPasswordAddA] = useState('');

  
   

    useEffect(() => {
        axios({
            method: 'get',
            url: `${API_BASE_URL}/api/Authenticate/getAllUserInfos`,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("AccessToken"),
            },
        })
            .then(response => {
                dispatch(setUsers(response.data)); // Устанавливаем пользователей в глобальное состояние
                setFilteredUsers(response.data); // Устанавливаем отфильтрованных пользователей
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, [API_BASE_URL, dispatch]); // API_BASE_URL можно оставить в зависимостях

    

    function removebtn(id) {
        setIdRemove(id);
        handleShowRemove();
    }

    function confirmRemove() {
        var bodyFormData = new FormData();
        bodyFormData.append('userID', idRemove);
        axios({
            method: 'post',
            url: `${API_BASE_URL}/api/Authenticate/deleteUser`,
            data: bodyFormData,
            headers: {
                'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("AccessToken")
            },
        }).then(res => {
            dispatch(deleteUser(idRemove));
            alert("User deleted successfully");
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
    function resetFilter() {
      setSearchQuery("");
  }
    function updatebtn(id) {
        let user = users.find(item => item.userId == id);
        setIdUserUpdate(id);
        setUserLoginUpdate(user['name']);
        setSurname(user['surname']);
        setPhonenumber(user['phonenumber']);
        setUserEmailUpdate(user['email']);
        handleShowUp();
    }

    function confirmUp() {
        if (userEmailUpdate.includes('@')) {
            var bodyFormData = new FormData();
            bodyFormData.append('userId', idUserUpdate);
            bodyFormData.append('Name', userLoginUpdate);
            bodyFormData.append('SurName', surname);
            bodyFormData.append('email', userEmailUpdate);
            bodyFormData.append('phonenumber', phoneNumber);
            axios({
                method: 'post',
                url: `${API_BASE_URL}/api/Authenticate/updateUserbyAdmin`,
                data: bodyFormData,
                headers: {
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem("AccessToken")
                },
            }).then(res => {
                alert("Данні успішно оновлені ");
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
        } else {
            alert("Not correct email!");
        }
    }

    function confirmAddUser() {
        genPassword();
        function genPassword() {
            var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var passwordLength = 9;
            var password = "";
            for (var i = 0; i <= passwordLength; i++) {
                var randomNumber = Math.floor(Math.random() * chars.length);
                password += chars.substring(randomNumber, randomNumber + 1);
            }
            setUserPasswordAddU(password);
        }
        if (userEmailAddU.includes('@')) {
            axios({
                method: 'post',
                url: `${API_BASE_URL}/api/Authenticate/regUser`,
                data: JSON.stringify({ email: userEmailAddU, Password: userPasswordAddU }),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            }).then(res => {
                alert("Успішно зареєстровано!");
             
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
        } else {
            alert("Not correct email!");
        }
    }

    function confirmAddAdmin() {
        genPassword();
        function genPassword() {
            var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var passwordLength = 9;
            var password = "";
            for (var i = 0; i <= passwordLength; i++) {
                var randomNumber = Math.floor(Math.random() * chars.length);
                password += chars.substring(randomNumber, randomNumber + 1);
            }
            setUserPasswordAddA(password);
        }
        if (userEmailAddA.includes('@')) {
            axios({
                method: 'post',
                url: `${API_BASE_URL}/api/Authenticate/regMenager`,
                data: JSON.stringify({ email: userEmailAddA, Password: userPasswordAddA }),
                headers: {
                    'Accept': 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem("AccessToken")
                },
            }).then(res => {
                alert("Admin registered successfully!");
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
        } else {
            alert("Not correct email!");
        }
    }
    useEffect(() => {
        setFilteredUsers(
            users.filter(item =>
                item.email.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery,filteredUsers]);

    return (
        <div>
            <Modal show={showRemove} onHide={handleCloseRemove}>
                <Modal.Header closeButton>
                    <Modal.Title>Видалення</Modal.Title>
                </Modal.Header>
                <Modal.Body>Видалити юзера?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRemove}>
                        Відміна
                    </Button>
                    <Button variant="dark" onClick={confirmRemove}>
                        Так
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showUp} onHide={handleCloseUp} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Оновити данні</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MDBInputGroup className='mb-3' textBefore='User ID'>
                        <input disabled value={idUserUpdate} className='form-control' type='text' />
                    </MDBInputGroup>
                    <MDBInputGroup className='mb-3' textBefore="Ім'я">
                        <input onChange={(e) => setUserLoginUpdate(e.target.value)} value={userLoginUpdate} className='form-control' type='text' />
                    </MDBInputGroup>
                    <MDBInputGroup className='mb-3' textBefore="Прізвище">
                        <input onChange={(e) => setSurname(e.target.value)} value={surname} className='form-control' type='text' />
                    </MDBInputGroup>
                    <MDBInputGroup className='mb-3' textBefore="Телефон">
                        <input onChange={(e) => setPhonenumber(e.target.value)} value={phoneNumber} className='form-control' type='text' />
                    </MDBInputGroup>
                    <MDBInputGroup className='mb-3' textBefore='E-mail'>
                        <input onChange={(e) => setUserEmailUpdate(e.target.value)} value={userEmailUpdate} type='email' className='form-control' />
                    </MDBInputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUp}>
                        Відміна
                    </Button>
                    <Button variant="dark" onClick={confirmUp}>Оновити</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAddU} onHide={handleCloseAddU} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MDBInputGroup className='mb-3' textBefore='Email User'>
                        <input onChange={(e) => setUserEmailAddU(e.target.value)} type='email' className='form-control' />
                    </MDBInputGroup>
                    <MDBInputGroup className='mb-3' textBefore='Password'>
                        <input disabled type="password" className="form-control" placeholder="generate password" />
                    </MDBInputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddU}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={confirmAddUser}>Confirm</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAddA} onHide={handleCloseAddA} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration Menager</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MDBInputGroup className='mb-3' textBefore='Email'>
                        <input onChange={(e) => setUserEmailAddA(e.target.value)} type='email' className='form-control' />
                    </MDBInputGroup>
                    <MDBInputGroup className='mb-3' textBefore='Password'>
                        <input disabled type="password" className="form-control" placeholder="generate password" />
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
                <Button style={{ textAlign: 'center', alignItems: 'left', marginRight: '30px' }} outline onClick={() => handleShowAddU()} variant='dark'>
                    REGISTER USER
                </Button>
                <Button style={{ textAlign: 'center', alignItems: 'left' }} outline onClick={() => handleShowAddA()} variant='dark'>
                    REGISTER MENAGER
                </Button>
            </div>
           

            
            <h1 style={{ textAlign: 'center', alignItems: 'center' }}>TABLE OF USERS</h1>
            <p> <input
                type="text"
                placeholder="Пошук за поштою "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            /></p>
            <MDBTable>
                <MDBTableHead dark>
                    <tr>
                        <th scope='col'></th>
                        <th scope='col'>#</th>
                        <th scope='col'>Ім'я</th>
                        <th scope='col'>Прізвище</th>
                        <th scope='col'>Телефон</th>
                        <th scope='col'>Email</th>
                        <th scope='col'></th>
                        <th scope='col'></th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {
                        filteredUsers.map((x) => <UserTableItem   key={x.userId} id={x.userId} unic={x.userId} name={x.name} surname={x.surname} phonenumber={x.phonenumber} email={x.email} remove={removebtn} update={updatebtn} />)
                    }
                </MDBTableBody>
            </MDBTable>

      

           
        </div>
    );
}

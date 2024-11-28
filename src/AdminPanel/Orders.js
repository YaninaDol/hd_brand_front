import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderTableItem from './OrderTableItem';

export default function Orders() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);

    // Fetch orders
    useEffect(() => {
        axios({
            method: 'get',
            url: `${API_BASE_URL}/api/Authenticate/getOrders`,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("AccessToken")
            }
        })
            .then((resp) => {
                setOrders(resp.data);
                setFilteredOrders(resp.data);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    // Filter orders by surname
    useEffect(() => {
        setFilteredOrders(
            orders.filter((order) =>
                order.surname.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, orders]);

    // Search orders by user ID
    function searchById(id) {
        setFilteredOrders(
            orders.filter((order) => order.userId === id)
        );
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>ORDERS</h1>
            <p style={{marginTop:'10px'}}>
                <input

                    type="text"
                    placeholder="Пошук за прізвищем"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </p>
            {filteredOrders.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'red' }}>Завантаження...</p>
            ) : (
                <div style={{
                    overflowX: 'auto',  // Прокрутка по горизонтали
                    overflowY: 'auto',  // Прокрутка по вертикали
                    maxHeight: '600px',  // Ограничение высоты для таблицы
                    marginBottom: '20px', // Отступ снизу
                    border: '1px solid #ddd',  // Граница вокруг таблицы
                    paddingRight: '10px' // Для предотвращения перекрытия скролла
                }}>
                    <MDBTable striped style={{ minWidth: '1000px',fontSize:'13px' }}>
                        <MDBTableHead dark>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">#</th>
                                <th scope="col">Номер заявки</th>
                                <th scope="col">User Id</th>
                                <th scope="col">Ім'я</th>
                                <th scope="col">Прізвище</th>
                                <th scope="col">Телефон</th>
                                <th scope="col">Доставка</th>
                                <th scope="col">Адреса</th>
                                <th scope="col">Сума</th>
                                <th scope="col">Статус</th>
                                <th scope="col">Замовлення</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {filteredOrders.map((order) => (
                                <OrderTableItem
                                    key={order.id}
                                    CrmId={order.crmId}
                                    userId={order.userId}
                                    unic={order.id}
                                    name={order.name}
                                    surname={order.surname}
                                    phoneNumber={order.phone}
                                    delivery={order.delivery}
                                    address={order.address}
                                    total={order.total}
                                    status={order.payment}
                                    items={order.orderItems}
                                />
                            ))}
                        </MDBTableBody>
                    </MDBTable>
                </div>
            )}
        </div>
    );
}

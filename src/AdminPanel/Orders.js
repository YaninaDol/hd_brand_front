import { MDBTable, MDBTableHead, MDBTableBody,MDBPagination,MDBPaginationItem,MDBPaginationLink } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderTableItem from './OrderTableItem';
import {  Pagination} from 'react-bootstrap';
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
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    const [itemsPerPage] = useState(10); // Количество элементов на странице
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

    // Функция для смены страницы
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Количество страниц
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const pageRange = 5;  // Количество отображаемых страниц рядом с текущей
    let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    let endPage = Math.min(totalPages, currentPage + Math.floor(pageRange / 2));

    // Корректируем диапазон, если он выходит за пределы
    if (endPage - startPage < pageRange - 1) {
        if (startPage === 1) {
            endPage = Math.min(totalPages, startPage + pageRange - 1);
        } else {
            startPage = Math.max(1, endPage - pageRange + 1);
        }
    }
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
                            {currentItems.map((order) => (
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
               <div className="d-flex justify-content-end">
                <Pagination>
                    <Pagination.First
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                    />
                    <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    />

                    {/* Отображение диапазона страниц */}
                    {[...Array(endPage - startPage + 1)].map((_, index) => (
                        <Pagination.Item
                            key={startPage + index}
                            active={currentPage === startPage + index}
                            onClick={() => handlePageChange(startPage + index)}
                        >
                            {startPage + index}
                        </Pagination.Item>
                    ))}

                    <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                    <Pagination.Last
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </div>
        </div>
    );
}

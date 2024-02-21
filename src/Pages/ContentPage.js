import React from 'react';
import { useState } from "react";
import './ContentPage.css';
import { Link, Outlet } from "react-router-dom";
import CartProduct from '../Components/CartProduct';
import DropdownFrame from '../Components/DropdownFrame';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
 
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBRange 
} from 'mdb-react-ui-kit';
const ContentPage = ({ items,page,link,materials,types,AddBtn }) => {
  const [range, setRange] = useState(0);
  const [itemsPerRow, setItemsPerRow] = useState(12);
  const [visibleItems, setVisibleItems] = useState(itemsPerRow);
  
  const showMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerRow);
  };
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [seasonValues, setSeasonValues] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const handleCheckboxChange = (event, type) => {
    const { value, checked } = event.target;
  
    if (type === 'type') {
      setSelectedTypes((prev) => {
        return checked ? [...prev, value] : prev.filter((item) => item !== value);
      });
    } else if (type === 'material') {
      setSelectedMaterials((prev) => {
        return checked ? [...prev, value] : prev.filter((item) => item !== value);
      });
    } else if (type === 'season') {
      // Остальная логика остается без изменений
      setSeasonValues((prevValues) => ({ ...prevValues, [value]: checked }));
    }
  };

  const applyFilters = () => {
    // Получаем выбранные значения для фильтрации
    const selectedSeasons = Object.keys(seasonValues).filter((key) => seasonValues[key]);
  
    // Применяем фильтрацию к массиву products
    const filteredProducts = items.filter((product) => {
      const typeIncluded = selectedTypes.length === 0 || (product.subCategoryid && selectedTypes.includes(product.subCategoryid.toString()));
      const materialIncluded = selectedMaterials.length === 0 || (product.materialid && selectedMaterials.includes(product.materialid.toString()));
      const seasonIncluded =
        (!product.season || (selectedSeasons.spring && product.season === 'Spring') ||
        (selectedSeasons.autumn && product.season === 'Autumn') ||
        (selectedSeasons.winter && product.season === 'Winter') ||
        (selectedSeasons.summer && product.season === 'Summer'));
    
      return typeIncluded && materialIncluded && seasonIncluded;
    });
    
    // Выводим отфильтрованные продукты в консоль (или применяем их как-то еще)
    console.log('Отфильтрованные продукты:', filteredProducts);
  }
  return (
    <div >
      <section className="h-100 h-custom" >
      <div className="stock-status">
      <Link to="/"><div className="div33">Головна </div></Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
<Link to={`/${link.toLowerCase()}`}><div className="div34">{page}</div></Link>
</div>
<MDBContainer className="py-5 h-100">
<MDBRow> 
         
       
        
       </MDBRow>
        <MDBRow>   <div className="color-picker">
          
          <div className="materials-list">
            <div >Сортувати:</div>
          </div>
          <div className="materials-list1">
          
            <DropdownButton variant='outline light' id="dropdown-basic-button" size="sm" title="По ціні">
  <Dropdown.Item href="#/action-1">Від дешевих до дорогих</Dropdown.Item>
  <Dropdown.Item href="#/action-2">Від дорогих до дешевих</Dropdown.Item>

</DropdownButton>
          </div></div></MDBRow>

  <MDBRow className="justify-content-left align-items-left h-100">
    
 
                  <div className="div37">Фільтри</div>
            
    <MDBCol lg="3" className="bg-grey" >
    
              <div style={{backgroundColor:'rgb(247, 247, 247)'}}  className="p-2">
              <div className="div53">Ціна</div>
              <MDBRange
             onChange={(e)=>setRange(e.target.value)}
    defaultValue='0'
    min='0'
    max='100000'
    step='50'
    id='customRange3'
   
  />
       <hr className="my-4" />
<div className="dropdown-frame1" />
                    <div className="text-components2">
                      <div className="div53">Сезон</div>
                      <Form.Check 
            type='checkbox'
         
            value={1}
            checked={seasonValues[1]}
            onChange={(e) => handleCheckboxChange(e, 'season')}
            label='Весна'
            style={{ marginTop:15}}
          />
          <Form.Check 
            type='checkbox'
           
            checked={seasonValues[2]}
            onChange={(e) => handleCheckboxChange(e, 'season')}
            value={2}
            label='Літо'
            style={{ marginTop:15}}
          />
          <Form.Check 
            type='checkbox'
          
            value={3}
            checked={seasonValues[3]}
            onChange={(e) => handleCheckboxChange(e, 'season')}
            label='Зима'
            style={{ marginTop:15}}
          />
          <Form.Check 
            type='checkbox'
           
            value={4}
            checked={seasonValues[4]}
            onChange={(e) => handleCheckboxChange(e, 'season')}
            label='Осінь'
            style={{ marginTop:15}}
          />
                      {/* <div className="footer-container">
                        <div className="season-slider">
                          <div className="spring-summer-autumn">
                          <input
              className="rectangle-frame1"
              type="checkbox"
              value={1}
              checked={seasonValues[1]}
              onChange={handleCheckboxChange}
            />
            <input
              className="rectangle-frame2"
              type="checkbox"
              value={2}
              checked={seasonValues[2]}
              onChange={handleCheckboxChange}
            />
            <input
              className="rectangle-frame3"
              type="checkbox"
              value={3}
              checked={seasonValues[3]}
              onChange={handleCheckboxChange}
            />
            <input
              className="rectangle-frame3"
              type="checkbox"
              value={4}
              checked={seasonValues[4]}
              onChange={handleCheckboxChange}
            />
                          </div>
                          <div className="div54">
                            <p className="p1">Весна</p>
                            <p className="p1">Осінь</p>
                            <p className="p2">Зима</p>
                            <p className="p3">Літо</p>
                          </div>
                        </div>
                      </div> */}
                    </div>

                <hr className="my-4" />
                <div className="line-frame1">
                      <div className="apply-button" />
                      <div className="tovares-group">
                        <div className="div55">Колір</div>
                        <div className="u-a-h-component">
                          <div className="frame-instance">
                            <div className="rectangle-parent">
                              <div className="rectangle">
                                <div className="similarto-spring-summer-autumn">
                                  <div className="similarto-spring-summer-autumn1" />
                                  
                                  <input
                                    className="similarto-spring-summer-autumn3"
                                    type="checkbox"
                                  />
                                  <div className="similarto-spring-summer-autumn4" />
                                  <div className="similarto-spring-summer-autumn5" />
                                  <div className="similarto-spring-summer-autumn6" />
                                  <div className="similarto-spring-summer-autumn7" />
                                </div>
                                <div className="div56">
                                  <p className="p4">Чорний</p>
                                  <p className="p5">Білий</p>
                                  <p className="p6">Молочний</p>
                                  <p className="p8">Мокко</p>
                                  <p className="p9">Карамельний</p>
                                  <p className="p10">Хакі</p>
                                </div>
                              </div>
                              <div className="div57">Показати ще</div>
                            </div>
                            <div className="similarto-spring-summer-autumn8">
                              <div className="div58" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <div className="div77">Тип</div>
                    {types.map((x) => (
  <Form.Check
    key={x.id}
    type="checkbox"
    id={x.id}
    label={x.name}
    style={{ marginTop: 15 }}
    onChange={(e) => handleCheckboxChange(e, 'type')}
  />
))}
 <hr className="my-4" />
                    <div className="div77">Матеріал</div>
{/* Для материалов */}
{materials.map((x) => (
  <Form.Check
    key={x.id}
    type="checkbox"
    id={x.id}
    label={x.name}
    style={{ marginTop: 15 }}
    onChange={(e) => handleCheckboxChange(e, 'material')}
  />
))}
                    
                    <hr className="my-4" />
                    <div className="icons-payment-systems">
                      <div onClick={applyFilters} className="div59">застосувати <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
<path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg> </div>
                     
                    </div>
                 
              </div>
              
            </MDBCol>

            <MDBCol className="containerCart">
              {items.slice(0, visibleItems).map((x) => (
                <CartProduct
                  add={AddBtn}
                  key={x.id}
                  unic={x.id}
                  name={x.name}
                  picture={x.image}
                  price={x.price}
                />
              ))}
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol></MDBCol>
            <MDBCol>
              {visibleItems < items.length && (
                <Button
                  style={{ borderRadius: '0px' }}
                  variant="outline-dark"
                  onClick={showMoreItems}
                >
                  Показати ще товари
                </Button>
              )}
            </MDBCol>
</MDBRow>
 
</MDBContainer>
</section>
    </div>
  );
};

export default ContentPage;
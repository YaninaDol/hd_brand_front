import React from 'react';
import { useState } from "react";
import './ContentPage.css';
import { Link, Outlet } from "react-router-dom";
import CartProduct from '../Components/CartProduct';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Slider from 'rc-slider';
import '../Components/range.css'; 
import { Navbar, Nav, NavDropdown,Offcanvas  } from 'react-bootstrap';
import {
 
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBRange 
} from 'mdb-react-ui-kit';
const ContentPage = ({ items,page,link,materials,types,AddBtn }) => {
  const [sortOrder, setSortOrder] = useState('');
  const [sortCollection, setSortCollection] = useState('');
  const [itemsPerRow, setItemsPerRow] = useState(12);
  const [visibleItems, setVisibleItems] = useState(itemsPerRow);
  const [allhidden, setAllHidden] = useState('');
  const [filteredhidden, setFilteredHidden] = useState('hidden');
  const [filteredProducts, setfilteredProducts] = useState([]);
  const showMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerRow);
  };
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  
  const [rangeValues, setRangeValues] = useState([0, 10000]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseSidebar = () => setShowOffcanvas(false);
  const handleShowSidebar = () => setShowOffcanvas(true);
  const handleRangeChange = (values) => {
    setRangeValues(values);
  };
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
    
      setSelectedSeasons((prev) => {
        return checked ? [...prev, value] : prev.filter((item) => item !== value);
      });
    }
  };
  const handleSort = (order) => {
    setSortOrder(order);
  
   
    const sortedProducts = [...items].sort((a, b) => {
      if (order === 'asc') {
        
        return a.salePrice - b.salePrice;
      } else {
        return b.salePrice - a.salePrice;
      }
     
    });
  
    setfilteredProducts(sortedProducts);
    setAllHidden('hidden');
    setFilteredHidden('');

  };


  const handleSortCollection = (order) => {
    setSortCollection(order);
  
    setfilteredProducts(items.filter((x) => x[order] === true));
    setAllHidden('hidden');
    setFilteredHidden('');

  };

  const applyFilters = () => {
  
  
    const filteredProducts1 = items.filter((product) => {
      const typeIncluded = selectedTypes.length === 0 || (product.subCategoryid && selectedTypes.includes(product.subCategoryid.toString()));
      const materialIncluded = selectedMaterials.length === 0 || (product.materialid && selectedMaterials.includes(product.materialid.toString()));
      const seasonIncluded = selectedSeasons.length === 0 || (product.seasonid && selectedSeasons.includes(product.seasonid.toString()));
    
   
    
      return typeIncluded && materialIncluded && seasonIncluded;
    });
    const priceFilteredProducts = filteredProducts1.filter((product) => {
      const priceInRange = product.salePrice >= rangeValues[0] && product.salePrice <= rangeValues[1];
    
      return priceInRange;
    });
  
    setfilteredProducts(priceFilteredProducts);
    setAllHidden('hidden');
    setFilteredHidden('');
    setSortOrder('');
    setSortCollection('');
  };
  function generatePath(categoryId) {
    switch (categoryId) {
      case 1:
        return 'clothes';
      case 2:
        return 'shoes';
      case 3:
        return 'accessorise';
  
      default:
        return 'unknown';
    }
  }

  const [showFilters, setShowFilters] = React.useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };


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
<MDBRow > 
<MDBCol  style={{marginLeft:25}}><h2 className="h25">{page}</h2></MDBCol>
<MDBCol style={{marginRight:35}}>  <p  onClick={handleShowSidebar}  id='filter_mob' style={{marginTop:35,textDecoration:'underline',position:'relative'}}  className="text-end">Фільтри</p>  </MDBCol>
   
        
       </MDBRow>
       

  <MDBRow className="justify-content-left align-items-left h-100">
    
 
                 
            
    <MDBCol  id='filters' lg="3" >
    
    <div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
  <h2 className="accordion-header" id="flush-headingOne">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseOne"
          aria-expanded="false"
          aria-controls="flush-collapseOne"
        >
          Сортувати
        </button>
      </h2>
      <div
        id="flush-collapseOne"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingOne"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <Form.Check
            type="checkbox"
            name="sorting"
            id="cheapToExpensive"
            label="Від дешевих до дорогих"
            checked={sortOrder === 'asc'}
            onChange={() => handleSort('asc')}
            style={{ marginTop: 15 }}
          />
          <Form.Check
            type="checkbox"
            name="sorting"
            id="expensiveToCheap"
            label="Від дорогих до дешевих"
            checked={sortOrder === 'desc'}
            onChange={() => handleSort('desc')}
            style={{ marginTop: 15 }}
          />
        </div>
      </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        Колекція
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
      <Form.Check
            type="checkbox"
            name="sorting"
            id="newcollection"
            label="Нова колекція"
            checked={sortCollection === 'isNew'}
            onChange={() => handleSortCollection('isNew')}
            style={{ marginTop: 15 }}
          />
          <Form.Check
            type="checkbox"
            name="sorting"
            id="salecollection"
            label="Знижки"
            checked={sortCollection === 'isDiscount'}
            onChange={() => handleSortCollection('isDiscount')}
            style={{ marginTop: 15 }}
          />
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        Ціна
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
  
      <Slider 
      
        range
        min={0}
        max={10000}
        step={50}
        value={rangeValues}
        onChange={handleRangeChange}
      />
      <p>
        {rangeValues[0]}&nbsp;  &nbsp;  &nbsp;      &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp;{rangeValues[1]}
      </p>
    </div>

     
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingFour">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
        Тип
      </button>
    </h2>
    <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
   
      {types.map((x) => (
  <Form.Check
    key={x.id}
    value={x.id}
    type="checkbox"
    id={x.id}
    label={x.name}
    style={{ marginTop: 15 }}
    onChange={(e) => handleCheckboxChange(e, 'type')}
  />
))}
      </div>
    </div>
  </div>


  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingFive">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
        Сезон
      </button>
    </h2>
    <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
   
      <Form.Check 
            type='checkbox'
         
            value={3}
           
            onChange={(e) => handleCheckboxChange(e, 'season')}
            label='Весна'
            style={{ marginTop:15}}
          />
          <Form.Check 
            type='checkbox'
           
           
            onChange={(e) => handleCheckboxChange(e, 'season')}
            value={1}
            label='Літо'
            style={{ marginTop:15}}
          />
          <Form.Check 
            type='checkbox'
          
            value={2}
          
            onChange={(e) => handleCheckboxChange(e, 'season')}
            label='Зима'
            style={{ marginTop:15}}
          />
          <Form.Check 
            type='checkbox'
           
            value={4}
         
            onChange={(e) => handleCheckboxChange(e, 'season')}
            label='Осінь'
            style={{ marginTop:15}}
          />
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingSix">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
        Матеріал
      </button>
    </h2>
    <div id="flush-collapseSix" class="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
   
      {materials.map((x) => (
  <Form.Check
    key={x.id}
    value={x.id}
    type="checkbox"
    id={x.id}
    label={x.name}
    style={{ marginTop: 15 }}
    onChange={(e) => handleCheckboxChange(e, 'material')}
  />
))}
      </div>
    </div>
  </div>


  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingSeven">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
        Колір
      </button>
    </h2>
    <div id="flush-collapseSeven" class="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
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

  </div>
        
                    <hr className="my-4" />
                    <div className="icons-payment-systems">
                      <div onClick={applyFilters} className="div59">застосувати <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
<path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg> </div>
                     
                    </div>
              
              
            </MDBCol>
   

            <MDBCol hidden={allhidden} className="containerCart">
            {items.length > 0 ? (
    items.slice(0, visibleItems).map((x) => (
      <Link to={`/${generatePath(x.categoryid)}/${x.subCategoryid}/${x.id}`}>
      <CartProduct
      id_key={x.id}
      imageSrc1={x.image}
      imageSrc2={x.image2}
      isNew={x.isNew}
      isDiscount={x.isDiscount}
      isLiked={false}
      descriprion={x.name}
      price1={x.price}
      price2={x.salePrice}
      />
      </Link>
    ))
  ) : (
    <div>Нічого не знайдено </div>
  )}
            </MDBCol>
            <MDBCol hidden={filteredhidden} className="containerCart">
            {filteredProducts.length > 0 ? (
    filteredProducts.slice(0, visibleItems).map((x) => (
      <Link to={`/${generatePath(x.categoryid)}/${x.subCategoryid}/${x.id}`}>
      <CartProduct
      id_key={x.id}
      imageSrc1={x.image}
      imageSrc2={x.image2}
      isNew={x.isNew}
      isDiscount={x.isDiscount}
      isLiked={false}
      descriprion={x.name}
      price1={x.price}
      price2={x.salePrice}
      />
      </Link>
    ))
  ) : (
    <div>Нічого не знайдено</div>
  )}
            </MDBCol>
          </MDBRow>
          <MDBRow >
            <MDBCol className='column-hide'  ></MDBCol>
            <MDBCol  className='showmoreBtn' >
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
<Offcanvas show={showOffcanvas} onHide={handleCloseSidebar}  placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ФІЛЬТРИ</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
  <h2 className="accordion-header" id="flush-headingOne">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseOne"
          aria-expanded="false"
          aria-controls="flush-collapseOne"
        >
          Сортувати
        </button>
      </h2>
      <div
        id="flush-collapseOne"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingOne"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <Form.Check
            type="checkbox"
            name="sorting"
            id="cheapToExpensive"
            label="Від дешевих до дорогих"
            checked={sortOrder === 'asc'}
            onChange={() => handleSort('asc')}
            style={{ marginTop: 15 }}
          />
          <Form.Check
            type="checkbox"
            name="sorting"
            id="expensiveToCheap"
            label="Від дорогих до дешевих"
            checked={sortOrder === 'desc'}
            onChange={() => handleSort('desc')}
            style={{ marginTop: 15 }}
          />
        </div>
      </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        Колекція
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
      <Form.Check
            type="checkbox"
            name="sorting"
            id="newcollection"
            label="Нова колекція"
            checked={sortCollection === 'isNew'}
            onChange={() => handleSortCollection('isNew')}
            style={{ marginTop: 15 }}
          />
          <Form.Check
            type="checkbox"
            name="sorting"
            id="salecollection"
            label="Знижки"
            checked={sortCollection === 'isDiscount'}
            onChange={() => handleSortCollection('isDiscount')}
            style={{ marginTop: 15 }}
          />
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        Ціна
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
  
      <Slider 
      
        range
        min={0}
        max={10000}
        step={50}
        value={rangeValues}
        onChange={handleRangeChange}
      />
      <p>
        {rangeValues[0]}&nbsp;  &nbsp;    &nbsp; &nbsp;    &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;      &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp;{rangeValues[1]}
      </p>
    </div>

     
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingFour">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
        Тип
      </button>
    </h2>
    <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
   
      {types.map((x) => (
  <Form.Check
    key={x.id}
    value={x.id}
    type="checkbox"
    id={x.id}
    label={x.name}
    style={{ marginTop: 15 }}
    onChange={(e) => handleCheckboxChange(e, 'type')}
  />
))}
      </div>
    </div>
  </div>


  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingFive">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
        Сезон
      </button>
    </h2>
    <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
   
      <Form.Check 
            type='checkbox'
         
            value={3}
           
            onChange={(e) => handleCheckboxChange(e, 'season')}
            label='Весна'
            style={{ marginTop:15}}
          />
          <Form.Check 
            type='checkbox'
           
           
            onChange={(e) => handleCheckboxChange(e, 'season')}
            value={1}
            label='Літо'
            style={{ marginTop:15}}
          />
          <Form.Check 
            type='checkbox'
          
            value={2}
          
            onChange={(e) => handleCheckboxChange(e, 'season')}
            label='Зима'
            style={{ marginTop:15}}
          />
          <Form.Check 
            type='checkbox'
           
            value={4}
         
            onChange={(e) => handleCheckboxChange(e, 'season')}
            label='Осінь'
            style={{ marginTop:15}}
          />
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingSix">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
        Матеріал
      </button>
    </h2>
    <div id="flush-collapseSix" class="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
   
      {materials.map((x) => (
  <Form.Check
    key={x.id}
    value={x.id}
    type="checkbox"
    id={x.id}
    label={x.name}
    style={{ marginTop: 15 }}
    onChange={(e) => handleCheckboxChange(e, 'material')}
  />
))}
      </div>
    </div>
  </div>


  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingSeven">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
        Колір
      </button>
    </h2>
    <div id="flush-collapseSeven" class="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
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

  </div>
        
                    <hr className="my-4" />
                    <div className="icons-payment-systems">
                      <div onClick={applyFilters} className="div59">застосувати <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
<path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg> </div>
                     
                    </div>
        </Offcanvas.Body>
      </Offcanvas>
    
    </div>
  );
};

export default ContentPage;
import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import './ContentPage.css';
import { Link} from "react-router-dom";
import CartProduct from '../Components/CartProduct';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Slider from 'rc-slider';
import '../Components/range.css'; 
import { Offcanvas  } from 'react-bootstrap';
import {
 
  MDBContainer,
  MDBCol,
  MDBRow 
} from 'mdb-react-ui-kit';
const ContentPageSubCat = ({ items,page,selectedCurrency,materials,handleCurrencyChange,convertPrice }) => {
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
  const [selectedColor, setSelectedColor] = useState('');
  const [rangeValues, setRangeValues] = useState([0, 10000]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseSidebar = () => setShowOffcanvas(false);
  const handleShowSidebar = () => setShowOffcanvas(true);


  useEffect(() => {
    applyFilters();
  }, [items,sortCollection,sortOrder]);


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
  
//     let sortedProducts;
//     if (filteredProducts.length > 0) {
       
//       sortedProducts = [...filteredProducts].sort((a, b) => {
//         if (order === 'asc') {
//             return convertPrice(a.salePrice,selectedCurrency) - convertPrice(b.salePrice,selectedCurrency);
//         } else {
//             return convertPrice(b.salePrice,selectedCurrency) - convertPrice(a.salePrice,selectedCurrency);
//         }
//     });
// } else {
  
//     sortedProducts = [...items].sort((a, b) => {
//         if (order === 'asc') {
//           return convertPrice(a.salePrice,selectedCurrency) - convertPrice(b.salePrice,selectedCurrency);
//         } else {
//             return convertPrice(b.salePrice,selectedCurrency) - convertPrice(a.salePrice,selectedCurrency);
//         }
//     });
//     }

    
//     setfilteredProducts(sortedProducts);
//     setAllHidden('hidden');
//     setFilteredHidden('');
};

  const handleSortCollection = (order) => {
    
    setSortCollection(order);
  
    

  };

  const applyFilters = () => {
    const filteredProducts1 = items.filter((product) => {
        const typeIncluded = selectedTypes.length === 0 || (product.subCategoryid && selectedTypes.includes(product.subCategoryid.toString()));
        const materialIncluded = selectedMaterials.length === 0 || (product.materialid && selectedMaterials.includes(product.materialid.toString()));
        const seasonIncluded = selectedSeasons.length === 0 || (product.seasonid && selectedSeasons.includes(product.seasonid.toString()));
        const collection = sortCollection === '' || (product[sortCollection] && product[sortCollection] === true);
        const colorIncluded = selectedColor === '' || (product.color && product.color === selectedColor);

        return typeIncluded && materialIncluded && seasonIncluded && colorIncluded && collection;
    });

    const priceFilteredProducts = filteredProducts1.filter((product) => {
        const priceInRange = convertPrice(product.salePrice, selectedCurrency) >= rangeValues[0] && convertPrice(product.salePrice, selectedCurrency) <= rangeValues[1];
        return priceInRange;
    });

    let sortedProducts;
    if (priceFilteredProducts.length > 0) {
        sortedProducts = [...priceFilteredProducts].sort((a, b) => {
            if (sortOrder === 'asc') {
                return convertPrice(a.salePrice, selectedCurrency) - convertPrice(b.salePrice, selectedCurrency);
            } else {
                return convertPrice(b.salePrice, selectedCurrency) - convertPrice(a.salePrice, selectedCurrency);
            }
        });
    } else {
        sortedProducts = [...items].sort((a, b) => {
            if (sortOrder === 'asc') {
                return convertPrice(a.salePrice, selectedCurrency) - convertPrice(b.salePrice, selectedCurrency);
            } else {
                return convertPrice(b.salePrice, selectedCurrency) - convertPrice(a.salePrice, selectedCurrency);
            }
        });

       
        resetFilters();
    }

    setfilteredProducts(sortedProducts);
    setAllHidden('hidden');
    setFilteredHidden('');
    handleCloseSidebar();
};
  const resetFilters = () => {
    setfilteredProducts([]);
    setAllHidden('');
    setFilteredHidden('hidden');
    setSortOrder('');
    setSelectedMaterials([]);
    setSelectedSeasons([]);
    setSelectedTypes([]); 
    setSortCollection('');
    setSelectedColor('');
    setRangeValues([0, 10000]); 
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });
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
      <MDBRow>
        <MDBCol>
        {rangeValues[0]}
        </MDBCol>
        <MDBCol className='text-end'>
        {rangeValues[1]}
        </MDBCol>
      </MDBRow>
      
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
            label='Весна-Осінь'
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
            label='Зима-Демісезон'
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
      <div className="frame-set">
      <div className={`color ${selectedColor === 'Білий' ? 'selected' : ''}`} onClick={()=>setSelectedColor('Білий')} >
        <div key="0" className="white"  />
        <div className="div132">Білий</div>
      </div>
      <div  key="1" onClick={()=>setSelectedColor('Бежевий')} className={`color1 ${selectedColor === 'Бежевий' ? 'selected' : ''}`}>
        
        <div className="color-child" />
        <div className="div133">Бежевий</div>
      </div>
      <div  key="2" onClick={()=>setSelectedColor('Коричневий')}  className={`color2 ${selectedColor === 'Коричневий' ? 'selected' : ''}`}>
        <div className="color-item" />
        <div className="div134">Коричневий</div>
      </div>
      <div  key="3" onClick={()=>setSelectedColor('Чорний')}  className={`color3 ${selectedColor === 'Чорний' ? 'selected' : ''}`}>
        <div className="color-inner" />
        <div className="div135">Чорний</div>
      </div>
      <div  key="4" onClick={()=>setSelectedColor('Сірий')}   className={`color4 ${selectedColor === 'Сірий' ? 'selected' : ''}`}>
        <div className="color-child1" />
        <div className="div136">Сірий</div>
      </div>
      <div  key="5" onClick={()=>setSelectedColor('Червоний')}  className={`color5 ${selectedColor === 'Червоний' ? 'selected' : ''}`}>
        <div className="color-child2" />
        <div className="div137">Червоний</div>
      </div>
      <div  key="6"  onClick={()=>setSelectedColor('Рожевий')}  className={`color6 ${selectedColor === 'Рожевий' ? 'selected' : ''}`}>
        <div className="color-child3" />
        <div className="div138">Рожевий</div>
      </div>
      <div  key="7"  onClick={()=>setSelectedColor('Фіолетовий')}  className={`color7 ${selectedColor === 'Фіолетовий' ? 'selected' : ''}`}>
        <div className="color-child4" />
        <div className="div139">Фіолетовий</div>
      </div>
      <div  key="8"  onClick={()=>setSelectedColor('Блакитний')}   className={`color8 ${selectedColor === 'Блакитний' ? 'selected' : ''}`}>
        <div className="color-child5" />
        <div className="div140">Блакитний</div>
      </div>
      <div  key="9"  onClick={()=>setSelectedColor('Зелений')}  className={`color9 ${selectedColor === 'Зелений' ? 'selected' : ''}`}>
        <div className="color-child6" />
        <div className="div141">Зелений</div>
      </div>
      <div  key="10"  onClick={()=>setSelectedColor('Комбінований')}  className={`color10 ${selectedColor === 'Комбінований' ? 'selected' : ''}`}>
        <div className="color-child7" />
        <div className="div142">Комбінований</div>
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
{(sortOrder !== '' || selectedColor !== '' || selectedMaterials.length > 0 || selectedSeasons.length > 0 || selectedTypes.length > 0 || sortCollection !== '') && (
  <div style={{marginTop:'10px',opacity:'0.5',textDecoration:'underline'}} onClick={resetFilters} >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
    скинути всі фільтри 
  </div>
)} 
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
      imageSrc3={x.image3}
      video={x.video}
      isNew={x.isNew}
      isDiscount={x.isDiscount}
      isLiked={false}
      descriprion={x.name}
      price1={convertPrice(x.price,selectedCurrency)}
      currency={selectedCurrency}
      price2={convertPrice(x.salePrice,selectedCurrency)}
      />
      </Link>
    ))
  ) : (
    <div> </div>
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
      imageSrc3={x.image3}
      video={x.video}
      isNew={x.isNew}
      isDiscount={x.isDiscount}
      isLiked={false}
      descriprion={x.name}
      price1={convertPrice(x.price,selectedCurrency)}
      currency={selectedCurrency}
      price2={convertPrice(x.salePrice,selectedCurrency)}
      />
      </Link>
    ))
  ) : (
    <div></div>
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
      <MDBRow>
        <MDBCol>
        {rangeValues[0]}
        </MDBCol>
        <MDBCol className='text-end'>
        {rangeValues[1]}
        </MDBCol>
      </MDBRow>
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
            label='Весна-Осінь'
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
            label='Зима-Демісезон'
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
      <div className="frame-set">
      <div className={`color ${selectedColor === 'Білий' ? 'selected' : ''}`} onClick={()=>setSelectedColor('Білий')} >
        <div key="0" className="white"  />
        <div className="div132">Білий</div>
      </div>
      <div  key="1" onClick={()=>setSelectedColor('Бежевий')} className={`color1 ${selectedColor === 'Бежевий' ? 'selected' : ''}`}>
        
        <div className="color-child" />
        <div className="div133">Бежевий</div>
      </div>
      <div  key="2" onClick={()=>setSelectedColor('Коричневий')}  className={`color2 ${selectedColor === 'Коричневий' ? 'selected' : ''}`}>
        <div className="color-item" />
        <div className="div134">Коричневий</div>
      </div>
      <div  key="3" onClick={()=>setSelectedColor('Чорний')}  className={`color3 ${selectedColor === 'Чорний' ? 'selected' : ''}`}>
        <div className="color-inner" />
        <div className="div135">Чорний</div>
      </div>
      <div  key="4" onClick={()=>setSelectedColor('Сірий')}   className={`color4 ${selectedColor === 'Сірий' ? 'selected' : ''}`}>
        <div className="color-child1" />
        <div className="div136">Сірий</div>
      </div>
      <div  key="5" onClick={()=>setSelectedColor('Червоний')}  className={`color5 ${selectedColor === 'Червоний' ? 'selected' : ''}`}>
        <div className="color-child2" />
        <div className="div137">Червоний</div>
      </div>
      <div  key="6"  onClick={()=>setSelectedColor('Рожевий')}  className={`color6 ${selectedColor === 'Рожевий' ? 'selected' : ''}`}>
        <div className="color-child3" />
        <div className="div138">Рожевий</div>
      </div>
      <div  key="7"  onClick={()=>setSelectedColor('Фіолетовий')}  className={`color7 ${selectedColor === 'Фіолетовий' ? 'selected' : ''}`}>
        <div className="color-child4" />
        <div className="div139">Фіолетовий</div>
      </div>
      <div  key="8"  onClick={()=>setSelectedColor('Блакитний')}   className={`color8 ${selectedColor === 'Блакитний' ? 'selected' : ''}`}>
        <div className="color-child5" />
        <div className="div140">Блакитний</div>
      </div>
      <div  key="9"  onClick={()=>setSelectedColor('Зелений')}  className={`color9 ${selectedColor === 'Зелений' ? 'selected' : ''}`}>
        <div className="color-child6" />
        <div className="div141">Зелений</div>
      </div>
      <div  key="10"  onClick={()=>setSelectedColor('Комбінований')}  className={`color10 ${selectedColor === 'Комбінований' ? 'selected' : ''}`}>
        <div className="color-child7" />
        <div className="div142">Комбінований</div>
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
{(sortOrder !== '' || selectedColor !== '' || selectedMaterials.length > 0 || selectedSeasons.length > 0 || selectedTypes.length > 0 || sortCollection !== '') && (
    <div style={{marginTop:'10px',opacity:'0.5',textDecoration:'underline'}} onClick={resetFilters} >
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
      скинути всі фільтри 
     
    </div>
)}  
                    </div>
        </Offcanvas.Body>
      </Offcanvas>
    
    </div>
  );
};

export default ContentPageSubCat;
import React from 'react';
import { useState } from "react";
import { useEffect,useRef } from "react";
import { useTranslation } from 'react-i18next';
import './ContentPage.css';
import { Link} from "react-router-dom";
import CartProduct from '../Components/CartProduct';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Slider from 'rc-slider';
import '../Components/range.css'; 
import { useParams } from 'react-router-dom';
import { Offcanvas  } from 'react-bootstrap';
import {
 
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBSpinner
} from 'mdb-react-ui-kit';
import CartProductClick from '../Components/CartProductClick';
const ContentPageSubCat = ({ items,page,selectedCurrency,materials,handleCurrencyChange,convertPrice,link }) => {
  const {i18n, t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('');
  const [sortCollection, setSortCollection] = useState('');
  const [itemsPerRow, setItemsPerRow] = useState(12);
    const [visibleItems, setVisibleItems] = useState(() => {
     
      return parseInt(sessionStorage.getItem('visibleItems'), 10) || itemsPerRow;
    });
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
 const [selectedSizes, setSelectedSizes] = useState([]);
  const handleCloseSidebar = () => setShowOffcanvas(false);
  const handleShowSidebar = () => setShowOffcanvas(true);

  const activeFiltersCount = [
    rangeValues[0] !== 0 || rangeValues[1] !== 10000,
    sortOrder !== '',
    selectedColor !== '',
    selectedMaterials.length > 0,
    selectedSeasons.length > 0,
    selectedTypes.length > 0,
    sortCollection !== ''
  ].filter(Boolean).length;  
  



  const { categoryName, subcategoryid } = useParams(); 
  const [currentParams, setCurrentParams] = useState({
    categoryName,
    subcategoryid,
  });

  useEffect(() => {
  
    if (
      currentParams.categoryName !== categoryName ||
      currentParams.subcategoryid !== subcategoryid
    ) {
      resetFilters();
      setCurrentParams({ categoryName, subcategoryid });
      setVisibleItems(itemsPerRow); 
      sessionStorage.removeItem("selectedProduct");
      setSelectedProduct(null);
    }
  }, [categoryName, subcategoryid]);

  const [filters, setFilters] = useState({
    selectedTypes: [],
    selectedMaterials: [],
    selectedSeasons: [],
    selectedSizes: [],
    selectedColor: '',
    rangeValues: [0, 10000],
    sortOrder: '',
    sortCollection: '',
  });
  useEffect(() => {
   
    const savedFilters = JSON.parse(sessionStorage.getItem('filters')) || {};
    setSelectedTypes(savedFilters.selectedTypes || []);
    setSelectedMaterials(savedFilters.selectedMaterials || []);
    setSelectedSeasons(savedFilters.selectedSeasons || []);
    setSelectedSizes(savedFilters.selectedSizes || []);
    setSelectedColor(savedFilters.selectedColor || '');
    setRangeValues(savedFilters.rangeValues || [0, 10000]);
    setSortOrder(savedFilters.sortOrder || '');
    setSortCollection(savedFilters.sortCollection || '');



    setFilters({
      selectedTypes: savedFilters.selectedTypes || [],
      selectedMaterials: savedFilters.selectedMaterials || [],
      selectedSeasons: savedFilters.selectedSeasons || [],
      selectedSizes: savedFilters.selectedSizes || [],
      selectedColor: savedFilters.selectedColor || '',
      rangeValues: savedFilters.rangeValues || [0, 10000],
      sortOrder: savedFilters.sortOrder || '',
      sortCollection: savedFilters.sortCollection || '',
    });
  }, []);
useEffect(() => {
    const filtersToSave = { ...filters };
    sessionStorage.setItem('filters', JSON.stringify(filtersToSave));
    localStorage.removeItem("filters");
  }, [filters]); 

  useEffect(() => {
    const filtersToSave = {
      selectedTypes,
      selectedMaterials,
      selectedSeasons,
      selectedSizes,
      selectedColor,
      rangeValues,
      sortOrder,
      sortCollection
    };
    sessionStorage.setItem('filters', JSON.stringify(filtersToSave));
  }, [
    selectedTypes,
    selectedMaterials,
    selectedSeasons,
    selectedSizes,
    selectedColor,
    rangeValues,
    sortOrder,
    sortCollection
  ]);


 

  useEffect(() => {
    sessionStorage.setItem('visibleItems', visibleItems);
  }, [visibleItems]);

  useEffect(() => {

    applyFilters();

   
  }, [items]);
const [selectedProduct, setSelectedProduct] = useState(sessionStorage.getItem('selectedProduct')); // Состояние для выбранного товара

const itemRefs = useRef([]); 



useEffect(() => {
  if (!loading && selectedProduct && itemRefs.current[selectedProduct]) {
    console.log("Selected product:", selectedProduct); // Отрабатывает при завершении загрузки
    itemRefs.current[selectedProduct].scrollIntoView({ behavior: 'smooth' });
  }
  else{ window.scrollTo(0, 0);}
}, [loading, selectedProduct]);

useEffect(() => {
  // Имитируем более длительную загрузку
  const loadingTimeout = setTimeout(() => {
    setLoading(false); // Завершаем загрузку
  }, 3000); // Увеличьте время, например, до 3 секунд

  return () => clearTimeout(loadingTimeout);
}, []);

  const handleRangeChange = (values) => {
    setRangeValues(values);
  };
  const handleCheckboxChange = (event, type) => {
    const { value, checked } = event.target;
    const numericValue = parseInt(value, 10);
    if (type === 'type') {
      setSelectedTypes((prev) => {
        return checked ? [...prev, value] : prev.filter((item) => item !== value);
      });
    } else if (type === 'material') {
      setSelectedMaterials((prev) => {
        return checked
        ? [...prev, numericValue]
        : prev.filter((item) => item !== numericValue);
      });
    } else if (type === 'season') {
    
      setSelectedSeasons((prev) => {
        return checked ? [...prev, numericValue] : prev.filter((item) => item !== numericValue);
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
        const typeIncluded = selectedTypes.length === 0 || (product.subCategoryid && selectedTypes.includes(parseInt(product.subCategoryid, 10)));
        const materialIncluded = selectedMaterials.length === 0 || (product.materialid && selectedMaterials.includes(product.materialid));
        const seasonIncluded = selectedSeasons.length === 0 || (product.seasonid && selectedSeasons.includes(product.seasonid));
        const collection = sortCollection === '' || (product[sortCollection] && product[sortCollection] === true);
        const colorIncluded = selectedColor === '' || (product.color && product.color === selectedColor);

        return typeIncluded && materialIncluded && seasonIncluded && colorIncluded && collection;
    });

    const priceFilteredProducts = filteredProducts1.filter((product) => {
        const priceInRange = convertPrice(product.salePrice, selectedCurrency) >= rangeValues[0] && convertPrice(product.salePrice, selectedCurrency) <= rangeValues[1];
        return priceInRange;
    });

    let sortedProducts;
    if(sortOrder != '')
      {
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
  }else sortedProducts = [...priceFilteredProducts];
    setfilteredProducts(sortedProducts);
    setAllHidden('hidden');
    setFilteredHidden('');
    handleCloseSidebar();
};
  const resetFilters = () => {
    setVisibleItems(itemsPerRow); 
    setSelectedProduct(null); 
    sessionStorage.removeItem("selectedProduct");
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
    handleCloseSidebar();
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
<MDBCol  style={{marginLeft:5}}><h2 className="h25">{page}</h2></MDBCol>
<MDBCol style={{marginRight:35}}>  <p  onClick={handleShowSidebar}  id='filter_mob' style={{marginTop:35,textDecoration:'underline',position:'relative'}}  className="text-end">{t('filters')} ({activeFiltersCount}) </p>  </MDBCol>
   
        
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
          {t('sort')}
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
            label={t('ascending')}
            checked={sortOrder === 'asc'}
            onChange={() => handleSort('asc')}
            style={{ marginTop: 15 }}
          />
          <Form.Check
            type="checkbox"
            name="sorting"
            id="expensiveToCheap"
            label={t('decreasing')}
            checked={sortOrder === 'desc'}
            onChange={() => handleSort('desc')}
            style={{ marginTop: 15 }}
          />
        </div>
      </div>
  </div>
  {(page !== t('sale') && page !== t('instock')) && (
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
      {t('collection')}
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
      <Form.Check
            type="checkbox"
            name="sorting"
            id="newcollection"
            label={t('new_items')}
            checked={sortCollection === 'isNew'}
            onChange={() => handleSortCollection('isNew')}
            style={{ marginTop: 15 }}
          />
          {/* <Form.Check
            type="checkbox"
            name="sorting"
            id="instockcollection"
            label={t('instock')}
           
            checked={sortCollection === 'isInStock'}
             // onChange={() => handleSortCollection('isInStock')}
            onChange={() => window.location.href='/instock'}
            style={{ marginTop: 15 }}
          /> */}
          <Form.Check
            type="checkbox"
            name="sorting"
            id="salecollection"
            label={t('discount_items')}
            checked={sortCollection === 'isDiscount'}
            onChange={() => handleSortCollection('isDiscount')}
            style={{ marginTop: 15 }}
          />
           
      </div>
    </div>
    
  </div>)}

  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
      {t('price')}
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

  {link!=t('accessorise')&&(
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingFive">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
      {t('season')}
      </button>
    </h2>
    <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
   
     
      <Form.Check 
            type='checkbox'
           
            checked={selectedSeasons.includes(1)}
            onChange={(e) => handleCheckboxChange(e, 'season')}
            value={1}
            label={i18n.language === 'en' ? 'Summer' : 'Літо'}
            style={{ marginTop:15}}
          />
           <Form.Check 
            type='checkbox'
         
            value={3}
            checked={selectedSeasons.includes(3)}
            onChange={(e) => handleCheckboxChange(e, 'season')}
            label={i18n.language === 'en' ? 'Spring-Autumn' : 'Весна-Осінь'}
            style={{ marginTop:15}}
          />
          <Form.Check 
            type='checkbox'
          
            value={2}
            checked={selectedSeasons.includes(2)}
            onChange={(e) => handleCheckboxChange(e, 'season')}
            label={i18n.language === 'en' ? 'Winter' : 'Зима'}
            style={{ marginTop:15}}
          />
          <Form.Check 
            type='checkbox'
           
            value={4}
            checked={selectedSeasons.includes(4)}
            onChange={(e) => handleCheckboxChange(e, 'season')}
            label={i18n.language === 'en' ? 'Winter-Demiseason' : 'Зима-Демісезон'}
            style={{ marginTop:15}}
          />
      </div>
    </div>
  </div>
  )}
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingSix">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
      {t('material')}
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
    checked={selectedMaterials.includes(x.id)}
    label={i18n.language === 'en' ? x.nameEng : x.name}
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
      {t('color')}
      </button>
    </h2>
    <div id="flush-collapseSeven" class="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
      <div className="frame-set">
      <div className={`color ${selectedColor === 'Білий' ? 'selected' : ''}`} onClick={()=>setSelectedColor('Білий')} >
        <div key="0" className="white"  />
        <div className="div132"> {i18n.language === 'en' ? 'White' : 'Білий'}</div>
      </div>
      <div  key="1" onClick={()=>setSelectedColor('Бежевий')} className={`color1 ${selectedColor === 'Бежевий' ? 'selected' : ''}`}>
        
        <div className="color-child" />
        <div className="div133">{i18n.language === 'en' ? 'Beige' : 'Бежевий'}</div>
      </div>
      <div  key="2" onClick={()=>setSelectedColor('Коричневий')}  className={`color2 ${selectedColor === 'Коричневий' ? 'selected' : ''}`}>
        <div className="color-item" />
        <div className="div134">{i18n.language === 'en' ? 'Brown' : 'Коричневий'}</div>
      </div>
      <div  key="3" onClick={()=>setSelectedColor('Чорний')}  className={`color3 ${selectedColor === 'Чорний' ? 'selected' : ''}`}>
        <div className="color-inner" />
        <div className="div135">{i18n.language === 'en' ? 'Black' : 'Чорний'}</div>
      </div>
      <div  key="4" onClick={()=>setSelectedColor('Сірий')}   className={`color4 ${selectedColor === 'Сірий' ? 'selected' : ''}`}>
        <div className="color-child1" />
        <div className="div136">{i18n.language === 'en' ? 'Gray' : 'Сірий'}</div>
      </div>
      <div  key="14"  onClick={()=>setSelectedColor('Бордовий')}   className={`color8 ${selectedColor === 'Бордовий' ? 'selected' : ''}`}>
        <div className="color-child44" />
        <div className="div140">{i18n.language === 'en' ? 'Burgundy' : 'Бордовий'}</div>
      </div>
      <div  key="5" onClick={()=>setSelectedColor('Червоний')}  className={`color5 ${selectedColor === 'Червоний' ? 'selected' : ''}`}>
        <div className="color-child2" />
        <div className="div137">{i18n.language === 'en' ? 'Red' : 'Червоний'}</div>
      </div>
      <div  key="11" onClick={()=>setSelectedColor('Помаранчевий')}  className={`color5 ${selectedColor === 'Помаранчевий' ? 'selected' : ''}`}>
        <div className="color-child11" />
        <div className="div137">{i18n.language === 'en' ? 'Orange' : 'Помаранчевий'}</div>
      </div>
      <div  key="12" onClick={()=>setSelectedColor('Жовтий')}  className={`color5 ${selectedColor === 'Жовтий' ? 'selected' : ''}`}>
        <div className="color-child12" />
        <div className="div137">{i18n.language === 'en' ? 'Yellow' : 'Жовтий'}</div>
      </div>
      <div  key="6"  onClick={()=>setSelectedColor('Рожевий')}  className={`color6 ${selectedColor === 'Рожевий' ? 'selected' : ''}`}>
        <div className="color-child3" />
        <div className="div138">{i18n.language === 'en' ? 'Pink' : 'Рожевий'}</div>
      </div>
      <div  key="7"  onClick={()=>setSelectedColor('Фіолетовий')}  className={`color7 ${selectedColor === 'Фіолетовий' ? 'selected' : ''}`}>
        <div className="color-child4" />
        <div className="div139">{i18n.language === 'en' ? 'Violet' : 'Фіолетовий'}</div>
      </div>
      <div  key="13"  onClick={()=>setSelectedColor('Блакитний')}   className={`color8 ${selectedColor === 'Блакитний' ? 'selected' : ''}`}>
        <div className="color-child55" />
        <div className="div140">{i18n.language === 'en' ? 'Light Blue' : 'Блакитний'}</div>
      </div>
      <div  key="8"  onClick={()=>setSelectedColor('Синій')}   className={`color8 ${selectedColor === 'Синій' ? 'selected' : ''}`}>
        <div className="color-child5" />
        <div className="div140">{i18n.language === 'en' ? 'Blue' : 'Синій'}</div>
      </div>
     
      <div  key="9"  onClick={()=>setSelectedColor('Зелений')}  className={`color9 ${selectedColor === 'Зелений' ? 'selected' : ''}`}>
        <div className="color-child6" />
        <div className="div141">{i18n.language === 'en' ? 'Green' : 'Зелений'}</div>
      </div>
      <div  key="10"  onClick={()=>setSelectedColor('Комбінований')}  className={`color10 ${selectedColor === 'Комбінований' ? 'selected' : ''}`}>
        <div className="color-child7" />
        <div className="div142">{i18n.language === 'en' ? 'Combined' : 'Комбінований'}</div>
      </div>
    
      </div>
    
      </div>
    </div>
  </div>

  </div>
        
  <hr className="my-4" />
                    <div className="icons-payment-systems">
                      <div onClick={applyFilters} className="div59">{t('apply')} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
<path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg> </div>
{(rangeValues[0] !== 0 || 
  rangeValues[1] !== 10000||sortOrder!=='' || selectedColor !== '' || selectedMaterials.length > 0 || selectedSeasons.length > 0 || selectedTypes.length > 0 || sortCollection !== '') && (
  <div style={{marginTop:'10px', opacity:'0.5', textDecoration:'underline'}} onClick={resetFilters} >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
    {t('reset_filters')}
  </div>
)}
                    </div>
              
              
            </MDBCol>
   

            <MDBCol hidden={allhidden} className="containerCart">
        {loading ? (
         <div style={{
          position: 'fixed', // Теперь он будет фиксирован поверх контента
          top: 0,
          left: 0,
          width: '100vw', // На весь экран
          height: '100vh', // На весь экран
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgb(255, 255, 255)', // Немного затемняем фон
          zIndex: 9999, // Обеспечиваем, что спиннер будет наверху
        }} className="spinner-container">
         <MDBSpinner big />
         </div>
        ) : items.length > 0 ? (
          items.slice(0, visibleItems).map((x) => (
            <div>
              <div
            key={x.id}
            ref={(el) => (itemRefs.current[x.id] = el)} // Привязываем ссылку к каждому элементу
          
            style={{ cursor: 'pointer' }}
          ></div>
              <CartProductClick
               link={`/${generatePath(x.categoryid)}/${x.subCategoryid}/${x.id}`} key={x.id}
                id_key={x.id}
                imageSrc1={x.image}
                imageSrc2={x.image2}
                imageSrc3={x.image3}
                isNew={x.isNew}
                isDiscount={x.isDiscount}
                isLiked={false}
                descriprion={i18n.language === 'en' ? x.nameEng : x.name}
                price1={convertPrice(x.price, selectedCurrency)}
                currency={selectedCurrency}
                price2={convertPrice(x.salePrice, selectedCurrency)}
              />
            </div>
          ))
        ) : (
          <div>{t('no_items')}</div>
        )}
      </MDBCol>
      <MDBCol hidden={filteredhidden} className="containerCart">
        {loading ? (
           <div style={{
            position: 'fixed', // Теперь он будет фиксирован поверх контента
            top: 0,
            left: 0,
            width: '100vw', // На весь экран
            height: '100vh', // На весь экран
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgb(255, 255, 255)', // Немного затемняем фон
            zIndex: 9999, // Обеспечиваем, что спиннер будет наверху
          }} className="spinner-container">
          <MDBSpinner big />
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.slice(0, visibleItems).map((x) => (
            <div>
              <div
            key={x.id}
            ref={(el) => (itemRefs.current[x.id] = el)} // Привязываем ссылку к каждому элементу
          
            style={{ cursor: 'pointer' }}
          ></div>
              <CartProductClick
              link={`/${generatePath(x.categoryid)}/${x.subCategoryid}/${x.id}`} key={x.id}
                id_key={x.id}
                imageSrc1={x.image}
                imageSrc2={x.image2}
                imageSrc3={x.image3}
                isNew={x.isNew}
                isDiscount={x.isDiscount}
                isLiked={false}
                descriprion={i18n.language === 'en' ? x.nameEng : x.name}
                price1={convertPrice(x.price, selectedCurrency)}
                currency={selectedCurrency}
                price2={convertPrice(x.salePrice, selectedCurrency)}
              />
              </div>
            
          ))
        ) : (
          <div>{i18n.language === 'en' ? 'Nothing found...Use another parameters': 'За такими параметрами нічого не знайдено..'}</div>
        )}
      </MDBCol>
      {loading ? (
          <></>
        ) :   <MDBRow>
        <MDBCol className='column-hide'></MDBCol>
        <MDBCol className='showmoreBtn'>
          {visibleItems < items.length && (
            <Button hidden={allhidden} style={{ borderRadius: '0px' }} variant="outline-dark" onClick={showMoreItems}>
              {t('show_more')}
            </Button>
          )}
          {visibleItems < filteredProducts.length && (
            <Button hidden={filteredhidden} style={{ borderRadius: '0px' }} variant="outline-dark" onClick={showMoreItems}>
              {t('show_more')}
            </Button>
          )}
        </MDBCol>
      </MDBRow>}
</MDBRow>
 
</MDBContainer>

</section>
<Offcanvas show={showOffcanvas} onHide={handleCloseSidebar}  placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title> {t('filters')}
           </Offcanvas.Title>
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
          {t('sort')}
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
            label={t('ascending')}
            checked={sortOrder === 'asc'}
            onChange={() => handleSort('asc')}
            style={{ marginTop: 15 }}
          />
          <Form.Check
            type="checkbox"
            name="sorting"
            id="expensiveToCheap"
            label={t('decreasing')}
            checked={sortOrder === 'desc'}
            onChange={() => handleSort('desc')}
            style={{ marginTop: 15 }}
          />
        </div>
      </div>
  </div>
  {(page !== t('sale') && page !== t('instock')) && (<div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
      {t('collection')}
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
      <Form.Check
            type="checkbox"
            name="sorting"
            id="newcollection"
            label={t('new_items')}
            checked={sortCollection === 'isNew'}
            onChange={() => handleSortCollection('isNew')}
            style={{ marginTop: 15 }}
          />
            {/* <Form.Check
            type="checkbox"
            name="sorting"
            id="instockcollection"
            label={t('instock')}
            checked={sortCollection === 'isInStock'}
            // onChange={() => handleSortCollection('isInStock')}
            onChange={() => window.location.href='/instock'}
            style={{ marginTop: 15 }}
          /> */}
          <Form.Check
            type="checkbox"
            name="sorting"
            id="salecollection"
            label={t('discount_items')}
            checked={sortCollection === 'isDiscount'}
            onChange={() => handleSortCollection('isDiscount')}
            style={{ marginTop: 15 }}
          />
      </div>
    </div>
  </div>)}

  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
      {t('price')}
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

  {link!=t('accessorise')&&(
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingFive">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
      {t('season')}
      </button>
    </h2>
    <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
   
     
      <Form.Check 
            type='checkbox'
           
            checked={selectedSeasons.includes(1)}
            onChange={(e) => handleCheckboxChange(e, 'season')}
            value={1}
            label={i18n.language === 'en' ? 'Summer' : 'Літо'}
            style={{ marginTop:15}}
          />
           <Form.Check 
            type='checkbox'
         
            value={3}
            checked={selectedSeasons.includes(3)}
            onChange={(e) => handleCheckboxChange(e, 'season')}
            label={i18n.language === 'en' ? 'Spring-Autumn' : 'Весна-Осінь'}
            style={{ marginTop:15}}
          />
          <Form.Check 
            type='checkbox'
          
            value={2}
            checked={selectedSeasons.includes(2)}
            onChange={(e) => handleCheckboxChange(e, 'season')}
            label={i18n.language === 'en' ? 'Winter' : 'Зима'}
            style={{ marginTop:15}}
          />
          <Form.Check 
            type='checkbox'
           
            value={4}
            checked={selectedSeasons.includes(4)}
            onChange={(e) => handleCheckboxChange(e, 'season')}
            label={i18n.language === 'en' ? 'Winter-Demiseason' : 'Зима-Демісезон'}
            style={{ marginTop:15}}
          />
      </div>
    </div>
  </div>
  )}
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingSix">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
      {t('material')}
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
    checked={selectedMaterials.includes(x.id)}
    label={i18n.language === 'en' ? x.nameEng : x.name}
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
      {t('color')}
      </button>
    </h2>
    <div id="flush-collapseSeven" class="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
      <div className="frame-set">
      <div className={`color ${selectedColor === 'Білий' ? 'selected' : ''}`} onClick={()=>setSelectedColor('Білий')} >
        <div key="0" className="white"  />
        <div className="div132"> {i18n.language === 'en' ? 'White' : 'Білий'}</div>
      </div>
      <div  key="1" onClick={()=>setSelectedColor('Бежевий')} className={`color1 ${selectedColor === 'Бежевий' ? 'selected' : ''}`}>
        
        <div className="color-child" />
        <div className="div133">{i18n.language === 'en' ? 'Beige' : 'Бежевий'}</div>
      </div>
      <div  key="2" onClick={()=>setSelectedColor('Коричневий')}  className={`color2 ${selectedColor === 'Коричневий' ? 'selected' : ''}`}>
        <div className="color-item" />
        <div className="div134">{i18n.language === 'en' ? 'Brown' : 'Коричневий'}</div>
      </div>
      <div  key="3" onClick={()=>setSelectedColor('Чорний')}  className={`color3 ${selectedColor === 'Чорний' ? 'selected' : ''}`}>
        <div className="color-inner" />
        <div className="div135">{i18n.language === 'en' ? 'Black' : 'Чорний'}</div>
      </div>
      <div  key="4" onClick={()=>setSelectedColor('Сірий')}   className={`color4 ${selectedColor === 'Сірий' ? 'selected' : ''}`}>
        <div className="color-child1" />
        <div className="div136">{i18n.language === 'en' ? 'Gray' : 'Сірий'}</div>
      </div>
      <div  key="14"  onClick={()=>setSelectedColor('Бордовий')}   className={`color8 ${selectedColor === 'Бордовий' ? 'selected' : ''}`}>
        <div className="color-child44" />
        <div className="div140">{i18n.language === 'en' ? 'Burgundy' : 'Бордовий'}</div>
      </div>
      <div  key="5" onClick={()=>setSelectedColor('Червоний')}  className={`color5 ${selectedColor === 'Червоний' ? 'selected' : ''}`}>
        <div className="color-child2" />
        <div className="div137">{i18n.language === 'en' ? 'Red' : 'Червоний'}</div>
      </div>
      <div  key="11" onClick={()=>setSelectedColor('Помаранчевий')}  className={`color5 ${selectedColor === 'Помаранчевий' ? 'selected' : ''}`}>
        <div className="color-child11" />
        <div className="div137">{i18n.language === 'en' ? 'Orange' : 'Помаранчевий'}</div>
      </div>
      <div  key="12" onClick={()=>setSelectedColor('Жовтий')}  className={`color5 ${selectedColor === 'Жовтий' ? 'selected' : ''}`}>
        <div className="color-child12" />
        <div className="div137">{i18n.language === 'en' ? 'Yellow' : 'Жовтий'}</div>
      </div>
      <div  key="6"  onClick={()=>setSelectedColor('Рожевий')}  className={`color6 ${selectedColor === 'Рожевий' ? 'selected' : ''}`}>
        <div className="color-child3" />
        <div className="div138">{i18n.language === 'en' ? 'Pink' : 'Рожевий'}</div>
      </div>
      <div  key="7"  onClick={()=>setSelectedColor('Фіолетовий')}  className={`color7 ${selectedColor === 'Фіолетовий' ? 'selected' : ''}`}>
        <div className="color-child4" />
        <div className="div139">{i18n.language === 'en' ? 'Violet' : 'Фіолетовий'}</div>
      </div>
      <div  key="13"  onClick={()=>setSelectedColor('Блакитний')}   className={`color8 ${selectedColor === 'Блакитний' ? 'selected' : ''}`}>
        <div className="color-child55" />
        <div className="div140">{i18n.language === 'en' ? 'Light Blue' : 'Блакитний'}</div>
      </div>
      <div  key="8"  onClick={()=>setSelectedColor('Синій')}   className={`color8 ${selectedColor === 'Синій' ? 'selected' : ''}`}>
        <div className="color-child5" />
        <div className="div140">{i18n.language === 'en' ? 'Blue' : 'Синій'}</div>
      </div>
     
      <div  key="9"  onClick={()=>setSelectedColor('Зелений')}  className={`color9 ${selectedColor === 'Зелений' ? 'selected' : ''}`}>
        <div className="color-child6" />
        <div className="div141">{i18n.language === 'en' ? 'Green' : 'Зелений'}</div>
      </div>
      <div  key="10"  onClick={()=>setSelectedColor('Комбінований')}  className={`color10 ${selectedColor === 'Комбінований' ? 'selected' : ''}`}>
        <div className="color-child7" />
        <div className="div142">{i18n.language === 'en' ? 'Combined' : 'Комбінований'}</div>
      </div>
    
      </div>
    
      </div>
    </div>
  </div>

  </div>
        
  <hr className="my-4" />
                    <div className="icons-payment-systems">
                      <div onClick={applyFilters} className="div59">{t('apply')} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
<path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg> </div>
{(rangeValues[0] !== 0 || 
  rangeValues[1] !== 10000||sortOrder!=='' || selectedColor !== '' || selectedMaterials.length > 0 || selectedSeasons.length > 0 || selectedTypes.length > 0 || sortCollection !== '') && (
  <div style={{marginTop:'10px', opacity:'0.5', textDecoration:'underline'}} onClick={resetFilters} >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
    {t('reset_filters')}
  </div>
)}
                    </div>
        </Offcanvas.Body>
      </Offcanvas>
    
    </div>
  );
};

export default ContentPageSubCat;
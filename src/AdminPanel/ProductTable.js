import { useState } from "react";
import { useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { setProducts, setSizes,deleteProduct,setCategories,setMaterials,setSeasons,setSubCategories} from '../redux/actions';
import axios from 'axios';
import React from 'react';
import ProductTableItem from '../Components/ProductTableItem';
import {MDBInputGroup,MDBInput,MDBCheckbox ,  MDBTableHead,  MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Card, CardGroup, Pagination, Container} from 'react-bootstrap';
export default function ProductTable(){


  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const categories = useSelector(state => state.categories);
  const subcategories = useSelector(state => state.subcategories);
  const materials = useSelector(state => state.materials);
  const seasons = useSelector(state => state.seasons);
  const sizes = useSelector(state => state.sizes);
  const productsizes = useSelector(state => state.productsizes);

  
    const [colors,setColors] = useState([]);
    const [inputSearchTable, setInputSearchTable] = useState('');
    const [inputSearchCards, setInputSearchCards] = useState('');
    const [findProductsTable, setFindProductsTable] = useState([]);
    const [findProductsCards, setFindProductsCards] = useState([]);


    const [AddProductName,setAddProductName] = useState("");
    const [AddProductNameEng,setAddProductNameEng] = useState("");
    const [AddProductImage,setAddProductImage] = useState(null);
    const [AddProductImage2,setAddProductImage2] = useState(null);
    const [AddProductImage3,setAddProductImage3] = useState(null);
    const [AddProductVideo,setAddProductVideo] = useState(null);
    const [AddproductPrice,setAddproductPrice] = useState(0);
    const [AddproductArticle,setAddproductArticle] = useState('');
    const [addProductRow,setaddProductRow] = useState("hidden");
    const [AddProductCategory,setAddProductCategory] = useState("");
    const [AddProductSubCategory,setAddProductSubCategory] = useState("");
    const [AddProductSeason,setAddProductSeason] = useState("");
    const [AddProductMaterial,setAddProductMaterial] = useState("");
    const [AddProductSizes,setAddProductSizes] = useState("");
    const [AddProductColor,setAddProductColor] = useState("");
    const [AddIsNew,setAddAddIsNew] = useState(false);
    const [AddIsInstock,setAddAddIsInstock] = useState(false);
    const [idToDelete,setIdToDelete]=useState(0);

    const [nametoUpdate,setNameToUpdate] = useState("");
    const [nameEngtoUpdate,setNameEngToUpdate] = useState("");
  
    const [imagetoUpdate,setImageToUpdate] = useState(null);
    const [image2toUpdate,setImage2ToUpdate] = useState(null);
    const [image3toUpdate,setImage3ToUpdate] = useState(null);
    const [videotoUpdate,setVideoToUpdate] = useState(null);
    const [subCategoryUpdate,setSubCategoryUpdate] = useState("");
    const [priceUpdate,setPriceUpdate] = useState(0);
    const [salepriceUpdate,setSalePriceUpdate] = useState(0);
    const [materialUpdate,setMaterialUpdate] = useState("");
    const [articleUpdate,setArticleUpdate] = useState("");
    const [colorUpdate,setColorlUpdate] = useState("");
    const [seasonUpdate,setSeasonUpdate] = useState(true);
    const [isNewUpdate,setIsNewUpdate] = useState(true);
    const [categoryUpdate,setCategoryUpdate] = useState(0);
    const [SizesUpdate,setSizesUpdate] = useState("");
    const [prodIdUpdate,setProdIdUpdate] = useState(0);
    const [allproducts,setAllProducts] = useState([]);
    const [Video,setVideo] = useState(null);
    const [VideoURL,setVideoURL] = useState(null);
    const [contentVideo,setContentVideo] = useState(null);
    const [selectedProductIdVideo, setSelectedProductIdVideo] = useState(null);
    const [selectedProductIdImage, setSelectedProductIdImage] = useState('');
    const [showRemove, setshowRemove] = useState(false);
    const handleCloseRemove = () => setshowRemove(false);
    const handleShowRemove = () => setshowRemove(true);
   
    const [showUp, setShowUp] = useState(false);
    const handleCloseUp = () => setShowUp(false);
    const handleShowUp = () => setShowUp(true);
    
    const [showChange, setShowChange] = useState(false);
    const handleCloseChange = () => setShowChange(false);
    const handleShowChange = () => setShowChange(true);
    const [oldLookId,setOldLookId] = useState(0);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const [showChangeProdContent, setShowChangeProdContent] = useState(false);
    const handleCloseChangeProdContent = () => setShowChangeProdContent(false);
    const handleShowChangeProdContent = () => setShowChangeProdContent(true);


  const setNewLookId = (productId) => {
    setSelectedProductId(productId);
  };

    useEffect(()=>

    {
      axios.get(`${API_BASE_URL}/api/Specification/GetAllSizes`)
      .then(response => {
       
        dispatch(setSizes(response.data))
       
      })
      .catch(error => console.error('Error fetching products:', error));

      axios.get(`${API_BASE_URL}/api/Specification/GetAllColors`)
      .then(response => {
       
       setColors(response.data)
       
      })
      .catch(error => console.error('Error fetching products:', error));

      axios.get(`${API_BASE_URL}/api/Product/GetProducts`)
      .then(response => {
      
        dispatch(setProducts(response.data))
        setAllProducts(response.data);
       
        // axios.get(`${API_BASE_URL}/api/Product/GetContentVideo`, {
        //   headers: {
        //     'Accept': 'text/plain', 
        //     'Authorization': 'Bearer ' + window.sessionStorage.getItem("AccessToken")
        //   }
        // })
        // .then(res => {
       
        //   setVideoURL(res.data[0].url);
        //   setSelectedProductIdVideo(res.data[0].prodId);
          
        //   let productf = response.data.find(x => x.id === res.data[0].prodId);
        
        //   if (productf) {
           
        //     setSelectedProductIdImage(productf.image);
        //   } else {
          
        //     setSelectedProductIdImage('default_image.jpg');
        //   }
          
        //   setContentVideo(res.data[0]);
        // })
        // .catch(error => {
         
        //   console.error('Error fetching data:', error);
        // });
      })



      .catch(error => console.error('Error fetching products:', error));
  
      axios.get(`${API_BASE_URL}/api/Specification/GetAllCategory`)
      .then(response => {
      
        dispatch(setCategories(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));

      axios.get(`${API_BASE_URL}/api/Specification/GetAllMaterials`)
      .then(response => {
       
        dispatch(setMaterials(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));
      axios.get(`${API_BASE_URL}/api/Specification/GetAllSubCategories`)
      .then(response => {
       
        dispatch(setSubCategories(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));
      axios.get(`${API_BASE_URL}/api/Specification/GetAllSeasons`)
      .then(response => {
      
        dispatch(setSeasons(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));
    }, [dispatch]);


    const handleUpdateClick = (id) => {
    
     
      let prod= products.find(item=>item.id == id);
    setProdIdUpdate(id);
    setArticleUpdate(prod['article']);
    setImage3ToUpdate(prod['image3']);
        setNameToUpdate(prod['name']);
        setNameEngToUpdate(prod['nameEng']);
        setImageToUpdate(prod['image']);
        setImage2ToUpdate(prod['image2']);
        setIsNewUpdate(prod['isNew']);
        setVideoToUpdate(prod['video']);
        setSubCategoryUpdate(prod['subCategoryid']);
        setCategoryUpdate(prod['categoryid']);   
        setMaterialUpdate(prod['materialid'])
        setSeasonUpdate(prod['seasonid'])
        setSizesUpdate(prod['sizes'])
        setPriceUpdate(prod['price']);
        setColorlUpdate(prod['color']);
        setSalePriceUpdate(prod['salePrice']);
      handleShowUp();
      
    };
  


function confirmAdd()
{
  if (!AddproductArticle.includes('-')) {
    alert('Артикул має містити тире (-)');
    return;
  }
  if(AddProductCategory!=0 &&AddProductSubCategory!=0&&AddProductSeason!=0&&AddProductMaterial!=0)

        { var bodyFormData = new FormData();
          bodyFormData.append('name', AddProductName);
          bodyFormData.append('nameEng', AddProductNameEng);
          bodyFormData.append('article', AddproductArticle);
          bodyFormData.append('image', AddProductImage);
          bodyFormData.append('image2', AddProductImage2);
          bodyFormData.append('image3', AddProductImage3);
          bodyFormData.append('isNew', AddIsNew);
          bodyFormData.append('isInStock', AddIsInstock);
          bodyFormData.append('video', AddProductVideo);
          bodyFormData.append('subcategoryid', AddProductSubCategory);
          bodyFormData.append('categoryid', AddProductCategory);
          bodyFormData.append('seasonid', AddProductSeason);
          bodyFormData.append('materialid', AddProductMaterial);
          bodyFormData.append('price', AddproductPrice);
          bodyFormData.append('salePrice', AddproductPrice);
          bodyFormData.append('sizes', AddProductSizes);
          bodyFormData.append('color', AddProductColor);
          bodyFormData.append('isDiscount', false); 
          
          
          axios (

            {
            method:'post',
           url:`${API_BASE_URL}/api/Product/Add`,
            data:bodyFormData
            ,headers: {
              'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
                    'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
            },
          
            }



        ).then  (response=>
        {
          alert("Товар додано успішно!")
        
          window.location.reload();
          
        });  
      }
      else alert("Оберіть!")      
}
 function showTable(id)
 {

  //  let Copy = [...findproducts];

  //  for (const iterator of allproducts) 
  //  {
  //  let name=iterator['categoryId'];
   
  //    if(name==id)
  //    {
        
  //      Copy.push(iterator);
       
  //    }
  //  }
  //  setProducts(Copy);
 
  
   
 }

function ConfirmDelete()
{
  var bodyFormData = new FormData();
  bodyFormData.append('id', idToDelete);
              axios (

                {
                method:'post',
                url:`${API_BASE_URL}/api/Product/Delete`,
                 data:bodyFormData
                ,headers: {
                  'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
                        'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                },
               
                }



            ).then  (res=>
            {
              alert("Продукт успішно видалений")
              
                dispatch(deleteProduct(idToDelete));
                handleCloseRemove();
                window.location.reload();
            });  


}

function deletecategory(id)
{
  var bodyFormData = new FormData();
  bodyFormData.append('id', id);
              axios (

                {
                method:'post',
                url:`${API_BASE_URL}/api/Category/Delete`,
                data:bodyFormData,
                headers: {
                  'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
                        'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                },
               
                }



            ).then  (res=>
            {
              
                alert(res.data['value']);
               
               
            });  

}
const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (file && file.type === 'image/webp' && file.size <= 300 * 1024) {
    setAddProductImage(file);
    alert('Файл додано!');
  } else {
    alert('Файл должен быть формата webp и не больше 300 КБ');
  }
};

const handleFileChange2 = (event) => {
  const file = event.target.files[0];

  if (file && file.type === 'image/webp' && file.size <= 300 * 1024) {
    setAddProductImage2(file);
    alert('Файл додано!');
  } else {
    alert('Файл должен быть формата webp и не больше 300 КБ');
  }
};

const handleFileChange3 = (event) => {
  const file = event.target.files[0];

  if (file && file.type === 'image/webp' && file.size <= 300 * 1024) {
    setAddProductImage3(file);
    alert('Файл додано!');
  } else {
    alert('Файл должен быть формата webp и не больше 300 КБ');
  }
};

const handleFileChangeVideo = (event) => {
  const file = event.target.files[0];
  if (file && file.type === 'video/mp4' && file.size <= 3 * 1024 * 1024) {
    setAddProductVideo(event.target.files[0]);
    alert('Файл додано!');
  } else {
    alert('Файл должен быть не больше 3 MB');
  }
};

const confirmUpdate = () => {
  if (!articleUpdate.includes('-')) {
    alert('Артикул має містити тире (-)');
    return;
  }
  if(categoryUpdate!=0 &&subCategoryUpdate!=0&&seasonUpdate!=0&&materialUpdate!=0)

  { var bodyFormData = new FormData();
    bodyFormData.append('id', prodIdUpdate);
    bodyFormData.append('article', articleUpdate);
    bodyFormData.append('name', nametoUpdate);
    bodyFormData.append('nameEng', nameEngtoUpdate);
    // bodyFormData.append('image3', image3toUpdate);
    // bodyFormData.append('image', imagetoUpdate);
    // bodyFormData.append('image2', image2toUpdate);
    // bodyFormData.append('video', videotoUpdate);
    bodyFormData.append('isnew', isNewUpdate);
    bodyFormData.append('subcategoryid', subCategoryUpdate);
    bodyFormData.append('categoryid', categoryUpdate);
    bodyFormData.append('seasonid', seasonUpdate);
    bodyFormData.append('materialid', materialUpdate);
    bodyFormData.append('price', priceUpdate);
    bodyFormData.append('saleprice', salepriceUpdate);
    bodyFormData.append('sizes', SizesUpdate);
    bodyFormData.append('color', colorUpdate);
  
    if(salepriceUpdate<priceUpdate)
    {
      bodyFormData.append('isDiscount', true);
    }
    else 
    {
      bodyFormData.append('isDiscount', false);
    }
           
    
    
    
    axios (

      {
      method:'post',
      url:`${API_BASE_URL}/api/Product/Update`,
      data:bodyFormData
      ,headers: {
        'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
              'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
      },
    
      }



  ).then  (response=>
  {
    alert("Товар оновлено успішно!")

    window.location.reload();
    
  });  
}
else alert("Оберіть !")   

}

useEffect(() => {
  setFindProductsTable(
    allproducts.filter((product) =>
      product.article.toLowerCase().includes(inputSearchTable.toLowerCase())
    )
  );
}, [inputSearchTable, allproducts]);

useEffect(() => {
  setFindProductsCards(
    allproducts.filter((product) =>
      product.article.toLowerCase().includes(inputSearchCards.toLowerCase())
    )
  );
}, [inputSearchCards, allproducts]);

function btnChange(id)
{
setOldLookId(id);
 handleShowChange();
}


function changeLook()
{ 
 var bodyFormData = new FormData();
  bodyFormData.append('oldId', oldLookId);
  bodyFormData.append('newId', selectedProductId);

              axios (

                {
                method:'post',
                url:`${API_BASE_URL}/api/Product/WeeklyLook`,
                data:bodyFormData,
                headers: {
                  'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
                        'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                },
               
                }



            ).then  (res=>
            {
              
                window.location.reload();
               
               
            });  


 setSelectedProductId(null);
 handleCloseChange();

}
function changeVideoContent()
{ 
 var bodyFormData = new FormData();
 bodyFormData.append('id', 1);
  bodyFormData.append('video', Video);

              axios (

                {
                method:'post',
                url:`${API_BASE_URL}/api/Product/UpdateVideoContent`,
                data:bodyFormData,
                headers: {
                  'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
                        'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                },
               
                }



            ).then  (res=>
            {
              
                window.location.reload();
               
               
            });  


 setSelectedProductIdVideo(null);
 handleCloseChange();

}
function changeProductVideoContent()
{ 
 var bodyFormData = new FormData();
 bodyFormData.append('id', contentVideo.id);
  bodyFormData.append('prodId', selectedProductIdVideo);

              axios (

                {
                method:'post',
                url:`${API_BASE_URL}/api/Product/UpdateProductContent`,
                data:bodyFormData,
                headers: {
                  'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
                        'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                },
               
                }



            ).then  (res=>
            {
              
                window.location.reload();
               
               
            });  


 setSelectedProductIdVideo(null);
 handleCloseChange();

}
const [currentPage, setCurrentPage] = useState(0);
const pageSize = 20;
const filteredProducts = findProductsTable.filter(product =>
  product.article.toLowerCase().includes(inputSearchTable.toLowerCase())
);


const totalPages = Math.ceil(filteredProducts.length / pageSize);

const displayedProducts = filteredProducts.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
);


const handlePageChange = (page) => {
  if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
  }
};

const startPage = Math.max(0, currentPage - 2);
const endPage = Math.min(totalPages - 1, startPage + 4);
    return(

        <div>
{/* <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showChangeProdContent}
      onHide={handleCloseChangeProdContent}
    >
      <Modal.Header closeButton>
        <Modal.Title>Оберіть товар для заміни </Modal.Title>
        <Form  className="d-flex small " style={{marginLeft:'20px'}} >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>setInputSearch(e.target.value)}
            />
            <Button onClick={getSearch} variant="outline-success">Search</Button>
          </Form>
      </Modal.Header>
      <Modal.Body>
        <Container style={{ display: 'flex', flexWrap: 'wrap' }}>
        {allproducts.map((product) => (
    <Card
    onClick={() => setSelectedProductIdVideo(product.id)} 
      key={product.id}
      style={{
        width: '12rem',
        margin: '10px',
        alignItems: 'center',
        backgroundColor: selectedProductIdVideo === product.id ? 'lightblue' : 'white',
      }}
    >
      <Card.Img variant="center" style={{ width: 100 }} src={product.image} />
     
    </Card>
  ))}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseChangeProdContent}>
          Відміна
        </Button>
        <Button variant="dark" onClick={()=>changeProductVideoContent()}>
          Підтвердити
        </Button>
      </Modal.Footer>
    </Modal> */}
<Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showChange}
      onHide={handleCloseChange}
    >
      <Modal.Header closeButton>
        <Modal.Title>Оберіть товар для заміни </Modal.Title>
        <Form  className="d-flex small " style={{marginLeft:'20px'}} >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={inputSearchCards}
              onChange={(e) => setInputSearchCards(e.target.value)}
            />
            
          </Form>
      </Modal.Header>
      <Modal.Body>
        <Container style={{ display: 'flex', flexWrap: 'wrap' }}>
        {findProductsCards
  .filter((x) => x.categoryid === allproducts.find((x) => x.id === oldLookId)?.categoryid)
  .map((product) => (
    <Card
    onClick={() => setNewLookId(product.id)} 
      key={product.id}
      style={{
        width: '12rem',
        margin: '10px',
        alignItems: 'center',
        backgroundColor: selectedProductId === product.id ? 'lightblue' : 'white',
      }}
    >
      <Card.Img variant="center" style={{ width: 100 }} src={product.image} />
     <Card.Text>{product.article}</Card.Text>
    </Card>
  ))}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseChange}>
          Відміна
        </Button>
        <Button variant="dark" onClick={changeLook}>
          Підтвердити
        </Button>
      </Modal.Footer>
    </Modal>

<Modal show={showRemove} onHide={handleCloseRemove}>
        <Modal.Header closeButton>
          <Modal.Title>Видалити продукт</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ви впевнені, що хочете видалити ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRemove}>
            Відмінити
          </Button>
          <Button variant="dark" onClick={ConfirmDelete}>
            Так
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showUp}
        onHide={handleCloseUp}
        backdrop="static"
        keyboard={false}
        style={{ maxWidth: '100%', margin: '0 auto' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update product</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto',overflowX:'hidden' }}>
     
        <MDBInputGroup className='mb-3'  textBefore='Назва'>
      <input onChange={(e)=>setNameToUpdate(e.target.value)} value={nametoUpdate} className='form-control' type='text' />
    </MDBInputGroup>
    <MDBInputGroup className='mb-3'  textBefore='Name'>
      <input onChange={(e)=>setNameEngToUpdate(e.target.value)} value={nameEngtoUpdate} className='form-control' type='text' />
    </MDBInputGroup>
    <MDBInputGroup className='mb-3'  textBefore='Арт:'>
      <input onChange={(e)=>setArticleUpdate(e.target.value)} value={articleUpdate} className='form-control' type='text' />
    </MDBInputGroup>
   
      <MDBInputGroup className='mb-3' textBefore='Категорія'>
      <div  className="mb-6 pb-2">
        <select   className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setCategoryUpdate(e.target.value)} value={categoryUpdate}>
       
              {
              categories.map((x) => 
                <option  value={x.id}>
                {x.name}
                </option>
             )}
          
        </select>
        </div>
      </MDBInputGroup>
     
   
      <MDBInputGroup className='mb-3'  textBefore='Тип'>
      <div className="mb-6 pb-2">
                <select   className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setSubCategoryUpdate(e.target.value)} value={subCategoryUpdate}>
               
                      {
                      subcategories.map((x) => 
                        <option  value={x.id}>
                        {x.name}
                        </option>
                     )}
                  
                </select>
                </div>
      </MDBInputGroup >
      <MDBInputGroup className='mb-3'  textBefore='Матеріал'>
      <div className="mb-6 pb-2">
                <select  className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setMaterialUpdate(e.target.value)} value={materialUpdate}>
            
                      {
                      materials.map((x) => 
                        <option  value={x.id}>
                        {x.name}
                        </option>
                     )}
                  
                </select>
                </div>
      </MDBInputGroup>
      <MDBInputGroup className='mb-3'  textBefore='Сезонність'>
      <div className="mb-6 pb-2">
                <select   className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setSeasonUpdate(e.target.value)} value={seasonUpdate}>
               
                      {
                      seasons.map((x) => 
                        <option  value={x.id}>
                        {x.name}
                        </option>
                     )}
                  
                </select>
                </div>
      </MDBInputGroup>
      <MDBInputGroup className='mb-3'  textBefore='Розмір' >
      <div className="mb-6 pb-2">
                <select   className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setSizesUpdate((e.target.value))} value={SizesUpdate}>
               
                      {
                      sizes.map((x) => 
                        <option  value={x.id}>
                        {x.value}
                        </option>
                     )}
                  
                </select>
                </div>
      </MDBInputGroup>
       
    

        <MDBInputGroup className='mb-3'  textBefore='Ціна товару'>
      <input  onChange={(e)=>setPriceUpdate(e.target.value)} value={priceUpdate} className='form-control' type='number' onkeyup="this.value  = this.value.replace(/[^0-9]/gi, '')" />
      </MDBInputGroup>
      <MDBInputGroup className='mb-3'  textBefore='Ціна на сайті'>
      <input  onChange={(e)=>setSalePriceUpdate(e.target.value)} value={salepriceUpdate} className='form-control' type='number' onkeyup="this.value  = this.value.replace(/[^0-9]/gi, '')" />
      </MDBInputGroup>
      <MDBInputGroup className='mb-3'  textBefore='Колір' >
      <div className="mb-6 pb-2">
                <select   className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setColorlUpdate((e.target.value))} value={colorUpdate}>
               
                      {
                      colors.map((x) => 
                        <option  value={x.name}>
                        {x.name}
                        </option>
                     )}
                  
                </select>
                </div>
      </MDBInputGroup>
       
      <MDBInputGroup className='mb-3'  textBefore='Новинка'>
      <MDBCheckbox  label='NEW' checked={isNewUpdate} onChange={(e)=>setIsNewUpdate(e.target.checked)} />
      </MDBInputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUp}>
            Закрити
          </Button>
          <Button variant="dark" onClick={confirmUpdate}>Підтвердити</Button>
        </Modal.Footer>
      </Modal>




      <h1 className='text-center'>CONTENT</h1>

      
      
      
      <MDBRow className='justify-content-center text-center' style={{marginTop:'50px'}}>
        {/* video
  <MDBCol>
    <Card  style={{width:'400px'}}>
    <video  controls preload="auto">
    <source src='https://hdbrandblob.blob.core.windows.net/storage/videoContent.MP4' type="video/mp4" />
      Your browser does not support the video tag.
    </video>
      <input onChange={(e)=>{if(e.target.files[0].type === 'video/mp4'){setVideo(e.target.files[0]);alert("Файл обрано!")}else alert('Not correct format mp4')}} className='form-control' type='file' />
      <Button style={{marginTop:'15px'}} onClick={changeVideoContent} variant="dark">Confirm</Button>
    </Card>
  </MDBCol> */}
  {/* <MDBCol>
  <Card style={{width:'300px',height:'280px'}}>
      <img src={selectedProductIdImage} style={{height:'335px'}}></img>
      <Button onClick={handleShowChangeProdContent} variant="dark">CHANGE</Button>
    </Card>
  </MDBCol> */}
</MDBRow>
     


      <h1 style={{textAlign:'center',alignItems:'center'}} >WEEKLY LOOK</h1>
     
   <div style={{ display: 'flex', justifyContent:'space-around', alignItems:'center' }}>
    
    {
      allproducts.filter((x) => x.weeklyLook === true).map((product) => (
        <Card  style={{border:'none' }}  className="text-center d-flex align-items-center" key={product.id}> 
          <Card.Img  className="img-fluid"  style={ {height:'300px', aspectRatio:'3/4',position:'relative',objectFit:'cover'}}  variant="center" src={product.image}></Card.Img>
        <Button style={{marginTop:'15px'}} onClick={()=>btnChange(product.id)} variant="dark">CHANGE</Button>
        </Card>
      ))
    }
   </div>
    <h1 style={{textAlign:'center',alignItems:'center'}} >PRODUCT TABLE</h1>
    <Button   variant='dark'  onClick={(()=>setaddProductRow(""))}>
                           + Додати новий 
                        </Button>
                        <Form className="search-table">
        <Form.Group controlId="searchInput">
        
          <Form.Control
            type="text"
            placeholder="Пошук за артикулом:"
            value={inputSearchTable}
            onChange={(e) => setInputSearchTable(e.target.value)}
          />
        </Form.Group>
      </Form>

         
    <Table striped hover>
    <MDBTableHead dark>
        <tr>
          <th># Art.</th>
          <th>Назва</th>
          <th>Name</th>
          <th>Контент</th>
         
          <th>NEW</th>
          <th>Категорія</th>
          <th>Тип виробу</th>
          <th>Матеріал</th>
          <th>Сезон</th>
          <th>Розміри</th>
          <th>Ціна</th>
          <th>На сайті</th>
          <th>Колір</th>
          <th>Сток</th>
          <th>Функції</th>
          <th></th>

        </tr>
        </MDBTableHead>
      <tbody>
      <tr hidden={addProductRow} >
                 <th  scope='row' ><MDBInput onChange={((e)=>setAddproductArticle(e.target.value))} type='text'/></th>
          
               
            <td > <MDBInput onChange={((e)=>setAddProductName(e.target.value))} type='text'/></td>
            <td > <MDBInput onChange={((e)=>setAddProductNameEng(e.target.value))} type='text'/></td>
            <td > <MDBInput size='sm'  onChange={(e) => handleFileChange(e, {AddProductName})} type='file'/> 
            <p>Фото1</p> <MDBInput size='sm'   onChange={(e) => handleFileChange2(e, {AddProductName})} type='file'/> 
            <p>Фото2</p> 
            <MDBInput size='sm'   onChange={(e) => handleFileChange3(e, {AddProductName})} type='file'/> <p>Фото3</p> 
         
            <MDBInput size='sm'   onChange={(e) => handleFileChangeVideo(e, {AddProductName})} type='file'/>    <p>Відео</p></td>
 <td>   <MDBCheckbox  label='NEW' onChange={(e)=>setAddAddIsNew(e.target.checked)} /></td>
            <td > <MDBInputGroup className='mb-3' >
      <div className="mb-6 pb-2">
                <select className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setAddProductCategory(e.target.value)}>
                <option selected value="0">Обрати</option>
                      {
                      categories.map((x) => 
                        <option  value={x.id}>
                        {x.name}
                        </option>
                     )}
                  
                </select>
                </div>
                </MDBInputGroup>
           </td>
            <td > <MDBInputGroup className='mb-3' >
      <div className="mb-6 pb-2">
                <select className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setAddProductSubCategory(e.target.value)}>
                <option selected value="0">Обрати</option>
                      {
                      subcategories.map((x) => 
                        <option  value={x.id}>
                        {x.name}
                        </option>
                     )}
                  
                </select>
                </div>
                </MDBInputGroup>
           </td>
     
           <td > <MDBInputGroup className='mb-3' >
      <div className="mb-6 pb-2">
                <select className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setAddProductMaterial(e.target.value)}>
                <option selected value="0">Обрати</option>
                      {
                      materials.map((x) => 
                        <option  value={x.id}>
                        {x.name}
                        </option>
                     )}
                  
                </select>
                </div>
                </MDBInputGroup>
           </td>
            
           <td > <MDBInputGroup className='mb-3' >
      <div className="mb-6 pb-2">
                <select className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setAddProductSeason(e.target.value)}>
                <option selected value="0">Обрати</option>
                      {
                      seasons.map((x) => 
                        <option  value={x.id}>
                        {x.name}
                        </option>
                     )}
                  
                </select>
                </div>
                </MDBInputGroup>
           </td>
           <td > <MDBInputGroup className='mb-3' >
      <div className="mb-6 pb-2">
                <select className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setAddProductSizes(e.target.value)}>
                <option selected value="0">Обрати</option>
                      {
                      sizes.map((x) => 
                        <option  value={x.id}>
                        {x.value}
                        </option>
                     )}
                  
                </select>
                </div>
                </MDBInputGroup>
           </td>
           <td > <MDBInput onChange={((e)=>setAddproductPrice(e.target.value))} type='number' min='0' onkeyup="this.value  = this.value.replace(/[^0-9]/gi, '');"/> </td>
        
<td > {AddproductPrice} </td>
<td > <MDBInputGroup className='mb-3' >
      <div className="mb-6 pb-2">
                <select className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setAddProductColor(e.target.value)}>
                <option selected value="0">Обрати</option>
                      {
                      colors.map((x) => 
                        <option  value={x.name}>
                        {x.name}
                        </option>
                     )}
                  
                </select>
                </div>
                </MDBInputGroup>
           </td>
           <td>  <MDBCheckbox 
  label='Наявність' 
  onChange={(e) => {
   
    setAddAddIsInstock(e.target.checked);
  }} 
/></td>
<td><Button   onClick={confirmAdd}  variant='dark'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
</svg></Button></td>
<td></td>
      </tr>
      {
        displayedProducts.map((x, index)=> <tr  >
                
        <th scope='row'>{x.id} {x.article}</th>
      
        <td > 
        {x.name}
    </td>
    <td > 
        {x.nameEng}
    </td>
    <td > 
      {x.image && ( <img style={{margin:'2px'}} src={x.image} width={50} height={50} alt="Товар" />)}
   
      {x.image2 && ( <img style={{margin:'2px'}} src={x.image2} width={50} height={50} alt="Товар" />)}
     

      {x.image3 && ( <img style={{margin:'2px'}} src={x.image3} width={50} height={50} alt="Товар" />)}
    
      <input value={x.video} className='form-control' type='text' />
           
    </td>
    {/* <td > 
           <MDBInputGroup  className='mb-3'  >
      <input value={x.video} className='form-control' type='text' />
    </MDBInputGroup>
    </td> */}
    <td>   <MDBCheckbox checked={x.isNew} /></td>
    <td >

<MDBInputGroup className='mb-3' >
<div  className="mb-6 pb-2">
        <select   className="select p-2 rounded bg-grey" style={{ width: "100%" }}  value={x.categoryid}>
       
              {
              categories.map((x) => 
                <option  value={x.id}>
                {x.name}
                </option>
             )}
          
        </select>
        </div>
</MDBInputGroup>

</td>
        <td >
          
        <MDBInputGroup className='mb-3' >
      <div className="mb-6 pb-2">
                <select   className="select p-2 rounded bg-grey" style={{ width: "100%" }}  value={x.subCategoryid}>
               
                      {
                      subcategories.map((x) => 
                        <option  value={x.id}>
                        {x.name}
                        </option>
                     )}
                  
                </select>
                </div>
      </MDBInputGroup>
          
          </td>
     
        <td >
        <MDBInputGroup className='mb-3' >
      <div className="mb-6 pb-2">
                <select  className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setMaterialUpdate(e.target.value)} value={x.materialid}>
            
                      {
                      materials.map((x) => 
                        <option  value={x.id}>
                        {x.name}
                        </option>
                     )}
                  
                </select>
                </div>
      </MDBInputGroup>

        </td>
        <td >

        <MDBInputGroup className='mb-3' >
      <div className="mb-6 pb-2">
                <select   className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setSeasonUpdate(e.target.value)} value={x.seasonid}>
               
                      {
                      seasons.map((x) => 
                        <option  value={x.id}>
                        {x.name}
                        </option>
                     )}
                  
                </select>
                </div>
      </MDBInputGroup>
        </td>

        <td >

        <MDBInputGroup className='mb-3' >
      <div className="mb-6 pb-2">
                <select   className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setSizesUpdate(e.target.value)} value={x.sizes}>
               
                      {
                      sizes.map((x) => 
                        <option  value={x.id}>
                        {x.value}
                        </option>
                     )}
                  
                </select>
                </div>
      </MDBInputGroup>
        </td>
        <td  >

        <MDBInputGroup className='mb-3' >
      <input  onChange={(e)=>setPriceUpdate(e.target.value)} value={x.price} className='form-control' type='number' onkeyup="this.value  = this.value.replace(/[^0-9]/gi, '')" />
      </MDBInputGroup>
        </td>
        <td  >

<MDBInputGroup className='mb-3' >
<input  onChange={(e)=>setSalePriceUpdate(e.target.value)} value={x.salePrice} className='form-control' type='number' onkeyup="this.value  = this.value.replace(/[^0-9]/gi, '')" />
</MDBInputGroup>
</td>
    
        
<td >
        <MDBInputGroup className='mb-3' >
      <div className="mb-6 pb-2">
                <select  className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setColorlUpdate(e.target.value)} value={x.color}>
            
                      {
                      colors.map((x) => 
                        <option  value={x.name}>
                        {x.name}
                        </option>
                     )}
                  
                </select>
                </div>
      </MDBInputGroup>

        </td>
        <td>   <MDBCheckbox checked={x.isInStock} /></td>
        <td>
          
         <Button variant="dark" onClick={()=>{handleUpdateClick(x.id)}}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/>
  <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
</svg> </Button>
         </td>
       
        <td >
        <Button variant="dark" onClick={()=>{setIdToDelete(x.id);handleShowRemove();}}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg> </Button>
         </td>
        
        

      </tr>)
      
      
      }
      </tbody>
    </Table>
  
    <Pagination className="justify-content-center" size="sm">
                <Pagination.First onClick={() => handlePageChange(0)} disabled={currentPage === 0} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} />

                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                    <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => handlePageChange(page)}
                    >
                        {page + 1}
                    </Pagination.Item>
                ))}

                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1} />
                <Pagination.Last onClick={() => handlePageChange(totalPages - 1)} disabled={currentPage === totalPages - 1} />
            </Pagination>

        </div>
    );
}
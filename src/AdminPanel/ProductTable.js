import { useState } from "react";
import { useEffect } from "react";
import { connect,useDispatch,useSelector } from 'react-redux';
import { setProducts, setUsers, addProduct, deleteUser,setSizes,setProductSizes,deleteProduct,setCategories,editProduct,setMaterials,setSeasons,setSubCategories, addSubCategory } from '../redux/actions';
import axios from 'axios';
import React from 'react';
import ProductTableItem from '../Components/ProductTableItem';
import {MDBBtn,MDBInputGroup,MDBInput,MDBCheckbox , MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBCard } from 'mdb-react-ui-kit';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Card, CardGroup, CardImg, Container} from 'react-bootstrap';
export default function ProductTable(){



  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const categories = useSelector(state => state.categories);
  const subcategories = useSelector(state => state.subcategories);
  const materials = useSelector(state => state.materials);
  const seasons = useSelector(state => state.seasons);
  const sizes = useSelector(state => state.sizes);
  const productsizes = useSelector(state => state.productsizes);

  
    const [inputSearch, setInputSearch] = useState('');
    const [findproducts,setFindProducts] = useState([]);
    const [colors,setColors] = useState([]);
   
    const [AddProductName,setAddProductName] = useState("");
    const [AddProductImage,setAddProductImage] = useState(null);
    const [AddProductImage2,setAddProductImage2] = useState(null);
    const [AddProductImage3,setAddProductImage3] = useState(null);
    const [AddProductVideo,setAddProductVideo] = useState(null);
    const [AddproductPrice,setAddproductPrice] = useState(0);
    const [AddproductSalePrice,setAddproductSalePrice] = useState(0);
    const [addProductRow,setaddProductRow] = useState("hidden");
    const [AddProductCategory,setAddProductCategory] = useState("");
    const [AddProductSubCategory,setAddProductSubCategory] = useState("");
    const [AddProductSeason,setAddProductSeason] = useState("");
    const [AddProductMaterial,setAddProductMaterial] = useState("");
    const [AddProductSizes,setAddProductSizes] = useState("");
    const [AddProductColor,setAddProductColor] = useState("");
    const [AddIsNew,setAddAddIsNew] = useState(true);
    const [idToDelete,setIdToDelete]=useState(0);

    const [nametoUpdate,setNameToUpdate] = useState("");
  
    const [imagetoUpdate,setImageToUpdate] = useState(null);
    const [image2toUpdate,setImage2ToUpdate] = useState(null);
    const [image3toUpdate,setImage3ToUpdate] = useState(null);
    const [videotoUpdate,setVideoToUpdate] = useState(null);
    const [subCategoryUpdate,setSubCategoryUpdate] = useState("");
    const [priceUpdate,setPriceUpdate] = useState(0);
    const [salepriceUpdate,setSalePriceUpdate] = useState(0);
    const [materialUpdate,setMaterialUpdate] = useState("");
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
    
   

      axios.get('https://localhost:7269/api/Specification/GetAllSizes')
      .then(response => {
       
        dispatch(setSizes(response.data))
       
      })
      .catch(error => console.error('Error fetching products:', error));

      axios.get('https://localhost:7269/api/Specification/GetAllColors')
      .then(response => {
       
       setColors(response.data)
       
      })
      .catch(error => console.error('Error fetching products:', error));

      axios.get('https://localhost:7269/api/Product/GetProducts')
      .then(response => {
        console.log(response.data)
        dispatch(setProducts(response.data))
        setAllProducts(response.data);
        
        axios.get('https://localhost:7269/api/Product/GetContentVideo', {
          headers: {
            'Accept': 'text/plain', 
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("AccessToken")
          }
        })
        .then(res => {
       
          setVideoURL(changeImg(res.data[0].url));
          setSelectedProductIdVideo(res.data[0].prodId);
          
         
          let productf = response.data.find(x => x.id === res.data[0].prodId);
        
          if (productf) {
           
            setSelectedProductIdImage(changeImg(productf.image));
          } else {
          
            setSelectedProductIdImage('default_image.jpg');
          }
          
          setContentVideo(res.data[0]);
        })
        .catch(error => {
         
          console.error('Error fetching data:', error);
        });
      })
      .catch(error => console.error('Error fetching products:', error));
  
      axios.get('https://localhost:7269/api/Specification/GetAllCategory')
      .then(response => {
      
        dispatch(setCategories(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));

      axios.get('https://localhost:7269/api/Specification/GetAllMaterials')
      .then(response => {
       
        dispatch(setMaterials(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));
      axios.get('https://localhost:7269/api/Specification/GetAllSubCategories')
      .then(response => {
       
        dispatch(setSubCategories(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));
      axios.get('https://localhost:7269/api/Specification/GetAllSeasons')
      .then(response => {
      
        dispatch(setSeasons(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));
    }, [dispatch]);


    const handleUpdateClick = (id) => {
    
     
      let prod= products.find(item=>item.id == id);
    setProdIdUpdate(id);
    setImage3ToUpdate(prod['image3']);
        setNameToUpdate(prod['name']);
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
  if(AddProductCategory!=0 &&AddProductSubCategory!=0&&AddProductSeason!=0&&AddProductMaterial!=0)

        { var bodyFormData = new FormData();
          bodyFormData.append('name', AddProductName);
         
          bodyFormData.append('image', AddProductImage);
          bodyFormData.append('image2', AddProductImage2);
          bodyFormData.append('image3', AddProductImage3);
          bodyFormData.append('isNew', AddIsNew);
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
            url:'https://localhost:7269/api/Product/Add',
            data:bodyFormData
            ,headers: {
              'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
                    'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
            },
          
            }



        ).then  (response=>
        {
          alert("Product  added successfull!")
        
          window.location.reload();
          
        });  
      }
      else alert("You need to choose !")      
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
                url:'https://localhost:7269/api/Product/Delete',
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
                url:'https://localhost:7211/api/Category/Delete',
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
  setAddProductImage(event.target.files[0]);
  console.log(event.target.files[0]);
};
const handleFileChange2 = (event) => {
  setAddProductImage2(event.target.files[0]);
  console.log(event.target.files[0]);
};
const handleFileChange3 = (event) => {
  setAddProductImage3(event.target.files[0]);
  console.log(event.target.files[0]);
};
const handleFileChangeVideo = (event) => {
  setAddProductVideo(event.target.files[0]);
  console.log(event.target.files[0]);
};

const confirmUpdate = () => {

  if(categoryUpdate!=0 &&subCategoryUpdate!=0&&seasonUpdate!=0&&materialUpdate!=0)

  { var bodyFormData = new FormData();
    bodyFormData.append('id', prodIdUpdate);
    bodyFormData.append('name', nametoUpdate);
    bodyFormData.append('image3', image3toUpdate);
    bodyFormData.append('image', imagetoUpdate);
    bodyFormData.append('image2', image2toUpdate);
    bodyFormData.append('isnew', isNewUpdate);
    bodyFormData.append('video', videotoUpdate);
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
      url:'https://localhost:7269/api/Product/Update',
      data:bodyFormData
      ,headers: {
        'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
              'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
      },
    
      }



  ).then  (response=>
  {
    alert("Product  updated successfull!")

    window.location.reload();
    
  });  
}
else alert("You need to choose !")   

}

 function getSearch()
      {
        let Copy = [...findproducts];

        for (const iterator of allproducts) {
          let name = iterator['name'].toLowerCase();
          if (name.includes(inputSearch.toLowerCase())) {
            Copy.push(iterator);
          }
        }
        
        if (inputSearch !== "") {
          setAllProducts([...Copy]); 
        } else {
          setAllProducts([...products]); 
        }

      }

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
                url:'https://localhost:7269/api/Product/WeeklyLook',
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
 bodyFormData.append('id', contentVideo.id);
  bodyFormData.append('video', Video);

              axios (

                {
                method:'post',
                url:`https://localhost:7269/api/Product/UpdateVideoContent`,
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
                url:`https://localhost:7269/api/Product/UpdateProductContent`,
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
function changeImg(path) {
  if(path)
 { let lastIndex = path.lastIndexOf('/');
  let fileName = path.substring(lastIndex + 1); 
  return require(`../assets/${fileName}`);
}
}
    return(

        <div>
<Modal
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
      <Card.Img variant="center" style={{ width: 100 }} src={changeImg(product.image)} />
     
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
    </Modal>
<Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showChange}
      onHide={handleCloseChange}
    >
      <Modal.Header closeButton>
        <Modal.Title>Оберіть товар для заміни </Modal.Title>
        
      </Modal.Header>
      <Modal.Body>
        <Container style={{ display: 'flex', flexWrap: 'wrap' }}>
        {allproducts
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
      <Card.Img variant="center" style={{ width: 100 }} src={changeImg(product.image)} />
     
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
      >
        <Modal.Header closeButton>
          <Modal.Title>Update product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
     
        <MDBInputGroup className='mb-3'  textBefore='Name'>
      <input onChange={(e)=>setNameToUpdate(e.target.value)} value={nametoUpdate} className='form-control' type='text' />
    </MDBInputGroup>
    <MDBInputGroup className='mb-3' textBefore='Image URL'>
    <input  onChange={(e)=>setImageToUpdate(e.target.files[0])}  className='form-control' type='file' />
      </MDBInputGroup>
      <MDBInputGroup className='mb-3' textBefore='Image URL 2'>
    <input  onChange={(e)=>setImage2ToUpdate(e.target.files[0])}  className='form-control' type='file' />
      </MDBInputGroup>
      <MDBInputGroup className='mb-3' textBefore='Image URL 2'>
    <input  onChange={(e)=>setImage3ToUpdate(e.target.files[0])}  className='form-control' type='file' />
      </MDBInputGroup>
      <MDBInputGroup className='mb-3' textBefore='Video URL'>
      <input  onChange={(e)=>setVideoToUpdate(e.target.files[0])}  className='form-control' type='file' />
      </MDBInputGroup>
      <MDBInputGroup className='mb-3' textBefore='Category'>
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
     
   
      <MDBInputGroup className='mb-3'  textBefore='Sub Category'>
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
      <MDBInputGroup className='mb-3'  textBefore='Material'>
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
      <MDBInputGroup className='mb-3'  textBefore='Season'>
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
      <MDBInputGroup className='mb-3'  textBefore='Sizes' >
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
       
    

        <MDBInputGroup className='mb-3'  textBefore='Price'>
      <input  onChange={(e)=>setPriceUpdate(e.target.value)} value={priceUpdate} className='form-control' type='number' onkeyup="this.value  = this.value.replace(/[^0-9]/gi, '')" />
      </MDBInputGroup>
      <MDBInputGroup className='mb-3'  textBefore='Sale Price'>
      <input  onChange={(e)=>setSalePriceUpdate(e.target.value)} value={salepriceUpdate} className='form-control' type='number' onkeyup="this.value  = this.value.replace(/[^0-9]/gi, '')" />
      </MDBInputGroup>
      <MDBInputGroup className='mb-3'  textBefore='Colors' >
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
       
      <MDBInputGroup className='mb-3'  textBefore='New Product'>
      <MDBCheckbox  label='NEW' checked={isNewUpdate} onChange={(e)=>setIsNewUpdate(e.target.checked)} />
      </MDBInputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUp}>
            Close
          </Button>
          <Button variant="dark" onClick={confirmUpdate}>Confirm</Button>
        </Modal.Footer>
      </Modal>




      <h1 className='text-center'>CONTENT</h1>

      
      
      
      <MDBRow className='justify-content-center text-center' style={{margin:'50px'}}>
  <MDBCol>
    <Card style={{width:'500px'}}>
    <video  controls >
      <source src={VideoURL} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
      <input onChange={(e)=>setVideo(e.target.files[0])} className='form-control' type='file' />
      <Button style={{marginTop:'15px'}} onClick={changeVideoContent} variant="dark">Confirm</Button>
    </Card>
  </MDBCol>
  <MDBCol>
  <Card style={{width:'300px',height:'280px'}}>
      <img src={selectedProductIdImage} style={{height:'335px'}}></img>
      <Button onClick={handleShowChangeProdContent} variant="dark">CHANGE</Button>
    </Card>
  </MDBCol>
</MDBRow>
     


      <h1 style={{textAlign:'center',alignItems:'center'}} >WEEKLY LOOK</h1>
     
   <CardGroup style={{height:300}}>
    {
      allproducts.filter((x) => x.weeklyLook === true).map((product) => (
        <Card style={{ width: '18rem',alignItems:'center' }} key={product.id}> 
          <Card.Img variant="center" style={{height:'80%'}}  src={changeImg(product.image)}></Card.Img>
        <Button style={{marginTop:'15px'}} onClick={()=>btnChange(product.id)} variant="dark">CHANGE</Button>
        </Card>
      ))
    }
   </CardGroup>
    <h1 style={{textAlign:'center',alignItems:'center'}} >PRODUCT TABLE</h1>
    <Button   variant='dark'  onClick={(()=>setaddProductRow(""))}>
                           + Add new product
                        </Button>
    <Form  className="d-flex small">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>setInputSearch(e.target.value)}
            />
            <Button onClick={getSearch} variant="outline-success">Search</Button>
          </Form>

         
    <Table striped hover>
    <MDBTableHead dark>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Image</th>
          <th>Image2</th>
          <th>Image3</th>
          <th>Video</th>
          <th>NEW</th>
          <th>Category</th>
          <th>Sub Category</th>
          <th>Material</th>
          <th>Season</th>
          <th>Sizes</th>
          <th>Price</th>
          <th>For sale</th>
          <th>Color</th>
          <th>Function</th>
          <th></th>

        </tr>
        </MDBTableHead>
      <tbody>
      <tr hidden={addProductRow} >
                 <th  scope='row' ></th>
          
               
            <td > <MDBInput onChange={((e)=>setAddProductName(e.target.value))} type='text'/> </td>
            <td > <MDBInput onChange={(e) => handleFileChange(e, {AddProductName})} type='file'/> </td>
            <td > <MDBInput  onChange={(e) => handleFileChange2(e, {AddProductName})} type='file'/> </td>
            <td > <MDBInput  onChange={(e) => handleFileChange3(e, {AddProductName})} type='file'/> </td>
            <td > <MDBInput  onChange={(e) => handleFileChangeVideo(e, {AddProductName})} type='file'/> </td>
 <td>   <MDBCheckbox  label='NEW' onChange={(e)=>setAddAddIsNew(e.target.checked)} /></td>
            <td > <MDBInputGroup className='mb-3' >
      <div className="mb-6 pb-2">
                <select className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setAddProductCategory(e.target.value)}>
                <option selected value="0">Choose item</option>
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
                <option selected value="0">Choose item</option>
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
                <option selected value="0">Choose item</option>
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
                <option selected value="0">Choose item</option>
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
                <option selected value="0">Choose item</option>
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
        
<td > Same price </td>
<td > <MDBInputGroup className='mb-3' >
      <div className="mb-6 pb-2">
                <select className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setAddProductColor(e.target.value)}>
                <option selected value="0">Choose item</option>
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
<td><Button   onClick={confirmAdd}  variant='dark'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
</svg></Button></td>
<td></td>
      </tr>
      {
        allproducts.map((x, index)=> <tr  >
                
        <th scope='row'>{x.id}</th>
      
        <td > 
        {x.name}
    </td>
    <td > 
    <img src={changeImg(x.image)} width={50} height={50} alt="Товар" />
         
    </td>
    <td > 
    <img src={changeImg(x.image2)} width={50} height={50} alt="Товар" />
      
    </td>
    <td > 
    <img src={changeImg(x.image3)} width={50} height={50} alt="Товар" />
           
    </td>
    <td > 
           <MDBInputGroup  className='mb-3'  >
      <input value={x.video} className='form-control' type='text' />
    </MDBInputGroup>
    </td>
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
                <select   className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e)=>setSizesUpdate(e.target.value)} value={x.seasonid}>
               
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

        </div>
    );
}
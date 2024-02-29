import { useState } from "react";
import { useEffect } from "react";
import { connect,useDispatch,useSelector } from 'react-redux';
import { setProducts, setUsers, addProduct, deleteUser,setSizes,setProductSizes,deleteProduct,setCategories,editProduct,setMaterials,setSeasons,setSubCategories, addSubCategory } from '../redux/actions';
import axios from 'axios';
import React from 'react';
import ProductTableItem from '../Components/ProductTableItem';
import {MDBBtn,MDBInputGroup,MDBInput,MDBCheckbox , MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Card, CardGroup, CardImg} from 'react-bootstrap';
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
    const [AddProductImage3,setAddProductImage3] = useState("");
    const [AddProductName,setAddProductName] = useState("");
    const [AddProductImage,setAddProductImage] = useState("");
    const [AddProductImage2,setAddProductImage2] = useState("");

    const [AddProductVideo,setAddProductVideo] = useState("");
    const [AddproductPrice,setAddproductPrice] = useState(0);
    const [AddproductSalePrice,setAddproductSalePrice] = useState(0);
    const [addProductRow,setaddProductRow] = useState("hidden");
    const [AddProductCategory,setAddProductCategory] = useState("");
    const [AddProductSubCategory,setAddProductSubCategory] = useState("");
    const [AddProductSeason,setAddProductSeason] = useState("");
    const [AddProductMaterial,setAddProductMaterial] = useState("");
    const [AddProductSizes,setAddProductSizes] = useState("");
    const [AddIsNew,setAddAddIsNew] = useState(true);
    const [idToDelete,setIdToDelete]=useState(0);

    const [nametoUpdate,setNameToUpdate] = useState("");
    const [image3toUpdate,setImage3ToUpdate] = useState("");
    const [imagetoUpdate,setImageToUpdate] = useState("");
    const [image2toUpdate,setImage2ToUpdate] = useState("");
    const [videotoUpdate,setVideoToUpdate] = useState("");
    const [subCategoryUpdate,setSubCategoryUpdate] = useState("");
    const [priceUpdate,setPriceUpdate] = useState(0);
    const [salepriceUpdate,setSalePriceUpdate] = useState(0);
    const [materialUpdate,setMaterialUpdate] = useState("");
    const [seasonUpdate,setSeasonUpdate] = useState(true);
    const [isNewUpdate,setIsNewUpdate] = useState(true);
    const [categoryUpdate,setCategoryUpdate] = useState(0);
    const [SizesUpdate,setSizesUpdate] = useState("");
    const [prodIdUpdate,setProdIdUpdate] = useState(0);
    const [allproducts,setAllProducts] = useState([]);


  

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

      axios.get('https://localhost:7269/api/Product/GetProducts')
      .then(response => {
        console.log(response.data)
        dispatch(setProducts(response.data))
        setAllProducts(response.data);
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
                // ,headers: {
                //   'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
                //         'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
                // },
               
                }



            ).then  (res=>
            {
              alert("Product deleted successfull")
              
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
      // ,headers: {
      //   'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
      //         'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
      // },
    
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
 alert('OLD'+oldLookId);
 alert('NEW'+selectedProductId);
 setSelectedProductId(null);
 handleCloseChange();

}

    return(

        <div>

<Modal show={showChange} onHide={handleCloseChange}>
        <Modal.Header closeButton>
          <Modal.Title>Change look</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          
        {allproducts.map((product) => (
        <Card
          key={product.id}
          style={{
            width: '18rem',
            alignItems: 'center',
            backgroundColor: selectedProductId === product.id ? 'lightblue' : 'white',
          }}
        >
          <Card.Img variant="center" style={{ width: 100 }} src={product.image} />
          <Button onClick={() => setNewLookId(product.id)} variant="dark">
            {selectedProductId === product.id ? 'Обрати' : 'Обрати'}
          </Button>
        </Card>
      ))}
     
   
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
          <Modal.Title>Remove product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRemove}>
            Cancel
          </Button>
          <Button variant="dark" onClick={ConfirmDelete}>
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
          <Modal.Title>Update product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
     
        <MDBInputGroup className='mb-3'  textBefore='Name'>
      <input onChange={(e)=>setNameToUpdate(e.target.value)} value={nametoUpdate} className='form-control' type='text' />
    </MDBInputGroup>
    <MDBInputGroup className='mb-3' textBefore='Image URL'>
    <input  onChange={(e)=>setImageToUpdate(e.target.value)} value={imagetoUpdate} className='form-control' type='text' />
      </MDBInputGroup>
      <MDBInputGroup className='mb-3' textBefore='Image URL 2'>
    <input  onChange={(e)=>setImage2ToUpdate(e.target.value)} value={image2toUpdate} className='form-control' type='text' />
      </MDBInputGroup>
      <MDBInputGroup className='mb-3' textBefore='Image URL 2'>
    <input  onChange={(e)=>setImage3ToUpdate(e.target.value)} value={image3toUpdate} className='form-control' type='text' />
      </MDBInputGroup>
      <MDBInputGroup className='mb-3' textBefore='Video URL'>
      <input  onChange={(e)=>setVideoToUpdate(e.target.value)} value={videotoUpdate} className='form-control' type='text' />
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
      <h1 style={{textAlign:'center',alignItems:'center'}} >WEEKLY LOOK</h1>
     
   <CardGroup>
    {
      allproducts.filter((x) => x.weeklyLook === true).map((product) => (
        <Card style={{ width: '18rem',alignItems:'center' }} key={product.id}> {/* Assuming there is an 'id' property in your product object */}
          <Card.Img variant="center" style={{width:300}}  src={product.image}></Card.Img>
        <Button onClick={()=>btnChange(product.id)} variant="dark">CHANGE</Button>
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
          <th>Function</th>
          <th></th>

        </tr>
        </MDBTableHead>
      <tbody>
      <tr hidden={addProductRow} >
                 <th  scope='row' ></th>
          
               
            <td > <MDBInput onChange={((e)=>setAddProductName(e.target.value))} type='text'/> </td>
            <td > <MDBInput onChange={((e)=>setAddProductImage(e.target.value))} type='text'/> </td>
            <td > <MDBInput onChange={((e)=>setAddProductImage2(e.target.value))} type='text'/> </td>
            <td > <MDBInput onChange={((e)=>setAddProductImage3(e.target.value))} type='text'/> </td>
            <td > <MDBInput onChange={((e)=>setAddProductVideo(e.target.value))} type='text'/> </td>
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
        
<td >  </td>
<td><Button   onClick={confirmAdd}  variant='dark'> Confirm to database</Button></td>
<td></td>
      </tr>
      {
        allproducts.map((x, index)=> <tr  >
                
        <th scope='row'>{x.id}</th>
      
        <td > 
           <MDBInputGroup  className='mb-3'  >
      <input   value={x.name} className='form-control' type='text' />
    </MDBInputGroup>
    </td>
    <td > 
    <img src={x.image} width={50} height={50} alt="Товар" />
           <MDBInputGroup  className='mb-3'  >
      <input  value={x.image} className='form-control' type='text' />
    </MDBInputGroup>
    </td>
    <td > 
    <img src={x.image2} width={50} height={50} alt="Товар" />
           <MDBInputGroup  className='mb-3'  >
      <input  value={x.image2} className='form-control' type='text' />
    </MDBInputGroup>
    </td>
    <td > 
    <img src={x.image3} width={50} height={50} alt="Товар" />
           <MDBInputGroup  className='mb-3'  >
      <input  value={x.image3} className='form-control' type='text' />
    </MDBInputGroup>
    </td>
    <td > 
           <MDBInputGroup  className='mb-3'  >
      <input value={x.video} className='form-control' type='text' />
    </MDBInputGroup>
    </td>
    <td>   <MDBCheckbox  label='NEW' checked={x.isNew} /></td>
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
    
        
       

        <td>
          
         <Button variant="dark" onClick={()=>{handleUpdateClick(x.id)}}> Update </Button>
         </td>
       
        <td >
        <Button variant="dark" onClick={()=>{setIdToDelete(x.id);handleShowRemove();}}> Delete </Button>
         </td>
        
        

      </tr>)
      
      
      }
      </tbody>
    </Table>


        </div>
    );
}
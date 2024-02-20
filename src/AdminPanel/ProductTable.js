import { useState } from "react";
import { useEffect } from "react";
import { connect,useDispatch,useSelector } from 'react-redux';
import { setProducts, setUsers, addProduct, deleteUser,deleteProduct,setCategories,editProduct,setMaterials,setSeasons,setSubCategories, addSubCategory } from '../redux/actions';
import axios from 'axios';
import React from 'react';
import ProductTableItem from '../Components/ProductTableItem';
import {MDBBtn,MDBInputGroup,MDBInput,MDBCheckbox , MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function ProductTable(){



  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const categories = useSelector(state => state.categories);
  const subcategories = useSelector(state => state.subcategories);
  const materials = useSelector(state => state.materials);
  const seasons = useSelector(state => state.seasons);

  
    const [inputSearch, setInputSearch] = useState('');
    const [findproducts,setFindProducts] = useState([]);

    const [AddProductName,setAddProductName] = useState("");
    const [AddProductImage,setAddProductImage] = useState("");
    const [AddProductVideo,setAddProductVideo] = useState("");
    const [AddproductPrice,setAddproductPrice] = useState("");
    const [addProductRow,setaddProductRow] = useState("hidden");
    const [AddProductCategory,setAddProductCategory] = useState("");
    const [AddProductSubCategory,setAddProductSubCategory] = useState("");
    const [AddProductSeason,setAddProductSeason] = useState("");
    const [AddProductMaterial,setAddProductMaterial] = useState("");
    const [AddProductSizes,setAddProductSizes] = useState("");
    const [idToDelete,setIdToDelete]=useState(0);

    const [nametoUpdate,setNameToUpdate] = useState("");
    const [imagetoUpdate,setImageToUpdate] = useState("");
    const [videotoUpdate,setVideoToUpdate] = useState("");
    const [subCategoryUpdate,setSubCategoryUpdate] = useState("");
    const [priceUpdate,setPriceUpdate] = useState(0);
    const [materialUpdate,setMaterialUpdate] = useState("");
    const [seasonUpdate,setSeasonUpdate] = useState(true);
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

    useEffect(()=>

    {
    


      axios.get('https://localhost:7269/api/Product/GetProducts')
      .then(response => {
        console.log(response.data)
        dispatch(setProducts(response.data))
        setAllProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  
      axios.get('https://localhost:7269/api/Specification/GetAllCategory')
      .then(response => {
        console.log(response.data)
        dispatch(setCategories(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));

      axios.get('https://localhost:7269/api/Specification/GetAllMaterials')
      .then(response => {
        console.log(response.data)
        dispatch(setMaterials(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));
      axios.get('https://localhost:7269/api/Specification/GetAllSubCategories')
      .then(response => {
        console.log(response.data)
        dispatch(setSubCategories(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));
      axios.get('https://localhost:7269/api/Specification/GetAllSeasons')
      .then(response => {
        console.log(response.data)
        dispatch(setSeasons(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));
    }, [dispatch]);


    const handleUpdateClick = (id) => {
    
     
      let prod= products.find(item=>item.id == id);
    setProdIdUpdate(id);
        setNameToUpdate(prod['name']);
        setImageToUpdate(prod['image']);
        setVideoToUpdate(prod['video']);
        setSubCategoryUpdate(prod['subCategoryid']);
        setCategoryUpdate(prod['categoryid']);   
        setMaterialUpdate(prod['materialid'])
        setSeasonUpdate(prod['seasonid'])
        setSizesUpdate(prod['sizes'])
        setPriceUpdate(prod['price']);
      handleShowUp();
      
    };
  


function confirmAdd()
{
  if(AddProductCategory!=0 &&AddProductSubCategory!=0&&AddProductSeason!=0&&AddProductMaterial!=0)

        { var bodyFormData = new FormData();
          bodyFormData.append('name', AddProductName);
          bodyFormData.append('image', AddProductImage);
          bodyFormData.append('video', AddProductVideo);
          bodyFormData.append('subcategoryid', AddProductSubCategory);
          bodyFormData.append('categoryid', AddProductCategory);
          bodyFormData.append('seasonid', AddProductSeason);
          bodyFormData.append('materialid', AddProductMaterial);
          bodyFormData.append('price', AddproductPrice);
          bodyFormData.append('sizes', AddProductSizes);
        
          
          
          
          
          axios (

            {
            method:'post',
            url:'https://localhost:7269/api/Product/Add',
            data:bodyFormData
            // ,headers: {
            //   'Accept': 'text/plain', 'Content-Type': 'multipart/form-data',
            //         'Authorization':'Bearer '+ window.sessionStorage.getItem("AccessToken")
            // },
          
            }



        ).then  (response=>
        {
          alert("Product  added successfull!")
          dispatch(addProduct(response.data))
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
    bodyFormData.append('image', imagetoUpdate);
    bodyFormData.append('video', videotoUpdate);
    bodyFormData.append('subcategoryid', subCategoryUpdate);
    bodyFormData.append('categoryid', categoryUpdate);
    bodyFormData.append('seasonid', seasonUpdate);
    bodyFormData.append('materialid', materialUpdate);
    bodyFormData.append('price', priceUpdate);
    bodyFormData.append('sizes', SizesUpdate);
  
    
    
    
    
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
    dispatch(editProduct(prodIdUpdate, response.data));

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


    return(

        <div>


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
      <input  onChange={(e)=>setSizesUpdate(e.target.value)} value={SizesUpdate} className='form-control' type='text' />
      </MDBInputGroup>
       
    

        <MDBInputGroup className='mb-3'  textBefore='Price'>
      <input  onChange={(e)=>setPriceUpdate(e.target.value)} value={priceUpdate} className='form-control' type='number' onkeyup="this.value  = this.value.replace(/[^0-9]/gi, '')" />
      </MDBInputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUp}>
            Close
          </Button>
          <Button variant="dark" onClick={confirmUpdate}>Confirm</Button>
        </Modal.Footer>
      </Modal>

   
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
          <th>Video</th>
          <th>Category</th>
          <th>Sub Category</th>
          <th>Material</th>
          <th>Season</th>
          <th>Sizes</th>
          <th>Price</th>
          <th></th>
          <th>Function</th>
          <th></th>

        </tr>
        </MDBTableHead>
      <tbody>
      <tr hidden={addProductRow} >
                 <th  scope='row' ></th>
          
          
            <td > <MDBInput onChange={((e)=>setAddProductName(e.target.value))} type='text'/> </td>
            <td > <MDBInput onChange={((e)=>setAddProductImage(e.target.value))} type='text'/> </td>
            <td > <MDBInput onChange={((e)=>setAddProductVideo(e.target.value))} type='text'/> </td>
 
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
           <td > <MDBInput onChange={((e)=>setAddProductSizes(e.target.value))} type='text'/> </td>
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
           <MDBInputGroup  className='mb-3'  >
      <input value={x.video} className='form-control' type='text' />
    </MDBInputGroup>
    </td>
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

        <td>    

        <MDBInputGroup className='mb-3' >
      <input  onChange={(e)=>setSizesUpdate(e.target.value)} value={x.sizes} className='form-control' type='text' />
      </MDBInputGroup>
        </td>
        <td  >

        <MDBInputGroup className='mb-3' >
      <input  onChange={(e)=>setPriceUpdate(e.target.value)} value={x.price} className='form-control' type='number' onkeyup="this.value  = this.value.replace(/[^0-9]/gi, '')" />
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
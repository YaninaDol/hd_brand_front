
import Button from 'react-bootstrap/Button';
  import { Component } from "react";

  class ProductTableItem extends Component{
    constructor(props){
        super(props);
    }

    render()
    {
        return(
            <tr  >
                
            <th scope='row'>{this.props.unic}</th>
          
            <td >{this.props.name}</td>
            <td >{this.props.shoeType}</td>
            <td >{this.props.categoryId}</td>
            <td >{this.props.seasonid}</td>
            <td >{this.props.materialid}</td>
            <td >{this.props.price}</td>
            
        
            
           


            <td onClick={() => this.props.remove(this.props.unic)}>
            <Button variant="dark"> Delete </Button>
             </td>
             <td onClick={() => this.props.update(this.props.unic)}>
             <Button variant="dark"> Update </Button>
             </td>

          </tr>
        );
    }
}

export default ProductTableItem;
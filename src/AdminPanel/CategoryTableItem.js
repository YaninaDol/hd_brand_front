import { MDBTable,MDBBtn, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
  import { Component } from "react";
import { Button } from 'react-bootstrap';

  class CategoryTableItem extends Component{
    constructor(props){
        super(props);
    }

    render()
    {
        return(
            <tr  >
                 <th  scope='row'></th>
            <th  scope='row'>{this.props.unic}</th>
            <td >{this.props.name}</td>
             <td onClick={() => this.props.delete(this.props.type,this.props.unic)}> <Button   variant='dark'>
                            Remove 
                        </Button>
                        </td>
                        <td onClick={() => this.props.updateBtn(this.props.unic,this.props.name)}> <Button  variant='dark'>
                            Update 
                        </Button>
                        </td>
          </tr>
        );
    }
}

export default CategoryTableItem;
import { MDBTable,MDBBtn, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
  import { Component } from "react";
import { Button } from 'react-bootstrap';

  class UserTableItem extends Component{
    constructor(props){
        super(props);
    }

    render()
    {
        return(
            <tr  >
                 <th  scope='row'></th>
            <th  scope='row'>{this.props.unic}</th>
            <td  >{this.props.name}</td>
            <td >{this.props.email}</td>
            <td onClick={() => this.props.remove(this.props.unic)}>
                 <Button    variant='dark'> Delete </Button>
             </td>
             <td onClick={() => this.props.update(this.props.unic)}>
                 <Button   variant='dark'> Update </Button>
             </td>
          </tr>
        );
    }
}

export default UserTableItem;
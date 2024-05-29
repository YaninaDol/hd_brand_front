
  import { Component } from "react";

  class OrderTableItem extends Component{
    constructor(props){
        super(props);
    }

    render()
    {
      let items = [];

        try {
            items = JSON.parse(this.props.items);
        } catch (e) {
            console.error("Invalid JSON string for items:", this.props.items);
        }
        return(
            <tr  >
                 <th  scope='row'></th>
            <th  scope='row'>{this.props.unic}</th>
            <td >{this.props.CrmId}</td>
            <td >{this.props.userId}</td>
            <td >{this.props.name}</td>
            <td >{this.props.surname}</td> 
            <td >{this.props.phoneNumber}</td>
            <td >{this.props.delivery}</td>
            <td >{this.props.address}</td>
            <td >{this.props.total}</td>
            <td >{this.props.status}</td>
            <td>
                    {Array.isArray(items) ? (
                        <ul>
                            {items.map((item, index) => (
                                <li key={index}>
                                    <div>Арт: {item.article}</div>
                                    <div> {item.size} р.</div>
                                    
                                    <div>{item.quantity} шт</div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        this.props.items
                    )}
                </td>
          

          </tr>
        );
    }
}

export default OrderTableItem;
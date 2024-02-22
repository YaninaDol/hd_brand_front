import { Component } from "react";
import { Button } from "react-bootstrap";

import Card from 'react-bootstrap/Card';
class Cart extends Component{
    constructor(props){
        super(props);
    }

    render()
    {
        return(
            <div  >
              
                    <Card    style={{width:200,marginLeft:15,marginTop:15}}>
                    <p hidden='hidden'>this.props.unic</p>
                    <Card.Img style={{height:200}} variant="top"  src={this.props.picture} ></Card.Img>
                    <Card.Body>
                        <Card.Text>{this.props.name}</Card.Text>
                        <Card.Title> {this.props.price} UAH </Card.Title>
                        <Button variant="dark" style={{borderRadius:'0px'}} onClick={() => this.props.add(this.props.unic)} id={this.props.unic}>Купити</Button>
                    </Card.Body>
                    </Card>

            </div>
        );
    }
}

export default Cart;
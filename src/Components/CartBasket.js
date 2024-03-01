import React, { Component } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";

class CartBasket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.quantity || 1, 
    };
  }

  incrementQuantity = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  };

  decrementQuantity = () => {
    if (this.state.quantity > 1) {
      this.setState((prevState) => ({ quantity: prevState.quantity - 1 }));
    }
  };
  render() {
    return (
      <MDBCard className="mb-8" style={{marginTop:'5px',borderRadius:'0px'}}>
        <MDBCardBody className="p-4">
          <MDBRow className="justify-content-between align-items-center">
            <MDBCol md="1" lg="1" xl="1">
              <svg
             onClick={() => this.props.remove(this.props.unic)}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
              </svg>
            </MDBCol>
            <MDBCol md="3" lg="3" xl="3">
              <MDBCardImage
                fluid
                src={this.props.picture}
                alt="Cotton T-shirt"
              />
            </MDBCol>
            <MDBCol md="3" lg="3" xl="3"> 
              <p hidden="hidden">{this.props.unic}</p>
              <p className="fw-normal mb-2">{this.props.name}</p>
              <MDBCardText>{this.props.size}</MDBCardText>
            </MDBCol>
            
            <MDBCol md="2" lg="2" xl="2">
              <div className="d-flex justify-content-between align-items-center">
                <Button variant="light" size="sm" onClick={this.decrementQuantity}>
                  -
                </Button>
                <span className="mx-2">{this.state.quantity}</span>
                <Button variant="light" size="sm" onClick={this.incrementQuantity}>
                  +
                </Button>
              </div>
            </MDBCol>
            <MDBCol md="2" lg="2" xl="3">
              <MDBTypography tag="h5" className="mx-2">
              {this.props.price * this.state.quantity} &#8372;
              </MDBTypography>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default CartBasket;

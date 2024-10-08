import React, { Component } from "react";

import {
  MDBCol,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";

class CardBox extends Component {
  constructor(props) {
    super(props);
   
  }
  incrementQuantity = () => {
    this.props.incrementQuantity(this.props.unic,this.props.insulator);
  };

  decrementQuantity = () => {
    this.props.decrementQuantity(this.props.unic,this.props.insulator);
    
  };
  
  render() {
    return (
     
          <MDBRow style={{marginBottom:'15px'}} id= {this.props.unic} className="justify-content-between ">
           
            <MDBCol md='5' >
              <img
              className="card-img"
                fluid
                src={this.props.picture}
                alt="Cotton T-shirt"
                style={{aspectRatio:'3/4',position:'relative',objectFit:'cover'}}
              />
            </MDBCol>
            <MDBCol   > 
            <MDBRow><div style={{fontWeight:'bold'}}>{this.props.name} </div> </MDBRow> 
            <MDBRow> <p style={{opacity:'0.5',color:'gray'}}>Арт: {this.props.article}</p></MDBRow> 
            {this.props.size !== '' && (  <MDBRow style={{marginTop:'15px'}}>
                <MDBCol>{this.props.t('size')}: </MDBCol>
                <MDBCol > {this.props.size}</MDBCol>
               
            </MDBRow>)}
            {this.props.size !== '' && this.props.insulator &&(  <MDBRow style={{marginTop:'15px'}}>
                <MDBCol>{this.props.t('insulator')}: </MDBCol>
                <MDBCol > {this.props.insulator}</MDBCol>
               
            </MDBRow>)}
            {this.props.size !== '' && (
          <MDBRow style={{ marginTop: '15px' }}>
            <MDBCol>{this.props.t('term')}: </MDBCol>
            <MDBCol>{this.props.t('7-10')}</MDBCol>
          </MDBRow>
        )}
           {this.props.size !== '' && (   <MDBRow style={{marginTop:'15px'}}>  <MDBCol   md='6' >
              <div  className="d-flex justify-content-between align-items-center quantity-container">
                <Button variant="light" style={{borderRadius:'0px'}}  onClick={this.decrementQuantity}>
                -
                </Button>
                <span className="mx-2">{this.props.quantity}</span>
                <Button variant="light" style={{borderRadius:'0px'}} onClick={this.incrementQuantity}>
                  +
                </Button>
              </div>
            </MDBCol> </MDBRow>
            )}
<MDBRow  style={{marginTop:'15px'}}>
<MDBCol>
              <MDBTypography tag="h5" id='price'>
              {this.props.price * this.props.quantity} {this.props.selectedCurrency}
              </MDBTypography>
            </MDBCol>
</MDBRow>
            </MDBCol>
            
            
           
            <MDBCol md='1'>
              <svg
             onClick={() => this.props.remove(this.props.unic,this.props.insulator)}
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
          </MDBRow>
     
    );
  }
}

export default CardBox;
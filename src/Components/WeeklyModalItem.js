import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBRow,
    MDBTypography,
  } from "mdb-react-ui-kit";
  import { Component } from "react";

  class WeeklyModalItem extends Component{
    constructor(props){
        super(props);
    }

    render()
    {
        return(
          <MDBCard className="rounded-3 mb-6">
          <MDBCardBody className="p-4">
            <MDBRow className="align-items-center">
              <MDBCol md="2" lg="2" xl="2">
                <MDBCardImage className="rounded-3" fluid src={this.props.picture} alt="Cotton T-shirt" />
              </MDBCol>
              <MDBCol md="3" lg="3" xl="3">
                <p hidden="hidden">{this.props.unic}</p>
                <p className="fw-normal mb-2 text-center">{this.props.name}</p>
               
              </MDBCol>
              <MDBCol md="4" lg="4" xl="4" className="text-center"> 
                <select className="select p-2 bg-grey" onChange={(e) => this.props.choosesize(JSON.parse(e.target.value))}>
                  <option value={JSON.stringify(null)}>Розмір</option>
                  {this.props.sizes.map((x) => (
                    <option key={x.id} value={JSON.stringify(x)}>
                      {x.size}
                    </option>
                  ))}
                </select>
              </MDBCol>
              <MDBCol md="3" lg="3" xl="3" className="text-center"> 
                <MDBTypography tag="h5" style={{ fontSize: '15px',marginTop:'5px' }} className="mb-1">
                  {this.props.price} {this.props.currency}
                </MDBTypography>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>

        );
    }
}

export default WeeklyModalItem;
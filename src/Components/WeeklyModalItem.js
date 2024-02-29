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
              <MDBRow className="justify-content-between align-items-center">
                <MDBCol md="2" lg="2" xl="2">
                  <MDBCardImage className="rounded-3" fluid
                    src={this.props.picture}
                    alt="Cotton T-shirt" />
                </MDBCol>
                <MDBCol md="3" lg="3" xl="3">
                    <p hidden="hidden">{this.props.unic}</p>
                  <p className=" fw-normal mb-2">{this.props.name}</p>
                  <p>
                    <span className="text-muted"></span>{this.props.model}{" "}
                  
                  </p>
                </MDBCol>
               
               
                <MDBCol md="4" lg="1" xl="1" className="text-end">
                {this.props.sizes.length > 1 && (
  <select className="select p-2 bg-grey" onChange={(e) => this.props.choosesize(JSON.parse(e.target.value))}>
  {this.props.sizes.map((x) => (
    <option key={x.id} value={JSON.stringify(x)}>
      {x.size}
    </option>
  ))}
</select>
        )}
</MDBCol>
                <MDBCol  md="2" lg="8" xl="4" className="offset-lg-1">
                  <MDBTypography  tag="h5" className="mb-0">
                  {this.props.price} &#8372;
                  </MDBTypography>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        );
    }
}

export default WeeklyModalItem;
import { Component } from "react";
import './cart.css';
class Cart extends Component{
    constructor(props){
        super(props);
    }

    render()
    {
        return(
            <div  >
              
               <p hidden='hidden'>this.props.unic</p>
              
                     <div className="cartClass">
                        <img height={170} src={this.props.picture} />
                        <h3 className="card-title">{this.props.name}</h3>
                        <h3 className="card-title">{this.props.model}</h3>
                        <div >
                        <h3 >{this.props.price}</h3>
                        </div>
                           <div >
                           <button className='btn btn-dark' style={{borderRadius:'0px'}} onClick={() => this.props.add(this.props.unic)} id={this.props.unic} >Buy Now</button>
                           </div>
                          
                       
             
              
                  </div>
            </div>
        );
    }
}

export default Cart;
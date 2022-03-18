import { Component } from "react";
import './Button.css'
class Button extends Component{

    render(){
        return(
            <>
            
            <button className='Control' onClick={()=>this.props.onClick()} >{this.props.scritta}</button>
            
            </>
        );
    }
}

export default Button;
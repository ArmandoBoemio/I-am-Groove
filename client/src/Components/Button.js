import { Component } from "react";
import './Button.css'
class Button extends Component{

    render(){
        return(
            <>
            
            <button className='Control' onClick={()=>this.props.onClick()} style={{height: 25, width: 150}}>{this.props.scritta}</button>
            
            </>
        );
    }
}

export default Button;
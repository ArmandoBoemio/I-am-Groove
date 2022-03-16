import { Component } from "react";

class Button extends Component{

    render(){
        return(
            <>
            
            <button onClick={()=>this.props.onClick()} style={{height: 25, width: 150}}>{this.props.scritta}</button>
            
            </>
        );
    }
}

export default Button;
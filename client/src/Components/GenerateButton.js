import { Component } from "react";
import './GenerateButton.css';


class GenerateButton extends Component{
    


    render(){
        

        return (
            <div className="background">

                <button className="Generate"
                        onClick={this.props.generatePattern}>
                    generate
                </button>
                    
            </div>
            
        );
    }

}


export default GenerateButton;
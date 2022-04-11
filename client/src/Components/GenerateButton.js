import { Component } from "react";
import './GenerateButton.css';


class GenerateButton extends Component{
    
    
    generatePattern = async (generate) => {
        const response = await fetch("/pattern", {
          method: "POST",
          
          body: generate //JSON.stringify(objct)
        });
        if(response.ok){
          console.log("response worked!");
        }
      }


    render(){
        

        return (
            <div className="background">

                <button className="Generate"
                        onClick={this.generatePattern}>
                    generate
                </button>
                    
            </div>
            
        );
    }

}


export default GenerateButton;
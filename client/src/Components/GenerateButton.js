import { Component } from "react";
import './GenerateButton.css';


class GenerateButton extends Component{
    

    postGenerate=async (generate) => {

        const response = await fetch("/pattern2", {
          method: "POST",
          
          body: generate
        });
        if(response.ok){
          console.log("response worked!");
        }
      }


    
    

    render(){
        

        return (
            <div className="background">

                <button className="Generate"
                        onClick={this.postGenerate}>
                    generate
                </button>
                    
            </div>
            
        );
    }

}


export default GenerateButton;
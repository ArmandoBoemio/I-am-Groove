import { Component } from "react";
import './GenerateButton.css';


class GenerateButton extends Component{
    
  constructor(props){
    super(props);
    this.state={
      
      pattern: {},
      rowdimension:16
    }
  }

    generatePattern = async (generate) => {
      const response = await fetch("/pattern", {
        method: "POST",
        
        body: generate //JSON.stringify(objct)
      });
      if(response.ok){
        console.log("response worked!")
          response.json().then((pattern)=>{
            this.setState({'pattern': {
              'Pattern_hh': pattern.Pattern_hh,
              'Pattern_kick': pattern.Pattern_kick,
              'Pattern_snare': pattern.Pattern_snare,
              'Pattern_tom': pattern.Pattern_tom

            }}, ()=>console.log(this.state.pattern))
          })
      }
    }

    render(){
        

        return (
            <div className="background">

                <button className="Generate"
                        onClick={this.props.generatePattern}>       {/* this.generatePattern */}
                    generate
                </button>
                    
            </div>
            
        );
    }

}


export default GenerateButton;
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
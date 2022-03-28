import { Component } from "react";
import './Complexity.css';
import Slider from './Slider'





class Complexity extends Component{
    
    constructor(props) {
        super(props);

        this.state = {
            complex: 50,

        };

    }
    componentDidUpdate=()=>{
        this.postComplexity(this.state.complex)
    }


    postComplexity=async (complexity) => {
        const objct={complexity};
        const response = await fetch("/complexity", {
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(objct)
        });
        if(response.ok){
          console.log("response worked!");
        }
      }

    handleComplexChange = event => {
        const complex = event.target.value;
        this.setState({ complex })       
    }

    handleComplexWheel=(event)=>{
        const delta =event.deltaY;
        if(this.state.complex>1 && this.state.complex<100){
            if (delta > 0) {
                this.setState({complex: parseInt(this.state.complex) - 1 })
            } else {
                if (parseInt(this.state.complex) > 0) {
                    this.setState({complex: parseInt(this.state.complex) + 1 })
                }
            }
        }

        if(this.state.complex === 1){
            if(delta<0){
                this.setState({complex: parseInt(this.state.complex) + 1 });
            }
        }
        if(this.state.complex === 100){
            if(delta>0){
                this.setState({complex: parseInt(this.state.complex) - 1 });
            }
        }

    }
    
    render(){

        const {complex} = this.state;
               
        return(
            <>
            <div className="complexityContainer">

                <div className="titleComplexity">
                    Complexity
                </div>


                <Slider
                    complex={this.state.complex} 
                    type={'complexity_type'}
                    handleComplexChange={this.handleComplexChange} 
                    handleComplexWheel={this.handleComplexWheel}>
                
                </Slider>
                

                
                
                 

            </div>
            </>
        );

    }

}


export default Complexity;

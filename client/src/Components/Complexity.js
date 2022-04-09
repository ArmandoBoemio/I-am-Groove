import { Component } from "react";
import './Complexity.css';
import Slider from './Slider'





class Complexity extends Component{
    
    constructor(props) {
        super(props);

        this.state = {};

    }

    handleComplexChange = event => {
        const complex = event.target.value;
        this.props.onChange(complex)       
    }

    handleComplexWheel=(event)=>{
        const delta =event.deltaY;
        if(this.props.complexity>1 && this.props.complexity<100){
            if (delta > 0) {
                this.props.onChange(this.props.complexity -1)
            } else {
                if (parseInt(this.props.complexity) > 0) {
                    this.props.onChange(this.props.complexity +1)
                }
            }
        }

        if(this.props.complexity === 1){
            if(delta<0){
                this.props.onChange(this.props.complexity +1)
            }
        }
        if(this.props.complexity === 100){
            if(delta>0){
                this.props.onChange(this.props.complexity -1)
            }
        }

    }
    
    render(){

        const {complexity} = this.props;
               
        return(
            <>
            <div className="complexityContainer">

                <div className="titleComplexity">
                    Complexity
                </div>


                <Slider
                    complex={complexity} 
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

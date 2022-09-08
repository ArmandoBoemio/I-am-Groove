import { Component } from "react";
import './Length.css';
import Slider from './Slider'


class Length extends Component{
    
    constructor(props) {
        super(props);

        this.state = {};

    }


    handleLenChange = event => {
        const len = event.target.value;
        this.props.onChange(len)      
    }

    
    handleWheel=(event)=>{
        const delta =event.deltaY*-1;
        
        if (delta>0 && this.props.len<4){
            this.props.onChange(this.props.len + 1)
        }
        if(delta<0 && this.props.len>0){
            this.props.onChange(this.props.len - 1)
        }
        if(this.props.len>4){
            this.props.onChange(4)
        }
        
        console.log('Length: ' + this.props.len)
    } 
   
    
    render(){
        const { len} = this.props;


       
        return(
            <>
            <div className="lengthContainer">

                <div className="titleLength">
                    APM
                </div>

                <Slider 
                    len={len} 
                    type={'length_type'}
                    handleLenChange={this.handleLenChange}
                    handleWheel={this.handleWheel} 
                >
                </Slider>   

                
            </div>
            </>
        );

    }

}


export default Length;

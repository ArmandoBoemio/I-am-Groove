import { Component } from "react";
import './APM.css';
import Slider from './Slider'


class APM extends Component{
    
    constructor(props) {
        super(props);

        this.state = {};

    }


    handleapmChange = event => {
        const apm = event.target.value;
        this.props.onChange(apm)      
    }

    
    handleWheel=(event)=>{
        const delta =event.deltaY*-1;
        
        if (delta>0 && this.props.apm<2){
            this.props.onChange(this.props.apm + 1)
        }
        if (delta>0 && this.props.apm>=2){
            this.props.onChange(this.props.apm + 2)
        }
        if(delta<0 && this.props.apm<=2){
            this.props.onChange(this.props.apm - 1)
        }
        if(delta<0 && this.props.apm>2){
            this.props.onChange(this.props.apm - 2)
        }
        if(delta>0 && this.props.apm===4){
            this.props.onChange(4)
        }
        if(delta<0 && this.props.apm===0){
            this.props.onChange(0)
        }
    } 
   
    
    render(){
        const {apm} = this.props;


       
        return(
            <>
            <div className="APMContainer">

                <div className="titleAPM">
                    APM
                </div>

                <Slider 
                    apm={apm} 
                    type={'apm_type'}
                    handleapmChange={this.handleapmChange}
                    handleWheel={this.handleWheel} 
                >
                </Slider>   

                
            </div>
            </>
        );

    }

}


export default APM;

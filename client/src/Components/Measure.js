import { Component } from "react";
import './Measure.css';
import Dropdown from "./Dropdown";

class Measure extends Component{
    constructor(props) {
        super(props);

        this.state = {
           numerator: 4,
           denominator: 4,
        };
    }

    
    render(){
        return(
            <>
            <div className="measureContainer">

                <div className="titleMeasure">
                    Measure
                </div>

                <Dropdown afterStateSet={this.props.onChange}></Dropdown>
            
            </div>
            </>
        );

    }

}


export default Measure;
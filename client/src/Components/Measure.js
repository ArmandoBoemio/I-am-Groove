import { Component } from "react";
import './Measure.css';

class Measure extends Component{
    constructor(props) {
        super(props);

        this.state = {
           numerator: 4,
           denominator: 4,
        };
    }

    
    render(){
        let {denominator}=this.state;
        return(
            <>
            <div className="measureContainer">

                <div className="titleMeasure">
                    Measure
                </div>
                

                <select 
                    className="dropdown" 
                    onChange={this.props.onChange}>

                    <option>2</option>
                    <option>3</option>
                    <option selected>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>

                </select>
                
                <select 
                    type="number"  
                    value={denominator} 
                    disabled>

                    <option selected>
                        {denominator}
                    </option>

                </select> 

            </div>
            </>
        );

    }

}


export default Measure;
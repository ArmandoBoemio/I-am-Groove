import { Component } from "react";
import {CSSTransition} from 'react-transition-group';

class Measure extends Component{
    constructor(props) {
        super(props);

        this.state = {
           numerator: 4,
           denominator: 4,
           activeMenu: 'none'
        };
    }

    handleDrop = () =>{
        const dropdown = document.getElementsByClassName('dropdown')
        let childrenvalues = [2,3,4,5,6,7];
        childrenvalues.map((value)=>{
            document.createElement("button", {className: 'dropdownChild'}); 
            dropdown.appendChild(value);
        });
        
        
    }
    
    render(){
        let {denominator}=this.state;
        return(
           
            <> 
              <div className="dropdown">
            <select className="dropbtn" onChange={this.props.onChange}>
            <option>2</option>
            <option>3</option>
            <option selected>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            </select>
            <select type="number"  value={denominator} disabled>
                <option selected>{denominator}</option>
                </select> 

        </div> 
            </>
            
           
            /*<div className="dropdown">
                <button className="openClose" onClick={this.handleDrop}>apri</button>







            </div>*/
        );

    }

}


export default Measure;
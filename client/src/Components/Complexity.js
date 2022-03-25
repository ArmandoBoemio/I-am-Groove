import { Component } from "react";
import './Complexity.css';
/*import Slider from "rc-slider";*/
/*import "rc-slider/assets/index.css";*/




class Complexity extends Component{
    
    constructor(props) {
        super(props);

        this.state = {
            len: 2,

        };

    }

   
    
    render(){

        

        const lenMarks = {
            2: "2",
            4: "4",
            6: "6",
            8: "8",
        };

       
        return(
            <>
            <div className="complexityContainer">

                <div className="titleComplexity">
                    Complexity
                </div>

               
                {/*
                <Slider
                    defaultValue={4}
                    min={2}
                    max={8}
                    step={2}
                    marks = {lenMarks}
                    
                    railStyle={{ backgroundColor: '#68dcff5e', height: 5 }}
                    dotStyle={{backgroundColor:'#68dcff5e'}}
                    activeDotStyle={{backgroundColor:'#349bbb5e'}}
                    handleStyle={{backgroundColor: '#40b9ff'}}
                />*/}

                <div className="bub">
                    
                </div>
                

                
                
                 

            </div>
            </>
        );

    }

}


export default Complexity;

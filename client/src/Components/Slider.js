import { Component } from "react"
import './Slider.css'

class Slider extends Component{
    constructor(props){
        super(props);

        this.state={}
    }

render(){

    return(

        <div>

            {/*TYPE BPM SLIDER*/}

            {this.props.type === "bpm_type" && 
                
                ( 
                <>

                <input className="inputBpm"
                    type="range" 
                    min="50" 
                    max="250"
                    value={this.props.bpm}
                    onChange={this.props.handleBpmChange} 
                    onWheel={this.props.handleWheel}   
                />
            
                <div className="bubBpm">
                    {this.props.bpm}
                </div>
                    
                </>
                )
            }


            {/*TYPE LENGTH SLIDER*/}

            {this.props.type === "length_type" && 

                (
                <>

                <input className="inputLength"
                    type="range" 
                    min="2" 
                    max="8"
                    step="2"
                    /*marks={lenMarks}*/
                    value={this.props.len}
                    onChange={this.props.handleLenChange} 
                    onWheel={this.props.handleWheel}
                       
                />
            
                <div className="bubLen">
                    {this.props.len} measures
                </div>
                    
                </>
                )
            }


            {/*TYPE COMPLEXITY SLIDER*/}
            
            {this.props.type === "complexity_type" && 
               
                (
                <>
                
                <input className="inputComplexity"
                    type="range" 
                    min="1" 
                    max="100"
                    value={this.props.complex}
                    onChange={this.props.handleComplexChange} 
                    onWheel={this.props.handleComplexWheel}
                    
                />
        
                <div className="bubComplex">
                    {this.props.complex}
                </div>
                
                </> 
                )
            }


            
             
        </div>     
        
    );

}













}

export default Slider
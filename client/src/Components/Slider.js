import { Component } from "react"
import './Slider.css'

class Slider extends Component{
    constructor(props){
        super(props);

        this.state={
        }
    }

// componentDidUpdate(prevProps){
//     if(this.props.len!==prevProps.len){
//         if(this.props.len===0){
//             <div className="bubLen">
//                     {this.props.len} measures
//                 </div>

//         }
//         if(this.props.len!==0){
//             <div className="bubLen">
//                     {this.props.len} measures
//                 </div>
//         }   
//     }   
// }



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
                
                <div className="bubLen">
                    {/* {this.props.len} measures */}
                    
                    {this.props.len == 0 && (
                        <div>
                            Automatic Pattern Modulation
                        </div>
                    )}
                    {this.props.len == 1 && (
                        <div>
                            modulate every measure
                        </div>
                    )}
                    {this.props.len > 1 && (
                        <div>
                            modulate every {this.props.len} measures
                        </div>
                    )}

                </div>


                
                    <input className="inputLength"
                        type="range" 
                        min="0" 
                        max="4"
                        step="1"
                        /*marks={lenMarks}*/
                        value={this.props.len}
                        onChange={this.props.handleLenChange} 
                        onWheel={this.props.handleWheel}  
                        
                        
                    />

                <div className="ticks">
                    <span className="tick">off</span>
                    <span className="tick">1</span>
                    <span className="tick">2</span>
                    <span className="tick">3</span>
                    <span className="tick">4</span>
                </div>      

                
                </>
                )
            }


            {/*TYPE COMPLEXITY SLIDER*/}
            
            {this.props.type === "complexity_type" && 
               
                (
                <>

                <div className="bubComplex">
                    {this.props.complex}
                </div>

                <input className="inputComplexity"
                    type="range" 
                    min="1" 
                    max="100"
                    value={this.props.complex}
                    onChange={this.props.handleComplexChange} 
                    onWheel={this.props.handleComplexWheel}
                    
                />
        
                
                
                </> 
                )
            }


            
             
        </div>     
        
    );

}













}

export default Slider
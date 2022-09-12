import { Component } from "react"
import './Slider.css'


class Slider extends Component{

    constructor(props){
        super(props);

        this.state={
        }
    }

        
    render(){

        return(

            <div>

            {/* BPM Slider */}
                
                {this.props.type === "bpm_type" && 
                    ( 
                        <>
                            <input className="inputBpm"
                                type="range" 
                                min="50" 
                                max="180"
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


            {/* APM Slider */}

                {this.props.type === "apm_type" && 
                    (
                        <>
                            <div className="bubAPM">
                                
                                {this.props.apm == 0 && (
                                    <div classname="name0">
                                        Automatic Pattern Modulation
                                    </div>
                                )}
                                {this.props.apm == 1 && (
                                    <div>
                                        modulate every measure
                                    </div>
                                )}
                                {this.props.apm > 1 && (
                                    <div>
                                        modulate every {this.props.apm} measures
                                    </div>
                                )}

                            </div>

                            <input className="inputAPM"
                                type="range" 
                                min="0" 
                                max="4"
                                step="1"
                                value={this.props.apm}
                                onChange={this.props.handleapmChange} 
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


            {/* Complexity Slider */}    

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
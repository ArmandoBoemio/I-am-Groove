import { Component } from "react"

class Slider extends Component{
    constructor(props){
        super(props);

        this.state={}
    }

render(){
    return(
        <div>
             {/*TYPE BPM SLIDER*/}
            { this.props.type === "bpm_type" && (
                <>
                <input 
                type="range" 
                min="50" 
                max="250"
                value={this.props.bpm}
                onChange={this.props.handleBpmChange} 
                onWheel={this.props.handleWheel}
                className="inputBpm"
            />
        
            <div className="bub">
                {this.props.bpm}
                </div>
                
                </>


            )}

                {/*TYPE COMPLEXITY SLIDER*/}
            { this.props.type === "complexity" && (
                <>
                <input 
                type="text" 
                min="50" 
                max="250"
                value={this.props.bpm}
                onChange={this.props.handleBpmChange} 
                onWheel={this.props.handleWheel}
                className="inputBpm"
            />
        
            <div className="bub">
                {this.props.bpm}
                </div>
                
                </>


            )}


             {/*TYPE LENGTH SLIDER*/}








             
        </div>
       
        
    );



}













}

export default Slider
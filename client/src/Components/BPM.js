import { Component } from "react";

class BPM extends Component{
    state={bpm: 120}

    render(){

        return(
            <>
            <div className="BPMContainer">
                <div>BPM</div>
                <button>{this.state.bpm}</button>
            </div>
            </>
        );
    }
}

export default BPM
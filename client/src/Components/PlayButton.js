import { Component } from "react";
import './PlayButton.css';


class PlayButton extends Component{
    constructor(props) {
        super(props);

        this.state = {      
            patternPlaying: false,
        };
    }

    startStop = () => {
        if (this.state.patternPlaying) {
            //Stops the timer
            this.setState({
                patternPlaying: false
            });
        } else {
            //Start timer with current BPM
            this.setState({
                patternPlaying: true
            });
        }
    };
    

    render(){
        
        return (

            <div className="background">

                <button className="Play"
                        onClick={() => {this.startStop(); this.props.playStop();}}>
                        {this.state.patternPlaying ? 'Stop' : 'Play'}
                </button>
                    
            </div>
            
        );
    }
    
}


export default PlayButton;
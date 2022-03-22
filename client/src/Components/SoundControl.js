import { Component } from "react";
import './SoundControl.css';

class SoundControl extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isRecording: false,
            isPlaying: false,
            blobURL: '',
        };
    }

    startStopPlayback = () => {
            console.log('playback');
            this.setState(state => ({
                isPlaying: !state.isPlaying}
                ));
    };


    startStopRecording = () =>{
        console.log('recording clicked');
        this.setState(state => ({
            isRecording: !state.isRecording}
            ));
};

startRecording = () =>{
    console.log('recording...');
    this.setState({
        isRecording: true}
        );
};

stopRecording = () =>{
    console.log('recorded!');
    this.setState({
        isRecording: false}
        );
};
        
    

    render(){
        const { isPlaying, isRecording } = this.state;

        return (
            <div className="soundcontrol">

                <div className="playing">
                    <button onClick={this.startStopPlayback}>
                        {isPlaying ? 'Play' : 'Pause'}
                    </button>    
                </div>                    
                

                <div className="recording">
                    <button onClick={isRecording ? this.stopRecording : this.startRecording}>
                        {isRecording ? 'Stop' : 'Record'}
                    </button>
                </div>
            </div>
            
        );
    }

}


export default SoundControl;
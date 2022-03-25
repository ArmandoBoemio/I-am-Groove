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
        this.audio = new Audio([])
        this.mediaRecorder = []

    }
    

    startPlayback = () => {
        console.log('playback');
        this.audio.play();     
    };

    recordingFunction = () =>{
        
        console.log('recording...');
        console.log(this.state.isRecording)

        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            this.mediaRecorder = new MediaRecorder(stream);
            const audioChunks = [];
            
            this.mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });
        
            this.mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                this.setState({
                    blobURL: audioUrl
                });
                this.audio = audio;
            });   

            
        });
    };

    stopRecording = () =>{
        this.setState({
            isRecording: false
        });
        console.log(this.state.isRecording)
        
        this.mediaRecorder.stop();

    };

    startRecording = () =>{
        this.setState({
            isRecording: true
        });
        console.log(this.state.isRecording)

        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            this.mediaRecorder = new MediaRecorder(stream);
            
            this.mediaRecorder.start();
            const audioChunks = [];
            
            this.mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });
        
            this.mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                this.setState({
                    blobURL: audioUrl
                });
                this.audio = audio;
            });   

            
        });
        console.log(this.state.isRecording)

    };

    
        
    

    render(){
        const { isPlaying, isRecording } = this.state;

        return (
            <div className="soundcontrol">

                <button className="playing"onClick={this.startPlayback}>
                    Play   
                </button>                    
                

                <button className="recording"
                    onClick={isRecording? this.stopRecording : this.startRecording}>
                        {isRecording ? 'Stop' : 'Record'}
                    
                </button>
            
                <button className='load'>
                    Load
                </button>
            </div>
        );
    }
}


export default SoundControl;
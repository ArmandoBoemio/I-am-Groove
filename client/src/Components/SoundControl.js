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
    }

    startPlayback = () => {
        console.log('playback');
        this.audio.play();     
    };

    startRecording = () =>{
        console.log('recording...');
        
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            
            mediaRecorder.start();
      
            const audioChunks = [];
            
            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });
        
            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                this.setState({
                    blobURL: audioUrl,
                });
                this.audio = audio;
                audio.play();
                console.log('listen your audio!')
            });   
            setTimeout(() => {
                mediaRecorder.stop();
                console.log('recorded!')
              }, 3000);
            
        });
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
                    <button onClick={this.startPlayback}>
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
import { Component } from "react";
import Dropdown from "./Dropdown";
import SelectSource from "./SelectSource";
import click from './click1.wav';

import './SoundControl.css';

class SoundControl extends Component{
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            isRecording: false,
            isPlaying: false,
            isDefaultAudio: false,
            isAvailable: false,
            blobURL: '',

        };
        
        this.mediaRecorder = []
        this.recordedAudio = new Audio([])
        this.defaultAudio = new Audio([click])
        this.audio = this.defaultAudio
    }
    

    startPlayback = () => {
        if (this.state.isDefaultAudio){
            console.log('Listening to the default audio');
            this.defaultAudio.play(); 
        }else if (!this.state.isDefaultAudio){
            if (this.state.isAvailable){
                console.log('Listening to user recorded audio');
                this.recordedAudio.play(); 
            }
            else {alert('No Audio recorded yet!')}

        }
    };


    stopRecording = () =>{
        this.setState({
            isRecording: false
        });
        console.log('Recorded successfully!')
        
        this.mediaRecorder.stop();
        this.postAudio(this.state.id, this.recordedAudio) /*recorded audio is not ok here, it is an HTML element*/
    };

    
        
            
                

       

    startRecording = async () =>{
        this.setState({
            isRecording: true
        });
        console.log('Recording...')

        
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
                    blobURL: audioUrl,
                    isAvailable: true
                });
                this.recordedAudio = audio;
            });    
        });
    };

    postAudio = async (id,audio) => {
        const objct={id, audio };
        const response = await fetch("/audio", {
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(objct)
        });
        if(response.ok){
          console.log("response worked!");
          console.log(response['audio'])
        }
      }
    
    swapSource = () =>{
        if (!this.state.isDefaultAudio){
            console.log('Default audio');
        }else if (this.state.isDefaultAudio){
            console.log('User recorded audio');
        }
        this.setState(state =>({
            isDefaultAudio: !state.isDefaultAudio
        }));
        //console.log(this.state.isDefaultAudio);
    }
    

    render(){
        const { isDefaultAudio, isRecording } = this.state;
        
        return (
            <div className="soundcontrol">

                <button className="playing" onClick={this.startPlayback}>
                    Play   
                </button>                    
                

                <button className="recording"
                    onClick={isRecording ? this.stopRecording : this.startRecording}>
                        {isRecording ? 'Stop' : 'Record'}
                    
                </button>
            
                <button className='load'
                    onClick={this.swapSource}>
                        {isDefaultAudio ? 'Default' : 'User'}
                </button>
              

            </div>
        );
    }
}


export default SoundControl;
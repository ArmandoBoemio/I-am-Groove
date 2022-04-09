import { Component } from "react";
import Dropdown from "./Dropdown";
import SelectSource from "./SelectSource";
import click from './click1.wav';
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';
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
        };
        this.mediaRecorder = []
        //this.audioBlob = new Blob([]);
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
        
        //this.postAudio(this.state.id, this.recordedAudio) /*recorded audio is not ok here, it is an HTML element*/
    };

    
        
            
                

       

    startRecording = async () =>{
        this.setState({
            isRecording: true
        });
        console.log('Recording...')

        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            this.mediaRecorder = new MediaRecorder(stream, {'mimeType': 'audio/wav'});
            
            this.mediaRecorder.start();
            const audioChunks = [];
            
            this.mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });
        
            this.mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks, {'type': 'audio/wav;'});
                this.postAudioBlob(this.state.id, audioBlob)
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                console.log(audio)
                this.setState({
                    isAvailable: true
                });
                this.recordedAudio = audio;
            });    
        });
    };

    downloadFile(file) {
        // Create a link and set the URL using `createObjectURL`
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = URL.createObjectURL(file);
        link.download = file.name;
      
        // It needs to be added to the DOM so it can be clicked
        document.body.appendChild(link);
        link.click();
      
        // To make this work on Firefox we need to wait
        // a little while before removing it.
        setTimeout(() => {
          URL.revokeObjectURL(link.href);
          link.parentNode.removeChild(link);
        }, 0);
      }

      postAudioBlob = async (id,audioBlob) => {

        await fetch("/audioBlob", {
            method: "POST",
            headers:{
                "id": id,
                "Content-Type": "application/json"
              },
            body: audioBlob
        }).then(response => {
                 if(response.ok){
            console.log("response worked!");
            var blob = new Blob([response], {type: 'audio/wav'})
            console.log(blob)
            var url = window.URL.createObjectURL(blob)
            const audio=new Audio(url)
            //var audiofile = new File([response],'Audio.wav')
        //How to build a blob from an audio file?
            //const audioBlob = new Blob(audiofile, {'type': 'audio/wav;'});
            //const audioUrl = URL.createObjectURL(audioBlob);
            //const audio = new Audio(audioUrl);
            console.log(audio)
            //this.downloadFile(audiofile)
            //inutile set state
            this.setState({
                isAvailable: true
            });
            this.recordedAudio = audio;
          }           

        });
       
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
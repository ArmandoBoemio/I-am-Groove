import { Component } from "react";
import { MediaRecorder } from 'extendable-media-recorder';
import './SoundControl.css';
import defaultSound1 from './sounds/defaultSound1_kick.mp3';
import defaultSound2 from './sounds/defaultSound2_snare.mp3'
import defaultSound3 from './sounds/defaultSound3_hh.mp3'
import defaultSound4 from './sounds/defaultSound4_bell.mp3'

class SoundControl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            isRecording: false,

            isAvailable: false,
        };
        this.mediaRecorder = []
        this.recordedAudio = new Audio([])
        this.defaultAudio = new Audio([])
        this.audio = this.defaultAudio
    }


    componentDidMount(){
        this.mountDefaultAudio()
    }
    

    startPlayback = () => {
        if (this.props.isDefaultAudio) {
            console.log('Listening to the default audio');
            this.defaultAudio.play();
        } else if (!this.props.isDefaultAudio) {
            if (this.state.isAvailable) {
                console.log('Listening to user recorded audio');
                this.recordedAudio.play();
            }
            else { alert('No Audio recorded yet!') }
        }
    };


    stopRecording = () => {
        this.setState({
            isRecording: false
        });
        console.log('Recorded successfully!')
        this.mediaRecorder.stop();
        this.props.swapSource(true);
    };


    startRecording = async () => {
        this.setState({
            isRecording: true
        });
        console.log('Recording...')

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                this.mediaRecorder = new MediaRecorder(stream, { 'mimeType': 'audio/wav' });

                this.mediaRecorder.start();
                const audioChunks = [];

                this.mediaRecorder.addEventListener("dataavailable", event => {
                    audioChunks.push(event.data);
                });

                this.mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks, { 'type': 'audio/wav;' });
                    this.postAudioBlob(this.state.id, audioBlob)
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    this.setState({
                        isAvailable: true
                    });
                    this.recordedAudio = audio;
                });
            });
    };
    

    postAudioBlob = async (id, audioBlob) => {

        await fetch("/audioProcess", {
            method: "POST",
            headers: {
                "id": id + 1,
                "Content-Type": "application/json"
            },
            body: audioBlob
        }).then(response => response.blob())
            .then(myBlob => {
                var objectURL = URL.createObjectURL(myBlob);
                const audio = new Audio(objectURL);
                this.recordedAudio = audio;
            })
    }


    mountDefaultAudio(){
        if(this.props.id+1===1){this.defaultAudio = new Audio([defaultSound1])}
        if(this.props.id+1===2){this.defaultAudio = new Audio([defaultSound2])}
        if(this.props.id+1===3){this.defaultAudio = new Audio([defaultSound3])}
        if(this.props.id+1===4){this.defaultAudio = new Audio([defaultSound4])}
    }


    render() {
        const { isRecording } = this.state;
        const { isDefaultAudio } = this.props

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
                    onClick={() => this.props.swapSource(false)}>
                    {isDefaultAudio ? 'Default' : 'User'}
                </button>


            </div>
        );
    }
}


export default SoundControl;
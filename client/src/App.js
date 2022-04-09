import './App.css';
import {Component} from 'react'

import backgroundVideo from './backgrounds/videoBG.mp4'

import Metronome from './Components/Metronome';
import Measure from './Components/Measure';
import Length from './Components/Length';
import SoundChannel from './Components/SoundChannel';
import GenerateButton from './Components/GenerateButton';
import Complexity from './Components/Complexity'

import { register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      beatsPerMeasure: 4,
      channelNumber: 4,
      BPM: 120,
      length: 4,
      complexity: 50
    }
  }

    componentDidMount=async ()=>{
      await register(await connect());
    }

  
  postState = async (objct) => {
    const response = await fetch("/state", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objct)
    });
    if(response.ok){
      console.log("State sent!");
    }
  }
  
  componentDidUpdate=()=>{
    let {beatsPerMeasure,complexity,BPM,length}=this.state;
    let objct={beatsPerMeasure,complexity,BPM,length};
    this.postState(objct)
  }
  
  
  onMeasureChange = (value) =>{
      this.setState({beatsPerMeasure: value});

  }
  
  onLengthChange = (value) =>{
    this.setState({length: value});

  }

  onComplexityChange = (value) =>{
    this.setState({complexity: value});

  }

  onBPMChange=(value)=>{
    this.setState({BPM: value});
  }

  render(){

    const numberOfChannels = Array.from(Array(this.state.channelNumber).keys());

      return (

        <div className="App">
          <header className="App-header">

            <video autoPlay loop muted id='video'>
                <source src={backgroundVideo} type='video/mp4'/>
            </video>

            <div className='mainContainer'>
      
              <div className='titolo'>
                GROOVE GENERATOR {this.state.bpm}
              </div>

              <div className='sliders'>
                
                <Metronome  beatsPerMeasure={this.state.beatsPerMeasure} onChange={this.onBPMChange} bpm={this.state.BPM}></Metronome>
                <Measure onChange={this.onMeasureChange}></Measure>
                
                <div className='rightside'>
                  <Length onChange={this.onLengthChange} len={this.state.length} ></Length>
                  <Complexity onChange={this.onComplexityChange} complexity={this.state.complexity}></Complexity>
                </div>
                  
              </div>

              <div className='sounds'>

                {numberOfChannels.map((key)=>
                  <SoundChannel key={key} id={key} measure={this.state.beatsPerMeasure} length={this.state.length}></SoundChannel>
                )}

                <GenerateButton></GenerateButton>
                
              </div>

            </div>
          </header>
        </div>
      );
  }
}

export default App;

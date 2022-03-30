import './App.css';
import {Component} from 'react'

import backgroundVideo from './backgrounds/videoBG.mp4'

import Metronome from './Components/Metronome';
import Measure from './Components/Measure';
import Length from './Components/Length';
import SoundChannel from './Components/SoundChannel';
import GenerateButton from './Components/GenerateButton';
import Complexity from './Components/Complexity'



class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      beatsPerMeasure: 4,
      channelNumber: 4
    }
  }


  fetchData = async (thing) => {
    const response = await fetch(thing);
    const data = await response.json();
    this.setState({shownum: data.body})
    return console.log(data.body);
  }

  postData = async (bpm,beatsPerMeasure) => {
    const objct={bpm, beatsPerMeasure };
    const response = await fetch("/beat_measure", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objct)
    });
    if(response.ok){
      console.log("response worked!");
    }
  }
      
  postMeasure = async (beatsPerMeasure) => {
    const objct={beatsPerMeasure };
    const response = await fetch("/measure", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objct)
    });
    if(response.ok){
      console.log("response worked!");
    }
  }
  componentDidUpdate=()=>{
    this.postMeasure(this.state.beatsPerMeasure)
  }
  onMeasureChange = (number) =>{
      this.setState({beatsPerMeasure: number});

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
                
                <Metronome  beatsPerMeasure={this.state.beatsPerMeasure}></Metronome>
                <Measure onChange={this.onMeasureChange}></Measure>
                
                <div className='rightside'>
                  <Length ></Length>
                  <Complexity></Complexity>
                </div>
                  
              </div>

              <div className='sounds'>

                {numberOfChannels.map((key)=>
                  <SoundChannel key={key} id={key}></SoundChannel>
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

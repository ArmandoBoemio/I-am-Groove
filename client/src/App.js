import './App.css';
// import {Component} from 'react';

import backgroundVideo from './backgrounds/videoBG.mp4'

import Metronome from './Components/Metronome';
import Measure from './Components/Measure';
import Length from './Components/Length';
import SoundChannel from './Components/SoundChannel';
import GenerateButton from './Components/GenerateButton';
import Complexity from './Components/Complexity'
import PlayButton from './Components/PlayButton';
// import Pattern from './Components/Pattern';


import { register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {


  const [controls, setControls]=useState({
    beatsPerMeasure: 4,
    numberOfChannels:4,   //occhio qua che il nome cambia
    BPM: 120,
    length: 4,
    complexity: 50
  })

  const [patternState, setPatterns] = useState({
    pattern: {},
    rowdimension: 16
  })

  useEffect(()=>{
    postState(controls)
  },[controls])

  useEffect(async ()=>{
    await register(await connect());
    
  },[])

  
  const postState = async (objct) => {
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
  

  const onMeasureChange = (value) =>{
    const cont={
      beatsPerMeasure: value,
      length: controls.length,
      complexity: controls.complexity,
      BPM: controls.BPM,
      numberOfChannels: controls.numberOfChannels
    }
    setControls(cont);

  }
  
  const onLengthChange = (value) =>{
    const cont={
      beatsPerMeasure: controls.beatsPerMeasure,
      length: value,
      complexity: controls.complexity,
      BPM: controls.BPM,
      numberOfChannels: controls.numberOfChannels
    }
    setControls(cont);

  }

  const onComplexityChange = (value) =>{
    const cont={
      beatsPerMeasure: controls.beatsPerMeasure,
      length: controls.length,
      complexity: value,
      BPM: controls.BPM,
      numberOfChannels: controls.numberOfChannels
    }
    setControls(cont);

  }

  const onBPMChange=(value)=>{
    const cont={
      beatsPerMeasure: controls.beatsPerMeasure,
      length: controls.length,
      complexity: controls.complexity,
      BPM: value,
      numberOfChannels: controls.numberOfChannels
    }
    setControls(cont);
  }




  const generatePattern = async (generate) => {
    const response = await fetch("/pattern", {
      method: "POST",
      
      body: generate //JSON.stringify(objct)
    });
    if(response.ok){
      console.log("response worked!")
        response.json().then((pattern)=>{
          setPatterns({'pattern': {
            'Pattern_kick': pattern.Pattern_kick,
            'Pattern_snare': pattern.Pattern_snare,
            'Pattern_hh': pattern.Pattern_hh,
            'Pattern_tom': pattern.Pattern_tom

          }}, ()=>console.log((patternState)))



                  // this.setState({rowdimension: this.state.pattern.Pattern_kick.split(/[ ,]+/).map(Number).length})
                  //     console.log("row:",this.state.rowdimension)
                      
                  //     this.setState({
                  //       pattern: ( this.state.pattern.Pattern_kick.replace(/[\])}[{(]/g, '').split(/[ ,]+/).map(Number) .concat(
                  //                 this.state.pattern.Pattern_snare.replace(/[\])}[{(]/g, '').split(/[ ,]+/).map(Number),
                  //                 this.state.pattern.Pattern_hh.replace(/[\])}[{(]/g, '').split(/[ ,]+/).map(Number),
                  //                 this.state.pattern.Pattern_tom.replace(/[\])}[{(]/g, '').split(/[ ,]+/).map(Number)
                  //       )  )
                  //     }) 
                      
                  // console.log((patternState.pattern))
                  // console.log(typeof(patternState.pattern))


        })
    }
  }
  

  

    const numberOfChannels = Array.from(Array(controls.numberOfChannels).keys());
    
      return (

        <div className="App">
          <header className="App-header">

            <video autoPlay loop muted id='video'>
                <source src={backgroundVideo} type='video/mp4'/>
            </video>

            <div className='mainContainer'>
      
              <div className='titolo'>
                GROOVE GENERATOR 
              </div>

              <div className='sliders'>
                
                <Metronome  beatsPerMeasure={controls.beatsPerMeasure} onChange={onBPMChange} bpm={controls.BPM}></Metronome>
                <Measure onChange={onMeasureChange}></Measure>
                
                <div className='rightside'>
                  <Length onChange={onLengthChange} len={controls.length} ></Length>
                  <Complexity onChange={onComplexityChange} complexity={controls.complexity}></Complexity>
                </div>
                  
              </div>

              <div className='sounds'>

                  {/* <Pattern pattern={this.state.pattern}></Pattern> */}

                  {/* <Pattern pattern={patternState.pattern}></Pattern> */}


                  {numberOfChannels.map((key)=>
                  // <SoundChannel key={key} id={key} rowdim={this.state.rowdimension} pattern={this.state.pattern}></SoundChannel>
                  <SoundChannel key={key} id={key} rowdim={patternState.rowdimension} pattern={patternState.pattern}></SoundChannel>
                  )}

                  <div className="Buttons">
                    <GenerateButton generatePattern={generatePattern}></GenerateButton>
                    <PlayButton></PlayButton>
                  </div>

                
              </div>

            </div>
          </header>
        </div>
      );
  
}

export default App;

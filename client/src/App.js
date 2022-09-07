import './App.css';

import backgroundVideo from './backgrounds/videoBG.mp4'

import Metronome from './Components/Metronome';
import Measure from './Components/Measure';
import Length from './Components/Length';
import SoundChannel from './Components/SoundChannel';
import GenerateButton from './Components/GenerateButton';
import Complexity from './Components/Complexity'
import PlayButton from './Components/PlayButton';

import { register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';
import { useState } from 'react';
import { useEffect } from 'react';


function App() {


  //STATE VARIABLES

  const [controls, setControls]=useState({
    beatsPerMeasure: 4,
    numberOfChannels:4,   //occhio qua che il nome cambia
    BPM: 120,
    length: 4,
    complexity: 50
  })

  const [patternState, setPattern] = useState({
    pattern: new Array(64).fill(0),
    rowdimension: 16
  })

  const [isPlaying, setPlay] = useState(false)
  const [count, setCount] = useState(0)
  // const [timer, setTimer] = useState(-1)

  const [subdivision, setSubdivision] = useState(4)

  //STATE HOOKS

  useEffect(()=>{
    postState(controls)
  },[controls])

  useEffect(()=>{
    console.log('Current pattern: \n' + patternState.pattern);
  }, [patternState.pattern])

  useEffect(() => {
    console.log('Pattern is playing: ' + isPlaying)
  }, [isPlaying] )

  useEffect(() => {
    console.log('count: ' + count)
    if(isPlaying){
      if(count!==patternState.rowdimension){
        if(count!==0){
          setTimeout(() => {
            setCount(count=>count+1);
            }
          , (60/(controls.BPM*subdivision)) * 1000)}   
      }
      if(count===patternState.rowdimension){
        setTimeout(() => {
          setCount(1);
          }, (60/(controls.BPM*subdivision)) * 1000)        
      }    
    }
    if(!isPlaying){setCount(0)}
  
  }, [count]) 

  
  // useEffect(() => {
  //   if(controls.complexity<=30){
  //     setSubdivision(2)
  //   }
  //   if(30<controls.complexity && controls.complexity<=60){
  //     setSubdivision(4)
  //   }
  //   if(60<controls.complexity && controls.complexity<=100){
  //     setSubdivision(8)
  //   }
  //   setTimeout(() => {
  //     console.log('subdivision: ' + subdivision)
  //   }, 100)
    

  // }, [patternState.isGenerated])


  
  useEffect(async ()=>{
    await register(await connect());  
  },[])

  // useEffect(() => () => {
  //   clearTimeout(timer);
  // }, [])



  //FUNCTIONS

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
  
  const generatePattern = async (generate) => {
    const response = await fetch("/pattern", {
      method: "POST",
      
      body: generate //JSON.stringify(objct)
    });
    if(response.ok){
        response.json().then((pattern)=>{
          
          setPattern({
            rowdimension: (pattern.Pattern_kick.replace(/[\])}[{(]/g, '').split(/[ ,]+/).map(Number).length),
            pattern: (pattern.Pattern_kick.replace(/[\])}[{(]/g, '').split(/[ ,]+/).map(Number).concat(
                      pattern.Pattern_snare.replace(/[\])}[{(]/g, '').split(/[ ,]+/).map(Number),
                      pattern.Pattern_hh.replace(/[\])}[{(]/g, '').split(/[ ,]+/).map(Number),
                      pattern.Pattern_tom.replace(/[\])}[{(]/g, '').split(/[ ,]+/).map(Number)))
          }) 

          if(controls.complexity<=30){
            setSubdivision(2)
          }
          if(30<controls.complexity && controls.complexity<=60){
            setSubdivision(4)
          }
          if(60<controls.complexity && controls.complexity<=100){
            setSubdivision(8)
          }
          setTimeout(() => {
            console.log('subdivision: ' + subdivision)
          }, 100)
      })
    }
  }


  const playStop = () => {
    setPlay(current => !current)
    if(!isPlaying){startCounting(controls.BPM)}
    if(isPlaying){stopCounting()}
  }
                                                      //todo: counter together with metronome click and instant change with bpm
  // const startCounting = (current_bpm) => {
  //   // var current_bpm = controls.BPM
  //   setTimer(setInterval(() => {
  //     setCount(prev => prev+1);
  //   }, (60/current_bpm) * 1000))
  // }

  const startCounting = (current_bpm) => {
    // var current_bpm = controls.BPM
    setTimeout(() => {
      setCount(1);
    }, (60/current_bpm) * 1000)
  }

  const stopCounting = () => {
    // clearInterval(timer)
    // setTimer(-1)
    setCount(0)
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

 
  // VIEW

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
              
              <Metronome beatsPerMeasure={controls.beatsPerMeasure} onChange={onBPMChange} bpm={controls.BPM}></Metronome>
              <Measure onChange={onMeasureChange}></Measure>
              
              <div className='rightside'>
                <Length onChange={onLengthChange} len={controls.length} ></Length>
                <Complexity onChange={onComplexityChange} complexity={controls.complexity}></Complexity>
              </div>
                
            </div>

            <div className='sounds'>

              {numberOfChannels.map((key)=>
              <SoundChannel key={key} id={key} rowdim={patternState.rowdimension} pattern={patternState.pattern} isPlaying={isPlaying} count={count}></SoundChannel>
              )}

              <div className="Buttons">
                <GenerateButton generatePattern={generatePattern}></GenerateButton>
                <PlayButton playStop={playStop}></PlayButton>
                {/* <Clock></Clock> */}
              </div>

              
            </div>

            <footer className="app_footer">
                <p className="lowleft">Source code on <a className="link" href="https://github.com/armandoboemio98/ACTAM">Github</a></p>
                <p className="lowright">Armando Boemio, Filippo Gualtieri, Gabriele Maucione ©</p>
            </footer>

          </div>
        </header>
      </div>
    );
  
}

export default App;

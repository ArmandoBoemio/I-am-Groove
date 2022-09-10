import './App.css';

import backgroundVideo from './backgrounds/videoBG.mp4'

import Metronome from './Components/Metronome';
import Measure from './Components/Measure';
import APM from './Components/APM';
import SoundChannel from './Components/SoundChannel';
import GenerateButton from './Components/GenerateButton';
import Complexity from './Components/Complexity'
import PlayButton from './Components/PlayButton';
import Tooltip from './Components/Tooltip';

import { register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';
import { useState } from 'react';
import { useEffect } from 'react';


function App() {


  //STATE VARIABLES

  const [controls, setControls]=useState({
    beatsPerMeasure: 4,
    numberOfChannels:4,  
    BPM: 120,
    APM: 0,
    complexity: 50
  })

  const [patternState, setPattern] = useState({
    pattern: new Array(64).fill(0),
    rowdimension: 16,
    newGeneration: false
  })

  const [isPlaying, setPlay] = useState(false)
  const [count, setCount] = useState(0)
  const [APMCount, setAPMCount] = useState(-1)

  const [subdivision, setSubdivision] = useState(4)

  //STATE HOOKS

  useEffect(()=>{
    postState(controls)
  },[controls])

  useEffect(() => {
    if (isPlaying){console.log('~~Groovin~~')}
    if (!isPlaying){console.log('Who the **** stopped the music?!')}
}, [isPlaying] )

  useEffect(() => {
    if(isPlaying){
      if(count!==patternState.rowdimension){
        if(count!==0){
          setTimeout(() => {
            setCount(count=>count+1);
            }
          , (60/(controls.BPM*subdivision)) * 1000)}   
      }
      if(count===patternState.rowdimension){
        if(controls.APM == 0){
          setAPMCount(-1)
        }
        if(APMCount === controls.APM-1 && controls.APM !== 0 ){
          generatePattern();
          setAPMCount(-1);
        }
        setTimeout(() => {
          setCount(1);
          setAPMCount(APMCount=>APMCount+1)
          }, (60/(controls.BPM*subdivision)) * 1000)        
      }    
    }
    if(!isPlaying){
      setCount(0)
      setAPMCount(0)}
  
  }, [count]) 

  

  useEffect(async ()=>{
    await register(await connect());  
  },[])


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
      console.log("Adapting the groove!");
    }
  }
  
  const generatePattern = async (generate) => {
    const response = await fetch("/pattern", {
      method: "POST",
      
      body: generate
    });
    if(response.ok){
        response.json().then((pattern)=>{
          
          setPattern({
            newGeneration: !patternState.newGeneration,
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

        
      })
    }
  }


  const playStop = () => {
    setPlay(current => !current)
    if(!isPlaying){startCounting(controls.BPM)}
    if(isPlaying){stopCounting()}
  }
  

  const startCounting = (current_bpm) => {
    setTimeout(() => {
      setCount(1);
    }, (60/current_bpm) * 1000)
  }

  const stopCounting = () => {
    setCount(0)
  }
  

  const onMeasureChange = (value) =>{
    const cont={
      beatsPerMeasure: value,
      APM: controls.APM,
      complexity: controls.complexity,
      BPM: controls.BPM,
      numberOfChannels: controls.numberOfChannels
    }
    setControls(cont);
  }
  
  const onAPMChange = (value) =>{
    const cont={
      beatsPerMeasure: controls.beatsPerMeasure,
      APM: value,
      complexity: controls.complexity,
      BPM: controls.BPM,
      numberOfChannels: controls.numberOfChannels
    }
    setControls(cont);
  }

  const onComplexityChange = (value) =>{
    const cont={
      beatsPerMeasure: controls.beatsPerMeasure,
      APM: controls.APM,
      complexity: value,
      BPM: controls.BPM,
      numberOfChannels: controls.numberOfChannels
    }
    setControls(cont);
  }

  const onBPMChange=(value)=>{
    const cont={
      beatsPerMeasure: controls.beatsPerMeasure,
      APM: controls.APM,
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
        <header className="header">
            
          <video autoPlay loop muted id='video'>
              <source src={backgroundVideo} type='video/mp4'/>
          </video>

          <div className={!isPlaying ? 'img1':'img1_shake'}>
          </div>  

          <div className={!isPlaying ? 'img2':'img2_shake'}>
          </div>


          <div className='mainContainer'>
      
            <div className='topper'>

              <div className='titolo'>
                I AM GROOVE
              </div>
              
              <Tooltip>
                
              </Tooltip>

            </div>     
            
            

            <div className='sliders'>
              
              <Metronome beatsPerMeasure={controls.beatsPerMeasure} onChange={onBPMChange} bpm={controls.BPM}></Metronome>
              <Measure onChange={onMeasureChange}></Measure>
              
              <div className='rightside'>
                <APM onChange={onAPMChange} apm={controls.APM} ></APM>
                <Complexity onChange={onComplexityChange} complexity={controls.complexity}></Complexity>
              </div>
                
            </div>

            <div className='sounds'>

              {numberOfChannels.map((key)=>
              <SoundChannel key={key} id={key} 
                            rowdim={patternState.rowdimension} pattern={patternState.pattern} 
                            isPlaying={isPlaying} count={count}
                            newGeneration={patternState.newGeneration}
                            ></SoundChannel>
              )}

              <div className="Buttons">
                <GenerateButton generatePattern={generatePattern}></GenerateButton>
                <PlayButton playStop={playStop}></PlayButton>
              </div>
              
            </div>

            <footer className="app_footer">
                <p className="lowleft">Source code on <a className="link" href="https://github.com/armandoboemio98/ACTAM" target="_blank" rel="noreferrer">Github</a></p>
                <p className="lowright">Armando Boemio, Filippo Gualtieri, Gabriele Maucione ©</p>
            </footer>
          
          </div>  
        </header>
      </div>
    );
  
}

export default App;

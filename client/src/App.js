import './App.css';
import {Component} from 'react'
import Metronome from './Components/Metronome';
import Measure from './Components/Measure';
import SoundControl from './Components/SoundControl';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state={}
  }


  fetchData = async (thing) => {
    const response = await fetch(thing);
    const data = await response.json();
    this.setState({shownum: data.body})
    return console.log(data.body);
  }

  postData = async (shownum,two) => {
    const objct={shownum, two };
    const response = await fetch("/post2num", {
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
      

  onMeasureChange = (event) =>{
        this.setState({beatsPerMeasure: event.target.value});
      

  }



  render(){
      return (
    <div className="App">
      <header className="App-header">
      <div className='mainContainer'>
        <div className='controls'>

            <div className='tempo'>
              <Metronome beatsPerMeasure={this.state.beatsPerMeasure}></Metronome>
            </div>

            <div className='sliders'>
              <Measure onChange={this.onMeasureChange}></Measure>
            </div>

        </div>

        <div className='sounds'>
        <SoundControl></SoundControl>

        </div>

      </div>
      </header>
    </div>
  );
      }
}

export default App;

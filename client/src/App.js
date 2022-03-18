import logo from './logo.svg';
import './App.css';
import {Component} from 'react'
import BPM from './Components/BPM';
import Metronome from './Components/Metronome';

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
      


  render(){
      return (
    <div className="App">
      <header className="App-header">
      <div className='mainContainer'>
        <div className='controls'>

            <div className='tempo'>
              <BPM></BPM>
              <Metronome></Metronome>
            </div>

            <div className='sliders'>
              
            </div>

        </div>

        <div className='sounds'>


        </div>

      </div>
      </header>
    </div>
  );
      }
}

export default App;

import logo from './logo.svg';
import './App.css';
import Button from './Components/Button';
import MButton from './Components/Metronome_Button';
import {Component} from 'react'


class App extends Component {
  
  constructor(props){
    super(props);
    this.state={shownum: 5, two: 10}
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

  handleOnClick = ()=>{
    this.fetchData("/number");
  }

  handleOnClick2 = ()=>{
    this.postData(this.state.shownum,this.state.two)
  }
      


  render(){
      return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button onClick={this.handleOnClick} scritta="cambia numero"></Button>
        <Button onClick={this.handleOnClick2} scritta="posta"></Button>
        <MButton></MButton>
        <p>The first number is {this.state.shownum}.</p>
        <p>The sum is {this.state.two + this.state.shownum}.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
      }
}

export default App;

import { Component } from "react";
import './Button.css'

class Met_Button extends Component{
    state={time_signature1: 3, time_signature2: 4, ids: [{'id': 0},{'id': 1},{'id': 2}]}

    fetchData = async (thing) => {
        const response = await fetch(thing);
        const data = await response.json();
        this.setState(data.body)
        return console.log(data.body);
      }
    
    postData = async (shownum,two) => {
        const objct={shownum, two };
        const response = await fetch("/time_signature", {
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

    get_TS(){
        this.fetchData("/time_signature");
        console.log(this.state.time_signature)
        console.log(this.state.ids)
    }

    handleSubmit= (event) =>{
        this.postData(this.state.time_signature1,this.state.time_signature2)
    }

    handleChange=(event)=>{
        const nums = event.target.value
        const names = event.target.name
        this.setState(values =>({...values, [names]:nums}))
    }
    render(){
        return(
            <>
            <form onSubmit={this.handleSubmit}> 
                <label htmlFor='1num'></label>
                <input type="text" onChange={this.handleChange} name='time_signature1' value={this.state.time_signature1}/> 
                <label htmlFor='2num'></label>
                <input type="text" onChange={this.handleChange} name='time_signature2' value={this.state.time_signature2}/>
                <input type="submit" />
            </form>
            <button className='Metronome' style={{height: 25, width: 150, backgroundColor: 'blue'}}>
            {
            this.state.ids.map(id =>(
                <div className="timedot"></div>
            ))}
            
            </button>

            </>
        );
    }
}

export default Met_Button;
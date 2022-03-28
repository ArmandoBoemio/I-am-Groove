import { Component } from "react";
import './Length.css';
import Slider from './Slider'


class Length extends Component{
    
    constructor(props) {
        super(props);

        this.state = {
            len: 4,
            wheelOk: true
        };

    }

    componentDidUpdate=()=>{
        this.postLen(this.state.len)
    }


    postLen=async (len) => {
        const objct={len};
        const response = await fetch("/length", {
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




    handleLenChange = event => {
        const len = event.target.value;
        this.setState({ len })       
    }

    
    handleWheel=(event)=>{
        const delta =event.deltaY*-1;
        
        if (delta>0 && this.state.len<8){
            this.setState({len: this.state.len + 2})
        }
        if(delta<0 && this.state.len>2){
            this.setState({len: this.state.len - 2})
        }
        if(this.state.len>8){
            this.setState({len: 8})
        }
        console.log('Length: ' + this.state.len)
    } 
   
    
    render(){
        const { len} = this.state;

        

        const lenMarks = {
            2: "2",
            4: "4",
            6: "6",
            8: "8",
        };

       
        return(
            <>
            <div className="lengthContainer">

                <div className="titleLength">
                    Length
                </div>

               
                {/*
                <Slider
                    defaultValue={4}
                    min={2}
                    max={8}
                    step={2}
                    marks = {lenMarks}
                    
                    railStyle={{ backgroundColor: '#68dcff5e', height: 5 }}
                    dotStyle={{backgroundColor:'#68dcff5e'}}
                    activeDotStyle={{backgroundColor:'#349bbb5e'}}
                    handleStyle={{backgroundColor: '#40b9ff'}}
                />*/}

                <Slider 
                    len={this.state.len} 
                    type={'length_type'}
                    handleLenChange={this.handleLenChange}
                    handleWheel={this.handleWheel} 
                >
                </Slider>         

            </div>
            </>
        );

    }

}


export default Length;

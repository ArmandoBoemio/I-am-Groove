import { Component } from "react";
import "./SingleCell.css"
import sound1 from './sounds/kik1.mp3';
import sound2 from './sounds/snare2.mp3'
import sound3 from './sounds/click1.wav'
import sound4 from './sounds/perc4.mp3'

class Cell extends Component{
    constructor(props){
        super(props);
        this.state={
        isCellOn: false,
        isPlaying: false, 
        count: 0,
        idChannel: 1, 
        idCell: 1,
        nCells: 16,
        audio: false
        }
        this.audio1 = new Audio([sound1])
        this.audio2 = new Audio([sound2])
        this.audio3 = new Audio([sound3])
        this.audio4 = new Audio([sound4])
    }


handleOnClick=()=>{
    this.setState({isCellOn: !this.state.isCellOn}, ()=>this.render);
    console.log('You changed the current pattern')
    // this.state.audio.play()
}

componentDidMount() {
    this.setState({
        isCellOn: this.props.activity,
        isPlaying: this.props.isPlaying,
        count: this.props.count,
        idCell: this.props.idCell,
        idChannel: this.props.idChannel,
        nCells: this.props.nCells
    }) 
    if(this.props.idChannel===1){
        this.setState({
            audio: this.audio1
        })
    }
    if(this.props.idChannel===2){
        this.setState({
            audio: this.audio2
        })
    }
    if(this.props.idChannel===3){
        this.setState({
            audio: this.audio3
        })
    }
    if(this.props.idChannel===4){
        this.setState({
            audio: this.audio4
        })
    }
    
    console.log('suono numero ' + this.props.idChannel)
    // console.log(this.state.nCells + ' cells on chanel ' + this.props.idChannel)
  }

componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.isCellOn !== this.props.activity) {
        this.setState({
            isCellOn: this.props.activity            
        })   
    }
    if (prevState.nCells !== this.props.nCells) {
        this.setState({
            nCells: this.props.nCells           
        })   
        // console.log(this.state.nCells + ' cells on chanel ' + this.props.idChannel)
    }
    if (prevState.isPlaying !== this.props.isPlaying) {
        this.setState({
            isPlaying: this.props.isPlaying            
        }) 
    }
    if (prevState.count !== this.props.count){
        this.setState({
            count: this.props.count
        })
        this.counting()
        
    }
  }

counting(){
    if(this.state.count === this.state.idCell){
        this.readCell()
    }
}

readCell(){
    if(this.state.isCellOn){
        this.state.audio.play()
        // console.log('ye')
    }
}





render(){
    
    return(
        
        <button className={this.state.isCellOn ? 'active':'not-active'} 
                onClick={this.handleOnClick}>   
                {/* {this.props.idCell+1} */}
        </button>
        

    );
}

}

export default Cell
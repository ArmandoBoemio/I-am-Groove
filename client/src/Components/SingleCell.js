import React, {Component} from 'react';
import "./SingleCell.css"
import defaultSound1 from './sounds/defaultSound1_kick.mp3';
import defaultSound2 from './sounds/defaultSound2_snare.mp3'
import defaultSound3 from './sounds/defaultSound3_hh.mp3'
import defaultSound4 from './sounds/defaultSound4_bell.mp3'
import userSound1 from './sounds/userSounds/userAudio_1.wav'
import userSound2 from './sounds/userSounds/userAudio_2.wav'
import userSound3 from './sounds/userSounds/userAudio_3.wav'
import userSound4 from './sounds/userSounds/userAudio_4.wav'



class Cell extends Component{
    constructor(props){
        super(props);
        this.state={
        isCellOn: 0,
        isPlaying: false, 
        count: 0,
        idChannel: 1, 
        idCell: 1,
        nCells: 16,
        // audio: false,
        isDefaultAudio: true
        }

        this.audio = new Audio([])

        // this.defaultAudio1 = new Audio([defaultSound1])
        // this.defaultAudio2 = new Audio([defaultSound2])
        // this.defaultAudio3 = new Audio([defaultSound3])
        // this.defaultAudio4 = new Audio([defaultSound4])
        
        // this.userAudio1 = new Audio([userSound1])
        // this.userAudio2 = new Audio([userSound2])
        // this.userAudio3 = new Audio([userSound3])
        // this.userAudio4 = new Audio([userSound4])

        // this.audioRef = React.createRef();
    }

    


handleOnClick=()=>{
    if(this.state.isCellOn===1){this.setState({isCellOn: 0})}
    if(this.state.isCellOn===0){this.setState({isCellOn: 1})}
    // this.setState(prevState => ({isCellOn: !prevState.isCellOn})); //, ()=>this.render
    setTimeout(()=> {console.log('You changed the current pattern in ' + this.state.isCellOn)}, 10)
    
    this.audio.play();
}

componentDidMount() {
    this.setState({
        isCellOn: this.props.activity,
        isPlaying: this.props.isPlaying,
        count: this.props.count,
        idCell: this.props.idCell,
        idChannel: this.props.idChannel,
        nCells: this.props.nCells,
        isDefaultAudio: this.props.isDefaultAudio
    }) 
    this.mountDefaultAudio()
    
    //console.log('suono numero ' + this.props.idChannel)
    // console.log(this.state.nCells + ' cells on chanel ' + this.props.idChannel)
  }

componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.activity !== this.props.activity) {
        this.setState({
            isCellOn: this.props.activity
        })           
    }
    if (this.props.newGeneration !== prevProps.newGeneration) {
        this.setState({
            isCellOn: this.props.activity
        })           
    }
    if (prevProps.nCells !== this.props.nCells) {
        this.setState({
            nCells: this.props.nCells           
        })   
        // console.log('!') //this was for debug: it seems it performs twice but for now it's not important
    }
    if (prevProps.isPlaying !== this.props.isPlaying) {
        this.setState({
            isPlaying: this.props.isPlaying            
        }) 
    }
    if (prevState.isDefaultAudio !== this.props.isDefaultAudio) {
        // console.log('yo')
        this.setState({
            isDefaultAudio: this.props.isDefaultAudio
        }) 
        // setTimeout(()=> {console.log('Default is ' + this.props.isDefaultAudio)}, 10)
        if(this.props.isDefaultAudio){
            this.mountDefaultAudio()
        }
        if(!this.props.isDefaultAudio){
            this.mountRecordedAudio()
        }
    }
    if (prevProps.count !== this.props.count){
        this.setState({
            count: this.props.count 
        })
        this.counting()
        // console.log(this.props.count)
    }
  }

counting(){
    if(this.props.count === this.state.idCell && this.props.count!==0){
        this.readCell()
    }
}

readCell(){
    if(this.state.isCellOn && this.state.isPlaying){
        this.audio.play()
        // console.log('ye')
    }
}

// mountDefaultAudio(){
//     if(this.props.idChannel===1){
//         this.setState({
//             audio: this.audio1
//         })
//     }
//     if(this.props.idChannel===2){
//         this.setState({
//             audio: this.audio2
//         })
//     }
//     if(this.props.idChannel===3){
//         this.setState({
//             audio: this.audio3
//         })
//     }
//     if(this.props.idChannel===4){
//         this.setState({
//             audio: this.audio4
//         })
//     }
// }

mountDefaultAudio(){
    if(this.props.idChannel===1){this.audio = new Audio([defaultSound1])}
    if(this.props.idChannel===2){this.audio = new Audio([defaultSound2])}
    if(this.props.idChannel===3){this.audio = new Audio([defaultSound3])}
    if(this.props.idChannel===4){this.audio = new Audio([defaultSound4])}
}

mountRecordedAudio(){
    
    if(this.props.idChannel===1){this.audio = new Audio([userSound1])}
    if(this.props.idChannel===2){this.audio = new Audio([userSound2])}
    if(this.props.idChannel===3){this.audio = new Audio([userSound3])}
    if(this.props.idChannel===4){this.audio = new Audio([userSound4])}
}



render(){
    
    return(
        
        <button className={this.state.isCellOn ? 'active':'not-active'} 
                onClick={this.handleOnClick}>   
                {/* {this.props.idCell} */}
                {/* {this.state.isCellOn} */}
                {/* <audio src={sound1} ref={this.audioRef}/> */}
                
        </button>
        

    );
}

}

export default Cell
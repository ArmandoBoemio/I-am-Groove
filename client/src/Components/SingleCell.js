import { Component } from "react";
import "./SingleCell.css"

class Cell extends Component{
    constructor(props){
        super(props);
        this.state={
        isCellOn: false,
        isPlaying: false,
        }
    }


handleOnClick=()=>{
    this.setState({isCellOn: !this.state.isCellOn}, ()=>this.render);
    console.log('You changed the current pattern')
}

componentDidMount() {
    this.setState({
        isCellOn: this.props.activity,
        isPlaying: this.props.isPlaying
    }) 
  }

componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.isCellOn !== this.props.activity) {
        this.setState({
            isCellOn: this.props.activity            
        })    
    }
    if (prevState.isPlaying !== this.props.isPlaying) {
        this.setState({
            isPlaying: this.props.isPlaying            
        }) 
        // console.log('ue '+ this.state.isPlaying)   
    }
  }

// useEffect(() => {
//     if (isNoteOn) {
//         play()
//     }

// }, [isNoteOn, play])


render(){
    
    return(
        
        <button className={this.state.isCellOn ? 'active':'not-active'} 
                onClick={this.handleOnClick}>
        </button>


    );
}

}

export default Cell
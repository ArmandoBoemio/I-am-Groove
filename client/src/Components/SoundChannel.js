import { Component } from "react";
import './SoundChannel.css';
import SoundControl from './SoundControl';
import Cell from "./SingleCell";


class SoundChannel extends Component{
    
    constructor(props){
        super(props);

        this.state={
            nCells: 16,
            pattern: [],
            isPlaying: false,
            count: 0
        }
    }

        
    componentDidMount() {
        this.setState({
            pattern: Array.from(this.props.pattern).slice(this.props.rowdim*this.props.id,this.props.rowdim*(this.props.id+1)),
            isPlaying: this.props.isPlaying
        }) 
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.pattern !== this.props.pattern) {
            this.setState({
                pattern: Array.from(this.props.pattern).slice(this.props.rowdim*this.props.id,this.props.rowdim*(this.props.id+1)),
            })    
        }
        if (prevState.isPlaying !== this.props.isPlaying) {
            this.setState({
                isPlaying: this.props.isPlaying            
            }) 
            // console.log('yo '+ this.state.isPlaying)   
        }
        if (prevState.count !== this.props.count){
            this.setState({
                count: this.props.count
            })
            // console.log('count: ' + this.state.count)
            // this.setState({nCells: this.state.count})
        }
        }
    

    // playingPattern()

    render(){
        let nCells = this.props.rowdim
        nCells =Array.from(Array(nCells).keys());

        return (

            <div className="container">
                
                <div className="panel">

                    <div className="texto">
                        Sound #{this.props.id+1} 
                        {/* {this.state.pattern}   //for debug  */}   
                    </div>

                    <div className="barra">
                        - 
                    </div>

                    <div className="Controls">
                        <SoundControl id={this.props.id} >
                        </SoundControl>
                        {/* <button onClick={this.debugpost}></button> */}
                    </div> 

                </div>
                
                <div className="gridContainer">
                   
                    {nCells.map((key)=>
                    <Cell key={key} activity={this.state.pattern[key]} num={(60 - this.props.rowdim)*0.5} isPlaying={this.state.isPlaying}>
                    </Cell>
                    )}
                    
                        
                </div>
                

            </div>
            
        );
    }

}


export default SoundChannel;
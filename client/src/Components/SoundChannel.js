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
            isPlaying: this.props.isPlaying,
            count: this.props.count
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
        }
        if (prevState.count !== this.props.count){
            this.setState({
                count: this.props.count
            })
        }
        }
    


    render(){
        let nCells = this.props.rowdim
        nCells =Array.from(Array(nCells).keys());

        return (

            <div className="container">
                
                <div className="panel">

                    <div className="texto">
                        Sound #{this.props.id+1} 
                    </div>

                    <div className="barra">
                        - 
                    </div>

                    <div className="Controls">
                        <SoundControl id={this.props.id} >
                        </SoundControl>
                    </div> 

                </div>
                
                <div className="gridContainer">
                   
                    {nCells.map((key)=>
                    <Cell key={key} idCell={key} idChannel={this.props.id+1} nCells={this.props.rowdim} activity={this.state.pattern[key]} num={(60 - this.props.rowdim)*0.5} isPlaying={this.state.isPlaying} count={this.state.count}>
                        {this.props.id}
                    </Cell>
                    )}
                    
                        
                </div>
                

            </div>
            
        );
    }

}


export default SoundChannel;
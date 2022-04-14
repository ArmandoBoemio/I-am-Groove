import { Component } from "react";
import './SoundChannel.css';
import SoundControl from './SoundControl'
import Cell from "./SingleCell";
class SoundChannel extends Component{
    
    constructor(props){
        super(props);

        this.state={
            nCells: 16,
            pattern: [],
        }
    }

    // debugpost = () => {
    //     console.log( ( Array.from( this.props.pattern).splice(2,4)  )  )
    // };

    render(){
        //let nCells= this.props.measure*this.props.length
        let nCells = this.props.rowdim
        this.state.pattern = Array.from(this.props.pattern).slice(this.props.rowdim*this.props.id,this.props.rowdim*(this.props.id+1))
        
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
                    <Cell key={key} activity={this.state.pattern[key]} >
                       yo {this.state.pattern[key]}
                    </Cell>
                    )}
                    
                        
                </div>
                

            </div>
            
        );
    }

}


export default SoundChannel;
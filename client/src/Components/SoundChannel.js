import { Component } from "react";
import './SoundChannel.css';
import SoundControl from './SoundControl'
import Cell from "./SingleCell";
class SoundChannel extends Component{
    
    constructor(props){
        super(props);

        this.state={
            nCells: 16,
        }
    }

    render(){
        let nCells= this.props.measure*this.props.length
        // let nCells = this.props.rowdim
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
                        <SoundControl id={this.props.id}>
                        </SoundControl>
                    </div>

                    

                </div>
                
                <div className="gridContainer">
                {nCells.map((key)=>
                key % this.props.measure === 0 ?  
                 <Cell key={key} isNewMeasure={true}></Cell>
                :
                  <Cell key={key}isNewMeasure={false}></Cell>
                )}
 
                </div>
                

            </div>
            
        );
    }

}


export default SoundChannel;
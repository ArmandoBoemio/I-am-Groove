import { Component } from "react";
import './SoundChannel.css';
import SoundControl from './SoundControl'

class SoundChannel extends Component{
    
    constructor(props){
        super(props);

        this.state={}
    }

    render(){
        

        return (

            <div className="container">
                
                <div className="panel">

                    <div className="texto">
                        Sound #{this.props.id+1}
                    </div>

                    <div className="barra">
                        ___________________________
                    </div>

                    <div className="Controls">
                        <SoundControl id={this.props.id}>
                        </SoundControl>
                    </div>
                    
                </div>

            </div>
            
        );
    }

}


export default SoundChannel;
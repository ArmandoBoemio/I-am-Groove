import { Component } from "react";
import './SoundChannel.css';
import SoundControl from './SoundControl'

class SoundChannel extends Component{
    
    

    render(){
        

        return (
            <div className="container">

                <div className="texto">
                    ___________________________
                </div>

                <div className="Controls">
                    <SoundControl>
                    </SoundControl>
                </div>
                    

            </div>
            
        );
    }

}


export default SoundChannel;
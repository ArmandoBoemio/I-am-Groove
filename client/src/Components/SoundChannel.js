import { Component } from "react";
import './SoundChannel.css';
import SoundControl from './SoundControl';
import Cell from "./SingleCell";


class SoundChannel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nCells: 16,
            pattern: [],
            isDefaultAudio: true,
            isPlaying: false,
            count: 0
        }
    }


    componentDidMount() {
        this.setState({
            pattern: Array.from(this.props.pattern).slice(this.props.rowdim * this.props.id, this.props.rowdim * (this.props.id + 1)),
            isPlaying: this.props.isPlaying,
            count: this.props.count,
            isDefaultAudio: true,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.pattern !== this.props.pattern) {
            this.setState({
                pattern: Array.from(this.props.pattern).slice(this.props.rowdim * this.props.id, this.props.rowdim * (this.props.id + 1)),
            })
            // setTimeout(() => {console.log(this.state.pattern)}, 100)     //debug
        }
        if (prevState.isPlaying !== this.props.isPlaying) {
            this.setState({
                isPlaying: this.props.isPlaying
            })
        }
        if (prevProps.count !== this.props.count) {
            this.setState({
                count: this.props.count
            })
        }
    }

    //function for soundcontrol, child component 
    swapSource = (record) => {
        if (record) {
            console.log('Recording ended, forcing isDefaultAudio to false')
            this.setState(state => ({
                isDefaultAudio: false
            }));
        } else if (!this.state.isDefaultAudio) {
            console.log('Default audio');
        } else if (this.state.isDefaultAudio) {
            console.log('User recorded audio');
        }
        if (!record) {
            this.setState(state => ({
                isDefaultAudio: !state.isDefaultAudio
            }));
        }
        // setTimeout(() => {console.log('default audio: '+ this.state.isDefaultAudio)}, 10)
    }


    render() {
        let nCells = this.props.rowdim
        nCells = Array.from(Array(nCells).keys());

        return (

            <div className="container">

                <div className="panel">

                    <div className="texto">
                        
                        {this.props.id +1 == 1 && (
                            <div>
                                Sound #{this.props.id + 1} - kick
                            </div>
                        )}

                        {this.props.id +1 == 2 && (
                            <div>
                                Sound #{this.props.id + 1} - snare
                            </div>
                        )}

                        {this.props.id +1 == 3 && (
                            <div>
                                Sound #{this.props.id + 1} - hi hat
                            </div>
                        )}

                        {this.props.id +1 == 4 && (
                            <div>
                                Sound #{this.props.id + 1} - cowbell
                            </div>
                        )}
                     
                    </div>

                    <div className="barra">
                        -
                    </div>

                    <div className="Controls">
                        <SoundControl id={this.props.id} isDefaultAudio={this.state.isDefaultAudio} swapSource={this.swapSource}>
                        </SoundControl>
                    </div>

                </div>

                <div className="gridContainer">

                    {nCells.map((key) =>
                        <Cell key={key} idCell={key+1} idChannel={this.props.id + 1}
                            nCells={this.props.rowdim} activity={this.state.pattern[key]}
                            isPlaying={this.state.isPlaying} count={this.state.count}
                            isDefaultAudio={this.state.isDefaultAudio}
                            newGeneration={this.props.newGeneration}>
                            {this.props.id}
                        </Cell>
                    )}


                </div>


            </div>

        );
    }

}


export default SoundChannel;
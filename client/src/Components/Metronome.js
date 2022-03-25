import React, { Component } from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';
import Slider from './Slider';

class Metronome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: false,
            count: 0,
            bpm: 120,
            beatsPerMeasure: 4,
            taps: [],
            calculatedTaps: [],
            checkTapTempo: false,
            stopTapId: 0,
        };

        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }

    
  

    handleBpmChange = event => {
        const bpm = event.target.value;
        if (this.state.playing) {
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

            this.setState({
                count: 0,
                bpm
            });
        } else {
            this.setState({ bpm })
        }
    }

    playClick = () => {
        if(this.props.beatsPerMeasure){
        this.setState({beatsPerMeasure: this.props.beatsPerMeasure});
        }
        const { count, beatsPerMeasure } = this.state;
        if (count % beatsPerMeasure === 0) {
            this.click2.play();
        } else {
            this.click1.play();
        }

        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        }));
    }

    //This handles the tap tempo
    handleTapTempo = () => {
        var { taps } = this.state;
        
        if (taps.length === 0) {
            let time = new Date();
            taps[0] = time.getTime();
        } else {
            let time = new Date();
            taps.push(time.getTime());
        }

        
        if(this.state.checkTapTempo===false){
            this.setState({checkTapTempo: true})
            this.setState({stopTapId: setInterval(this.runStopTempo,500) })
        }
       
    }

    runStopTempo= () =>{
        var { taps,stopTapId } = this.state;
        let currTime=new Date();
        if(Math.abs(taps[taps.length-1]-currTime.getTime())>1200){
            console.log(Math.abs((taps[taps.length-1]-currTime.getTime())/1000));
            clearInterval(stopTapId);
            this.setState({checkTapTempo: false})
            console.log('controllo');
            this.stopTapTempo()
            if(this.state.playing){
                this.startStop();
                this.startStop()}
                else{
                this.startStop()
            }
        }
    }
    //This will stop tap tempo and calculate BPM
    stopTapTempo = () => {
        var { taps, i, calculatedTaps, bpm } = this.state;
        let numTaps = taps.length - 1;
        let newTapIndex = 0;
        if (numTaps <= 1) {
            console.log("Not enough taps!")
        } else {
            for (i=numTaps; i >= 0; i--) {
                if (i>0) {
                    calculatedTaps[newTapIndex] = taps[i] - taps[i-1];
                    newTapIndex++;
                };
            };
            var tapSum = 0;
            for( var j = 0; j < calculatedTaps.length; j++ ){
                tapSum += parseInt( calculatedTaps[j], 10 ); //don't forget to add the base
            }

            var avgOfTaps = tapSum/calculatedTaps.length;
            bpm = 60000 / avgOfTaps;
            if(bpm>250){bpm=250; alert('Too fast with that finger maaan...\nThe maximum value for BPM is 250')}
            if(bpm<50){bpm=50; alert('Too slow with that finger maaan...\nThe minimum value for BPM is 50')}
            bpm=bpm.toFixed(2);
            this.setState({ bpm });
            taps.length = 0;
            calculatedTaps.length = 0;
        }
        
    }
            

    

    startStop = () => {
        if (this.state.playing) {
            //Stops the timer
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        } else {
            //Start timer with current BPM
            this.timer = setInterval(
                this.playClick,
                (60 / this.state.bpm) * 1000
            );
            this.setState(
                {
                    count: 0,
                    playing: true
                },
                this.playClick
            );
        }
    };


    handleWheel=(event)=>{
        const delta =event.deltaY;
        if(this.state.bpm>50 && this.state.bpm<250){
            if (delta > 0) {
                this.setState({bpm: parseInt(this.state.bpm) - 1 })
            } else {
                if (parseInt(this.state.bpm) > 0) {
                    this.setState({bpm: parseInt(this.state.bpm) + 1 })
                }
            }
        }

        if(this.state.bpm === 50){
            if(delta<0){
                this.setState({bpm: parseInt(this.state.bpm) + 1 });
            }
        }
        if(this.state.bpm === 250){
            if(delta>0){
                this.setState({bpm: parseInt(this.state.bpm) - 1 });
            }
        }

    }  

    render() {
        const { playing, bpm } = this.state;

        return (

            <div className="metronome">
                
                <div className="bpm-slider">

                    <div className="titleMetronome">
                        BPM
                    </div>

                    <Slider 
                        bpm={this.state.bpm} 
                        type={'bpm_type'}
                        handleBpmChange={this.handleBpmChange} 
                        handleWheel={this.handleWheel}>
                    </Slider>

                    
                    {/*<input 
                        type="range" 
                        min="50" 
                        max="250" 
                        value={bpm}
                        onChange={this.handleBpmChange} 
                        onWheel={this.handleWheel}
                        className="inputBpm"
                    />

                    <div className="bub">
                        {bpm}
                    </div>*/}

                </div>               
                
                <button onClick={this.startStop}>
                    {playing ? 'Stop' : 'Start'}
                </button>

                <button 
                    onClick={this.handleTapTempo}>Tap
                </button>
               
            </div>
            
        );
    }
}

export default Metronome;
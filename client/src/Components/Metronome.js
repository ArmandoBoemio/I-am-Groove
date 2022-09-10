import React, { Component } from 'react';
import './Metronome.css';
import click1 from './sounds/click1.mp3';
import click2 from './sounds/click2.mp3';
import Slider from './Slider';

class Metronome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: false,
            count: 0,
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
            }, () => this.props.onChange(bpm));
        } else {
            this.props.onChange(bpm)
        }

    }

    playClick = () => {
        const { beatsPerMeasure } = this.props;
        const { count } = this.state;
        if (count % beatsPerMeasure === 0) {
            this.click2.play();
        } else {
            this.click1.play();
        }

        this.setState({
            count: (this.state.count + 1) % this.props.beatsPerMeasure
        });
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


        if (this.state.checkTapTempo === false) {
            this.setState({ checkTapTempo: true })
            this.setState({ stopTapId: setInterval(this.runStopTempo, 200) })
        }

    }

    runStopTempo = () => {
        var { taps, stopTapId } = this.state;
        let currTime = new Date();
        if (Math.abs(taps[taps.length - 1] - currTime.getTime()) > 1200) {
            console.log(Math.abs((taps[taps.length - 1] - currTime.getTime()) / 1000));
            clearInterval(stopTapId);
            this.setState({ checkTapTempo: false })
            this.stopTapTempo()
            if (this.state.playing) {
                this.startStop();
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
            for (i = numTaps; i >= 0; i--) {
                if (i > 0) {
                    calculatedTaps[newTapIndex] = taps[i] - taps[i - 1];
                    newTapIndex++;
                };
            };
            var tapSum = 0;
            for (var j = 0; j < calculatedTaps.length; j++) {
                tapSum += parseInt(calculatedTaps[j], 10); //don't forget to add the base
            }

            var avgOfTaps = tapSum / calculatedTaps.length;
            bpm = 60000 / avgOfTaps;
            if (bpm > 180) { bpm = 180; alert('Too fast with that finger maaan...\nThe maximum value for BPM is 180') }
            if (bpm < 20) { bpm = 20; alert('Too slow with that finger maaan...\nThe minimum value for BPM is 20') }
            bpm = bpm.toFixed(2);
            this.props.onChange(bpm)
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
                (60 / this.props.bpm) * 1000
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

    checkIfLastWheel = (timeLastWheel, interval) => {
        let time = new Date();
        console.log(time.getTime() - timeLastWheel)
        if (time.getTime() - timeLastWheel > 1000) {

            this.startStop()
            clearInterval(interval)
        }
    }

    handleWheel = (event) => {
        const delta = event.deltaY;

        if (this.props.bpm > 20 && this.props.bpm < 180) {
            if (delta > 0) {
                this.props.onChange(this.props.bpm - 1)
            } else {
                if (parseInt(this.props.bpm) > 0) {
                    this.props.onChange(this.props.bpm + 1)

                }
            }
        }

        if (this.props.bpm === 20) {
            if (delta < 0) {
                this.props.onChange(this.props.bpm + 1)
            }
        }
        if (this.props.bpm === 180) {
            if (delta > 0) {
                this.props.onChange(this.props.bpm - 1)

            }

        }
        if (this.state.playing === true) {
            this.startStop()
            let time = new Date();

            let interval = setInterval(() => { this.checkIfLastWheel(time.getTime(), interval) }, 200);
        }
    }

    render() {
        const { playing } = this.state;

        return (

            <div className="metronome">

                <div className="bpm-slider">

                    <div className="titleMetronome">
                        BPM
                    </div>

                    <Slider
                        bpm={this.props.bpm}
                        type={'bpm_type'}
                        handleBpmChange={this.handleBpmChange}
                        handleWheel={this.handleWheel}>
                    </Slider>

                </div>

                <button
                    onClick={this.startStop}>
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
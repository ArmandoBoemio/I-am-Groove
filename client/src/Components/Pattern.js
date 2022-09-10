import { Component } from "react";

class Pattern extends Component {
    

    render(){
    const {pattern}=this.props
    return (
        
        <div className="pattern">
            <header className ="pattern-header">
                <p>{pattern.Pattern_kick}</p>
                <p>{pattern.Pattern_snare}</p>
                <p>{pattern.Pattern_hh}</p>
                <p>{pattern.Pattern_tom}</p>

            </header>
        </div>
    )
    }
}

export default Pattern;
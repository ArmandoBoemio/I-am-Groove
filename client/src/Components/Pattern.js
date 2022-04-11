import { Component } from "react";

class Pattern extends Component {
    

// function Pattern() {


//     const [data, setdata] = useState({
//             pattern_kick: "",
//             pattern_snare: "",
//             pattern_hh: "",
//             pattern_tom: "",
//         });


//     const fetchData = () => {
//         fetch("/pattern")
//         .then(response => {
//             return response.json()
//         })
//         .then(data => {
//             setdata({
//                     pattern_kick: data.Pattern_kick,
//                     pattern_snare: data.Pattern_snare,
//                     pattern_hh: data.Pattern_hh,
//                     pattern_tom: data.Pattern_tom,
//             })
//             console.log(data)
//             console.log(typeof(parseInt(data.Pattern_hh)))
//         }
//         )
//     }



    render(){
    const {pattern}=this.props
    return (
        
        <div className="pattern">
            <header className ="pattern-header">
                <p>{pattern.Pattern_kick}</p>
                <p>{pattern.Pattern_snare}</p>
                <p>{pattern.Pattern_hh}</p>
                <p>{pattern.Pattern_tom}</p>


                {/* // <p>{data.pattern_kick}</p>
                // <p>{data.pattern_snare}</p>
                // <p>{data.pattern_hh}</p>
                // <p>{data.pattern_tom}</p> */}

            </header>
        </div>
    )
    }
}

export default Pattern;
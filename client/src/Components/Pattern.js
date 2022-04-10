import React, {useEffect, useState} from "react";

function Pattern() {
    const [data, setdata] = useState({
        pattern_kick:"",
        pattern_snare:"",
        pattern_hh:"",
        pattern_tom:"",
    });

    useEffect(() => {
        fetch("/pattern").then((res) =>
            res.json().then((data) => {
                setdata({
                    pattern_kick: data.Pattern_kick,
                    pattern_snare: data.Pattern_snare,
                    pattern_hh: data.Pattern_hh,
                    pattern_tom: data.Pattern_tom,
                });
            })
        );
    }, []);

    return (
        <div className="pattern">
            <header className ="pattern-header">
                <p>{data.pattern_kick}</p>
                <p>{data.pattern_snare}</p>
                <p>{data.pattern_hh}</p>
                <p>{data.pattern_tom}</p>
            </header>
        </div>
    )

}

export default Pattern;
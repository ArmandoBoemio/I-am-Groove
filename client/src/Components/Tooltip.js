import React, { useState } from "react";
import "./Tooltip.css";

const Tooltip = () => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, 100);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="Tooltip-Wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
        <button className='infoButton'>
            ?
        </button> 

      {active && (
        <div className={`Tooltip-Tip`}>
          <h1 className="title">You are groove!</h1>
          <span><h>Record your own sounds</h> directly from your microphone and generate your super personal drum pattern!</span><br /><br />
          <span>Choose the <h>time signature</h>, the <h>bpm</h>, the <h>complexity</h>, introduce some element of surprise 
              with the <h>Automatic Pattern Modulation</h> and you're ready to go!  </span><br /><br />
          <span>Enjoy your groove!</span>
          
        </div>
      )}
    </div>
  );
};

export default Tooltip;
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
          <span><text>Record your own sounds</text> directly from your microphone and generate your super personal drum pattern!</span><br /><br />
          <span>Choose the <text>time signature</text>, the <text>bpm</text>, the <text>complexity</text>, introduce some element of surprise 
              with the <text>Automatic Pattern Modulation</text> and you're ready to go!  </span><br /><br />
          <span>Enjoy your groove!</span>
          
        </div>
      )}
    </div>
  );
};

export default Tooltip;
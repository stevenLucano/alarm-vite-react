import React from "react";
import "./styles.scss";

const Timer = ({ nameTimer, timeValue }) => {
  return (
    <div>
      <p id="timer-label">{nameTimer}</p>
      <p id="time-left">{timeValue}</p>
    </div>
  );
};

export default Timer;

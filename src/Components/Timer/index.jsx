import React from "react";
import "./styles.scss";

const Timer = ({ timeValue }) => {
  return (
    <div>
      <p id="timer-label">Session</p>
      <p id="time-left">{timeValue}</p>
    </div>
  );
};

export default Timer;

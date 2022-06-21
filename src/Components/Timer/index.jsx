import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./styles.scss";

const Timer = ({ nameTimer, timeValue, percentageSec, colorFill }) => {
  return (
    <div className="timer">
      <p id="timer-label" style={{ color: colorFill }}>
        {nameTimer}
      </p>
      <CircularProgressbarWithChildren
        value={percentageSec}
        styles={buildStyles({
          pathColor: colorFill,
          trailColor: "rgba(255,255,255,0.2)",
          pathTransition: "1s",
        })}
      >
        <div id="time-left" style={{ color: colorFill }}>
          {timeValue}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default Timer;

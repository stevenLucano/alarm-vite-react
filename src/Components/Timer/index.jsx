import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./styles.scss";

const Timer = ({ nameTimer, timeValue, percentageSec, colorFill }) => {
  // const textTimer = document.getElementById("time-left");
  // textTimer.style.setProperty("--color", colorFill);

  return (
    <div className="timer">
      <p id="timer-label">{nameTimer}</p>
      {/* <p id="time-left">{timeValue}</p> */}
      <CircularProgressbarWithChildren
        value={percentageSec}
        styles={buildStyles({
          textColor: colorFill,
          pathColor: colorFill,
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

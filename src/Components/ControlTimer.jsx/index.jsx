import React from "react";
import IconDown from "../../Icons/IconDown";
import IconUp from "../../Icons/IconUp";
import "./styles.scss";

const ControlTimer = ({ name, defaultValue, fnc }) => {
  return (
    <div className="controller">
      <p id={`${name}-label`}>{name}</p>
      <div className="buttons">
        <div id={`${name}-decrement`} onClick={() => fnc(name, "down")}>
          <IconDown fill="#000" width={40} height={40} />
        </div>
        <div id={`${name}-length`}>{defaultValue}</div>
        <div id={`${name}-increment`} onClick={() => fnc(name, "up")}>
          <IconUp fill="#000" width={40} height={40} />
        </div>
      </div>
    </div>
  );
};

export default ControlTimer;

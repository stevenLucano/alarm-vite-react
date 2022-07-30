import React, { useEffect, useState } from "react";
import IconDown from "../../Icons/IconDown";
import IconUp from "../../Icons/IconUp";
import "./styles.scss";

const ControlTimer = ({ name, defaultValue, fnc }) => {
  const [colors, setColors] = useState([
    "rgba(255,255,255,0.3)",
    "rgba(255, 255, 255, 0.3)",
  ]);

  const changeColor = (btnChoose) => {
    if (btnChoose === "up") {
      setColors(["rgba(255,255,255,0.3)", "rgba(255, 255, 255, 1)"]);
    } else if (btnChoose === "down") {
      setColors(["rgba(255,255,255,1)", "rgba(255, 255, 255, 0.3)"]);
    } else {
      setColors(["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.3)"]);
    }
  };

  return (
    <div className="controller">
      <p id={`${name}-label`}>{name}</p>
      <div className="buttons">
        <a
          className="btn"
          id={`${name}-decrement`}
          onClick={() => fnc(name, "down")}
          onMouseEnter={() => changeColor("down")}
          onMouseLeave={() => changeColor("leave")}
          href="#"
        >
          <span>
            <IconDown fill={colors[0]} width={40} height={40} />
          </span>
        </a>
        <div className="display" id={`${name}-length`}>
          {defaultValue}
        </div>
        <a
          className="btn"
          id={`${name}-increment`}
          onClick={() => fnc(name, "up")}
          onMouseEnter={() => changeColor("up")}
          onMouseLeave={() => changeColor("leave")}
          href="#"
        >
          <span>
            <IconUp fill={colors[1]} width={40} height={40} />
          </span>
        </a>
        {/* <a
          className="btnControl"
          id={`${name}-decrement`}
          onClick={() => fnc(name, "down")}
          onMouseEnter={() => changeColor("down")}
          onMouseLeave={() => changeColor("leave")}
          href="#"
        >
          <span>x</span>
          <IconDown fill={colors[0]} width={40} height={40} />
        </a>
        <div className="display" id={`${name}-length`}>
          {defaultValue}
        </div>
        <div
          className="btnControl"
          id={`${name}-increment`}
          onClick={() => fnc(name, "up")}
          onMouseEnter={() => changeColor("up")}
          onMouseLeave={() => changeColor("leave")}
        >
          <span></span>
          <IconUp fill={colors[1]} width={40} height={40} />
        </div> */}
      </div>
    </div>
  );
};

export default ControlTimer;

import { useState } from "react";
import "./App.css";
import Timer from "./Components/Timer";
import IconPlay from "./Icons/IconPlay";
import IconPause from "./Icons/IconPause";
import IconReset from "./Icons/IconReset";

import worker_script from "./Workers/countdown";
import ControlTimer from "./Components/ControlTimer.jsx";

const myWorker = new Worker(worker_script);

function App() {
  const [breakControl, setBreakControl] = useState(5);
  const [sessionControl, setSessionControl] = useState(25);
  const [timeSeconds, setTimeSeconds] = useState(5);
  const [timeAlarm, setTimeAlarm] = useState({ m: "00", s: "00" });
  const [isPaused, setIsPaused] = useState(true);

  myWorker.onmessage = (m) => {
    const min = Math.floor(m.data / 60);
    const seg = m.data % 60;
    if (m.data > 0) {
      setTimeSeconds(m.data);
      setTimeAlarm({
        m: min < 10 ? "0" + min : min,
        s: seg < 10 ? "0" + seg : seg,
      });
    } else {
      if (!isPaused) {
        console.log("Tiempo cumplido");
        myWorker.postMessage("Stop,0");
        setIsPaused(true);
        setTimeSeconds(0);
        setTimeAlarm({
          m: "00",
          s: "00",
        });
      }
    }
  };

  const changeState = () => {
    const message = isPaused ? "Start" : "Stop";
    setIsPaused(!isPaused);
    //Send message to web worker
    myWorker.postMessage(message + "," + timeSeconds);
  };

  const reset = () => {
    // setBreakControl(5);
    // setSessionControl(25);
    setTimeSeconds(25 * 60); // m -> s -> 10ms
    setTimeAlarm({ m: "25", s: "00" });
  };

  const changeControl = (controller, change) => {
    switch (controller) {
      case "break":
        if (change === "up") {
          setBreakControl(breakControl + 1);
        } else {
          setBreakControl(breakControl - 1);
        }
        break;

      case "session":
        if (change === "up") {
          setSessionControl(sessionControl + 1);
        } else {
          setSessionControl(sessionControl - 1);
        }
        break;
    }
  };

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="controllers">
        <ControlTimer
          name="break"
          defaultValue={breakControl}
          fnc={changeControl}
        />
        <ControlTimer
          name="session"
          defaultValue={sessionControl}
          fnc={changeControl}
        />
      </div>
      <Timer timeValue={timeAlarm.m + ":" + timeAlarm.s} />
      <div className="timer-control">
        <div id="start_stop" onClick={changeState}>
          {isPaused ? (
            <IconPlay id="i-play" fill="#000" width={40} height={40} />
          ) : (
            <IconPause id="i-pause" fill="#000" width={40} height={40} />
          )}
        </div>
        <div id="reset" onClick={() => reset()}>
          <IconReset fill="#000" width={40} height={40} />
        </div>
      </div>
      {/* <p>{timeAlarm.m + ":" + timeAlarm.s}</p> */}
      {/* <button onClick={() => sendMessage(isPaused ? "Start" : "Stop")}>
        {isPaused ? "Start" : "Stop"}
      </button> */}
    </div>
  );
}

export default App;

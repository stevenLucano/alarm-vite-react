import { useEffect, useState } from "react";
import "./App.css";
import Timer from "./Components/Timer";
import IconPlay from "./Icons/IconPlay";
import IconPause from "./Icons/IconPause";
import IconReset from "./Icons/IconReset";

import worker_script from "./Workers/countdown";
import ControlTimer from "./Components/ControlTimer.jsx";
let myWorker = new Worker(worker_script);

function App() {
  const [breakControl, setBreakControl] = useState(5);
  const [sessionControl, setSessionControl] = useState(25);
  const [timeSeconds, setTimeSeconds] = useState(25 * 60);
  const [timeAlarm, setTimeAlarm] = useState({ m: "25", s: "00" });
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("Session");

  const createWorker = () => {
    myWorker = new Worker(worker_script);

    myWorker.onmessage = (m) => {
      const min = Math.floor(m.data / 60);
      const seg = m.data % 60;
      // console.log(m.data);
      if (m.data > -1) {
        setTimeSeconds(m.data);
        setTimeAlarm({
          m: min < 10 ? "0" + min : min,
          s: seg < 10 ? "0" + seg : seg,
        });
      } else if (m.data == -1) {
        mode === "Session" ? setMode("Break") : setMode("Session");
      }
    };
  };

  const changeState = () => {
    const message = isPaused ? "Start" : "Stop";
    setIsPaused(!isPaused);
    //Send message to web worker
    if (message === "Stop") {
      myWorker.postMessage(message + "," + timeSeconds);
      myWorker.terminate();
    } else {
      createWorker();
      myWorker.postMessage(message + "," + timeSeconds);
    }
  };

  const reset = () => {
    setIsPaused(true);
    setBreakControl(5);
    setSessionControl(25);
    setTimeSeconds(25 * 60); // m -> s -> 10ms
    setTimeAlarm({ m: "25", s: "00" });
    setMode("Session");
    myWorker.postMessage("Stop,1500");
    myWorker.terminate();
  };

  const changeControl = (controller, change) => {
    if (isPaused) {
      // let newMin = 0;
      // if (mode === "Break") {
      //   newMin = breakControl;
      // } else {
      //   newMin = sessionControl;
      // }
      // let newSec = 0;

      switch (controller) {
        case "break":
          if (change === "up") {
            if (breakControl < 60) {
              setBreakControl(breakControl + 1);
              // if (mode === "break") {
              //   newMin = breakControl;
              //   newMin++;
              // }
            }
          } else {
            if (breakControl > 1) {
              setBreakControl(breakControl - 1);
              // if (mode === "break") {
              //   newMin--;
              // }
            }
          }
          break;

        case "session":
          if (change === "up") {
            if (sessionControl < 60) {
              setSessionControl(sessionControl + 1);
              // if (mode === "session") {
              //   newMin++;
              // }
            }
          } else {
            if (sessionControl > 1) {
              setSessionControl(sessionControl - 1);
              // if (mode === "session") {
              //   newMin--;
              // }
            }
          }
          // setTimeSeconds(newMin * 60);
          break;
      }

      // if (timeAlarm.m !== "01") {
      //   if (newMin < 10) newMin = "0" + newMin;
      // } else {
      //   if (newMin == 1) {
      //     newMin = "01";
      //   } else if (newMin < 10) {
      //     newMin = "0" + newMin;
      //   }
      // }

      // setTimeAlarm({
      //   m: newMin,
      //   s: newSec < 10 ? "0" + newSec : newSec,
      // });
    }
  };

  useEffect(() => {
    if (!isPaused) {
      myWorker.terminate();
      if (mode === "Session") {
        createWorker();
        myWorker.postMessage("Start," + sessionControl * 60);
      } else {
        createWorker();
        myWorker.postMessage("Start," + breakControl * 60);
      }
    }
  }, [mode]);

  useEffect(() => {
    let newMin = 0;
    if (mode === "Session") {
      newMin = sessionControl;

      if (timeAlarm.m !== "01") {
        if (newMin < 10) newMin = "0" + newMin;
      } else {
        if (newMin == 1) {
          newMin = "01";
        } else if (newMin < 10) {
          newMin = "0" + newMin;
        }
      }

      setTimeAlarm({
        m: newMin,
        s: "00",
      });
    } else {
      newMin = breakControl;
      // newMin = newMin < 10 ? "0" + newMin : newMin.toString();

      if (timeAlarm.m !== "01") {
        if (newMin < 10) newMin = "0" + newMin;
      } else {
        if (newMin == 1) {
          newMin = "01";
        } else if (newMin < 10) {
          newMin = "0" + newMin;
        }
      }

      setTimeAlarm({
        m: newMin,
        s: "00",
      });
    }
    setTimeSeconds(newMin * 60);
  }, [breakControl, sessionControl]);

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
      <Timer nameTimer={mode} timeValue={timeAlarm.m + ":" + timeAlarm.s} />
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

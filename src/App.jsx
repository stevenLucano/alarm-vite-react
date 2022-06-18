import { useState } from "react";
import "./App.css";
import Timer from "./Components/Timer";
import worker_script from "./Workers/countdown";

const myWorker = new Worker(worker_script);

function App() {
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

  const sendMessage = (mess) => {
    setIsPaused(!isPaused);
    myWorker.postMessage(mess + "," + timeSeconds);
  };

  return (
    <div className="content">
      <h2>Counter with web-worker:</h2>
      <Timer timeValue={timeAlarm.m + ":" + timeAlarm.s} />
      {/* <p>{timeAlarm.m + ":" + timeAlarm.s}</p> */}
      <button onClick={() => sendMessage(isPaused ? "Start" : "Stop")}>
        {isPaused ? "Start" : "Stop"}
      </button>
    </div>
  );
}

export default App;

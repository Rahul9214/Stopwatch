import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timerID;

    if (isRunning) {
      timerID = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerID);
    }

    // Cleanup the interval on unmount
    return () => clearInterval(timerID);
  }, [isRunning]);

  // Function to start or stop the stopwatch
  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  // Function to reset the stopwatch
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  // Function to Format the time in mm:ss Format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <p>Time: {formatTime(time)}</p>
      <button onClick={handleStartStop}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

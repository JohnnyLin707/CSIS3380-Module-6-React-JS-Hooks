const { useState, useRef } = React;

function App() {
  const [tenths, setTenths] = useState(0);
  const [running, setRunning] = useState(false);

  // The interval id is needed later, to stop the timer, but is never shown:
  // a perfect job for a ref.
  const intervalRef = useRef(null);

  const start = () => {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTenths((t) => t + 1);
    }, 100);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTenths(0);
  };

  return (
    <>
      <p className="big">{(tenths / 10).toFixed(1)} s</p>
      <div className="row">
        <button onClick={start} disabled={running}>Start</button>
        <button onClick={stop} disabled={!running}>Stop</button>
        <button className="secondary" onClick={reset}>Reset</button>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

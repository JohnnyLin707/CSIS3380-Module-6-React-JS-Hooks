const { useState } = React;

function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [log, setLog] = useState([]);

  function record(entry) {
    setLog((l) => [...l, entry]);
  }

  return (
    <main className="card">
      <h1>React App via CDN</h1>
      <p>No build step needed. This runs directly in the browser.</p>
      <div className="count">{count}</div>
      <label className="step">
        Step size
        <input
          type="number"
          min="1"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
      </label>
      <div className="actions">
        <button onClick={() => { setCount((c) => c + step); record(`+${step}`); }}>Increment</button>
        <button onClick={() => { setCount((c) => c - step); record(`-${step}`); }}>Decrement</button>
        <button onClick={() => { setCount(0); record("reset"); }}>Reset</button>
        <button onClick={() => setLog([])}>Clear log</button>
      </div>
      <p className="log-title">{log.length} clicks</p>
      <ul className="log">
        {log.map((entry, i) => (
          <li key={i}>{entry}</li>
        ))}
      </ul>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

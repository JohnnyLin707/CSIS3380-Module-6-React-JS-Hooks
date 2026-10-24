const { useState } = React;

function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  console.log("App rendered, count =", count, "step =", step);

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
        <button onClick={() => setCount((c) => c + step)}>Increment</button>
        <button onClick={() => setCount((c) => c - step)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

const { useState } = React;

function App() {
  const [count, setCount] = useState(0);
  console.log("App rendered, count =", count);

  return (
    <main className="card">
      <h1>React App via CDN</h1>
      <p>No build step needed. This runs directly in the browser.</p>
      <div className="count">{count}</div>
      <div className="actions">
        <button onClick={() => setCount((c) => c + 1)}>Increment</button>
        <button onClick={() => setCount((c) => c - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button
          onClick={() => {
            setCount((c) => c + 1);
            setCount((c) => c + 1);
            setCount((c) => c + 1);
          }}
        >
          +3
        </button>
      </div>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

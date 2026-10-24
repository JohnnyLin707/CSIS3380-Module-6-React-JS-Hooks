const { useState, useMemo } = React;

// Pretends to be expensive: it keeps the computer busy for about 300 ms
function slowDouble(num) {
  const start = performance.now();
  while (performance.now() - start < 300) {
    // busy waiting, on purpose
  }
  return num * 2;
}

function WithoutMemo() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  console.log('WithoutMemo: calculating…');
  const doubled = slowDouble(count);          // runs on EVERY render

  return (
    <div className="panel">
      <h2>Without useMemo</h2>
      <p>count {count} · doubled <strong>{doubled}</strong> · other {other}</p>
      <div className="row">
        <button onClick={() => setCount((c) => c + 1)}>count + 1</button>
        <button className="secondary" onClick={() => setOther((o) => o + 1)}>other + 1</button>
      </div>
    </div>
  );
}

function WithMemo() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  const doubled = useMemo(() => {
    console.log('WithMemo: calculating…');
    return slowDouble(count);                 // runs only when count changes
  }, [count]);

  return (
    <div className="panel">
      <h2>With useMemo</h2>
      <p>count {count} · doubled <strong>{doubled}</strong> · other {other}</p>
      <div className="row">
        <button onClick={() => setCount((c) => c + 1)}>count + 1</button>
        <button className="secondary" onClick={() => setOther((o) => o + 1)}>other + 1</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <WithoutMemo />
      <WithMemo />
      <p className="muted">Click "other + 1" in each panel. One feels slow, one is instant. Check the Console.</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

const { useState, useRef } = React;

function App() {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);

  console.log('App rendered');

  const addToState = () => {
    setStateCount((c) => c + 1);          // React re-renders
  };

  const addToRef = () => {
    refCount.current = refCount.current + 1;   // React does NOT re-render
    console.log('refCount.current is now', refCount.current);
  };

  return (
    <div className="grid-2">
      <div className="panel">
        <h2>useState</h2>
        <p className="big">{stateCount}</p>
        <button onClick={addToState}>State + 1</button>
        <p className="muted">Changing it re-renders the component.</p>
      </div>
      <div className="panel">
        <h2>useRef</h2>
        <p className="big">{refCount.current}</p>
        <button className="secondary" onClick={addToRef}>Ref + 1</button>
        <p className="muted">Changing it does not re-render. The number only catches up on the next render.</p>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

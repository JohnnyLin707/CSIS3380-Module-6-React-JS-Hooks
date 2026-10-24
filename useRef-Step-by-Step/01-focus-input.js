const { useRef, useEffect } = React;

function App() {
  // 1. Create a ref. React fills inputRef.current with the <input> element.
  const inputRef = useRef(null);

  // Put the cursor in the box as soon as the page has rendered
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const handleSelect = () => {
    inputRef.current.select();
  };

  return (
    <>
      {/* 2. Attach the ref to an element with the ref attribute */}
      <input ref={inputRef} type="text" defaultValue="Hello, refs!" />

      <div className="row">
        <button onClick={handleFocus}>Focus the box</button>
        <button className="secondary" onClick={handleSelect}>Select all the text</button>
      </div>
      <p className="muted">Click somewhere else on the page first, then try the buttons.</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

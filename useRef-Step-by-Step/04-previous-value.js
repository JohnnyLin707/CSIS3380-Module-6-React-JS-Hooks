const { useState, useRef, useEffect } = React;

function App() {
  const [text, setText] = useState('');
  const previousText = useRef('');

  // Runs after each render: remember this render's value for the next one
  useEffect(() => {
    previousText.current = text;
  }, [text]);

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something…"
      />
      <ul className="list">
        <li>Current: <strong>{text || '(empty)'}</strong></li>
        <li>Previous: <strong>{previousText.current || '(empty)'}</strong></li>
      </ul>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

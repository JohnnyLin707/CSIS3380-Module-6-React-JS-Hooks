const { useRef, forwardRef } = React;

// A reusable input component. forwardRef lets a parent's ref reach the <input> inside it.
const FancyInput = forwardRef((props, ref) => {
  return (
    <label>
      {props.label}
      <input ref={ref} type="text" placeholder={props.placeholder} />
    </label>
  );
});

function App() {
  const emailRef = useRef(null);

  return (
    <>
      <FancyInput ref={emailRef} label="Email" placeholder="you@example.com" />
      <div className="row">
        <button onClick={() => emailRef.current.focus()}>Focus the email box</button>
      </div>
      <p className="muted">Without forwardRef, ref on a component of your own would not reach the input.</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

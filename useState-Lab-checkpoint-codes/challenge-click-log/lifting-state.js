const { useState } = React;

// ─── Grandchild ───────────────────────────────────────────────
// Has NO state. Calls callbacks it received as props.
function Controls({ onIncrement, onDecrement, onReset, onDouble }) {
  return (
    <div className="component component-controls">
      <span className="tag tag-controls">Controls — grandchild</span>
      <p className="component-desc">
        No state here. Buttons call callbacks passed down as props,
        which ultimately update state two levels up in App.
      </p>
      <div className="props">
        <span className="prop prop-up">onIncrement()</span>
        <span className="prop prop-up">onDecrement()</span>
        <span className="prop prop-up">onReset()</span>
        <span className="prop prop-up">onDouble()</span>
      </div>
      <div className="actions">
        <button onClick={onIncrement}>+ Increment</button>
        <button onClick={onDecrement}>− Decrement</button>
        <button onClick={onReset}>Reset</button>
        <button onClick={onDouble}>× 2 Double</button>
      </div>
    </div>
  );
}

// ─── Child ────────────────────────────────────────────────────
// Has NO state. Receives props from App and forwards them to Controls.
function Counter({ count, onIncrement, onDecrement, onReset, onDouble }) {
  return (
    <div className="component component-counter">
      <span className="tag tag-counter">Counter — child</span>
      <p className="component-desc">
        No state here either. Displays the count it received from App
        and passes the callbacks further down to Controls.
      </p>
      <div className="props">
        <span className="prop prop-down">count = {count}</span>
        <span className="prop prop-down">onIncrement</span>
        <span className="prop prop-down">onDecrement</span>
        <span className="prop prop-down">onReset</span>
        <span className="prop prop-down">onDouble</span>
      </div>

      <div className="arrow">⬇ props flow down ⬇</div>

      <Controls
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onReset={onReset}
        onDouble={onDouble}
      />
    </div>
  );
}

// ─── Parent ───────────────────────────────────────────────────
// Owns the state. Passes value + updater callbacks down the tree.
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="tree">
      <div className="component component-app">
        <span className="tag tag-app">App — parent</span>
        <p className="component-desc">
          State lives here. count and the callbacks are passed down
          as props. When Controls calls a callback, setCount runs here.
        </p>
        <div className="props">
          <span className="prop prop-state">count = {count}</span>
        </div>
        <div className="state-display">{count}</div>

        <div className="arrow">⬇ props flow down ⬇</div>

        <Counter
          count={count}
          onIncrement={() => setCount((c) => c + 1)}
          onDecrement={() => setCount((c) => c - 1)}
          onReset={() => setCount(0)}
          onDouble={() => setCount((c) => c * 2)}
        />

        <div className="arrow" style={{ marginTop: "10px" }}>
          ⬆ callbacks bubble back up · state update re-renders the whole tree ⬆
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

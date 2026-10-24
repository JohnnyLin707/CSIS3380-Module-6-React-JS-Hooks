const { useState } = React;

function App() {
  const [user, setUser] = useState('Linus');

  return (
    <>
      <label>
        Name
        <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
      </label>
      <h2 style={{ marginTop: '14px' }}>Hello {user}!</h2>
      <Component2 user={user} />
    </>
  );
}

// Component2 does not use user. It only receives it to pass it on.
function Component2({ user }) {
  return (
    <div className="panel">
      <h2>Component 2</h2>
      <p className="muted">I receive user only to pass it down.</p>
      <Component3 user={user} />
    </div>
  );
}

function Component3({ user }) {
  return (
    <div className="panel">
      <h2>Component 3</h2>
      <p>Hello {user} again!</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

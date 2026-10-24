const { useState, createContext, useContext } = React;

// 1. Create a context
const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState('Linus');

  // 2. Provide a value to everything inside the Provider
  return (
    <UserContext.Provider value={user}>
      <label>
        Name
        <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
      </label>
      <h2 style={{ marginTop: '14px' }}>Hello {user}!</h2>
      <Component2 />
    </UserContext.Provider>
  );
}

// No props any more: Component2 knows nothing about user
function Component2() {
  return (
    <div className="panel">
      <h2>Component 2</h2>
      <p className="muted">No props needed here.</p>
      <Component3 />
    </div>
  );
}

function Component3() {
  // 3. Read the value, however deep this component is
  const user = useContext(UserContext);

  return (
    <div className="panel">
      <h2>Component 3</h2>
      <p>Hello {user} again!</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

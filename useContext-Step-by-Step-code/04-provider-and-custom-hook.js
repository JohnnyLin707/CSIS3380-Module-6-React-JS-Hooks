const { useState, createContext, useContext } = React;

const AuthContext = createContext(null);

// A provider component: it owns the state and wraps whatever is put inside it (children)
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (name) => setUser({ name });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// A custom hook: a shorter, safer way to read the context
function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
}

function LoginBox() {
  const { user, login, logout } = useAuth();

  return user ? (
    <div className="row">
      <span>Signed in as <strong>{user.name}</strong></span>
      <button className="secondary" onClick={logout}>Log out</button>
    </div>
  ) : (
    <div className="row">
      <button onClick={() => login('Ada')}>Log in as Ada</button>
      <button onClick={() => login('Grace')}>Log in as Grace</button>
    </div>
  );
}

function Greeting() {
  const { user } = useAuth();

  return (
    <div className="panel">
      <h2>{user ? `Welcome back, ${user.name}!` : 'Welcome, guest!'}</h2>
      <p className="muted">This component is a sibling of LoginBox, not its child.</p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LoginBox />
      <Greeting />
    </AuthProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

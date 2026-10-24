const { useState, createContext, useContext } = React;

const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  // The value is an object: the current theme AND a way to change it
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Page />
    </ThemeContext.Provider>
  );
}

function Page() {
  return (
    <>
      <Toolbar />
      <Article />
    </>
  );
}

function Toolbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="row">
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </button>
      <span className="muted">Current theme: {theme}</span>
    </div>
  );
}

function Article() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme === 'dark' ? 'panel theme-dark' : 'panel'}>
      <h2>A themed panel</h2>
      <p className="muted">
        Toolbar and Article both read the theme from context. Page, their parent, never touches it.
      </p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

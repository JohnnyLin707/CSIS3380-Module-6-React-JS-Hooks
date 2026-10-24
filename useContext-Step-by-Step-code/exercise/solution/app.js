// Exercise: English / Español (solution)
const { useState, createContext, useContext } = React;

const translations = {
  en: { hello: 'Hello', welcome: 'Welcome to React hooks', goodbye: 'Goodbye', button: 'Español' },
  es: { hello: 'Hola', welcome: 'Bienvenido a los hooks de React', goodbye: 'Adiós', button: 'English' },
};

// 1. The context
const LanguageContext = createContext(null);

// 2. The provider owns the language and shares the matching words
function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage((lang) => (lang === 'en' ? 'es' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, text: translations[language], toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 3. The custom hook
function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === null) {
    throw new Error('useLanguage must be used inside a LanguageProvider');
  }
  return context;
}

// 4. The switcher
function LanguageSwitcher() {
  const { text, toggleLanguage } = useLanguage();
  return <button onClick={toggleLanguage}>{text.button}</button>;
}

// 5. The greeting
function Greeting() {
  const { text } = useLanguage();
  return (
    <div className="panel">
      <h2>{text.hello}!</h2>
      <p>{text.welcome}</p>
      <p className="muted">{text.goodbye}</p>
    </div>
  );
}

// 6. Wrap them in the provider
function App() {
  return (
    <LanguageProvider>
      <LanguageSwitcher />
      <Greeting />
    </LanguageProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

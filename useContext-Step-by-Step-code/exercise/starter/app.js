// Exercise: English / Español
// Name: ______________________
const { useState, createContext, useContext } = React;

const translations = {
  en: { hello: 'Hello', welcome: 'Welcome to React hooks', goodbye: 'Goodbye', button: 'Español' },
  es: { hello: 'Hola', welcome: 'Bienvenido a los hooks de React', goodbye: 'Adiós', button: 'English' },
};

// TODO 1: create a LanguageContext

// TODO 2: write LanguageProvider({ children }). It keeps language ('en' or 'es') in state,
//         and provides { language, text: translations[language], toggleLanguage }.

// TODO 3: write a custom hook, useLanguage(), that reads the context and throws a clear
//         error when it is used outside the provider.

function LanguageSwitcher() {
  // TODO 4: use useLanguage() to get text and toggleLanguage
  return <button>Español</button>;
}

function Greeting() {
  // TODO 5: show text.hello, text.welcome and text.goodbye
  return (
    <div className="panel">
      <h2>Hello!</h2>
      <p>Welcome to React hooks</p>
      <p className="muted">Goodbye</p>
    </div>
  );
}

function App() {
  // TODO 6: wrap both components in your LanguageProvider
  return (
    <>
      <LanguageSwitcher />
      <Greeting />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

import { useState } from 'react';
import Timer from './components/Timer.jsx';
import './App.css';

export default function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <main className="card">
      <h1>Timer, now in Vite</h1>
      {showTimer ? <Timer /> : <p>The timer is hidden.</p>}
      <button onClick={() => setShowTimer((show) => !show)}>
        {showTimer ? 'Hide timer' : 'Show timer'}
      </button>
    </main>
  );
}

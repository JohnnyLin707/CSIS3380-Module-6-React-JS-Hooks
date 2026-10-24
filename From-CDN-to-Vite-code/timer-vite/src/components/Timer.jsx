import { useState, useEffect } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log('Timer started');
    const intervalId = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      console.log('Timer stopped');
    };
  }, []);

  return <p className="big">{seconds} s</p>;
}

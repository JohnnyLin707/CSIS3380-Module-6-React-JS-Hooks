const { useState, useMemo } = React;

// Genuinely expensive for big limits: test every number below the limit
function findPrimes(limit) {
  const primes = [];
  for (let n = 2; n <= limit; n++) {
    let isPrime = true;
    for (let d = 2; d * d <= n; d++) {
      if (n % d === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(n);
  }
  return primes;
}

function App() {
  const [limit, setLimit] = useState(100000);
  const [dark, setDark] = useState(false);

  const primes = useMemo(() => {
    console.log(`Finding primes up to ${limit}…`);
    return findPrimes(limit);
  }, [limit]);

  return (
    <div className={dark ? 'panel theme-dark' : 'panel'}>
      <div className="row">
        <label>
          Find primes up to
          <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
            <option value={1000}>1,000</option>
            <option value={100000}>100,000</option>
            <option value={2000000}>2,000,000</option>
          </select>
        </label>
        <button className="secondary" onClick={() => setDark((d) => !d)}>
          {dark ? 'Light' : 'Dark'} panel
        </button>
      </div>
      <p className="big">{primes.length.toLocaleString()} primes</p>
      <p className="muted">The largest is {primes[primes.length - 1].toLocaleString()}.</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

const { useState, useTransition, memo } = React;

const FRUITS = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'kiwi',
  'lemon', 'mango', 'nectarine', 'orange', 'papaya', 'pear', 'plum', 'raspberry'];
const items = Array.from({ length: 250 }, (_, i) => `${FRUITS[i % FRUITS.length]} ${i + 1}`);

// Keeps the computer busy for a few milliseconds, standing in for real rendering work
function busyFor(ms) {
  const start = performance.now();
  while (performance.now() - start < ms) {
    // nothing, on purpose
  }
}

// Each row is slow to render: 250 rows take about a quarter of a second
function SlowItem({ text }) {
  busyFor(1);
  return <li>{text}</li>;
}

// memo: React skips re-rendering SlowList when its props have not changed
const SlowList = memo(function SlowList({ query }) {
  const visible = items.filter((item) => item.includes(query.toLowerCase()));
  return (
    <ul className="list">
      {visible.map((item) => <SlowItem key={item} text={item} />)}
    </ul>
  );
});

function App() {
  const [query, setQuery] = useState('');           // what is in the box: urgent
  const [listQuery, setListQuery] = useState('');   // what the list shows: can wait
  const [transitionOn, setTransitionOn] = useState(true);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);                     // always urgent
    if (transitionOn) {
      startTransition(() => {
        setListQuery(value);             // marked as "not urgent"
      });
    } else {
      setListQuery(value);               // urgent too: the box waits for the list
    }
  };

  return (
    <>
      <div className="row">
        <input type="search" value={query} onChange={handleChange} placeholder="Type a fruit…" />
        <label>
          <input
            type="checkbox"
            checked={transitionOn}
            onChange={(e) => setTransitionOn(e.target.checked)}
          />
          use startTransition
        </label>
      </div>

      {isPending && <p className="status pending">Updating the list…</p>}
      <div style={{ opacity: isPending ? 0.5 : 1 }}>
        <SlowList query={listQuery} />
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

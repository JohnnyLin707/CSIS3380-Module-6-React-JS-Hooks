// Exercise: Student ranking (solution)
const { useState, useMemo } = React;

const students = [
  { id: 1, name: 'Linus', score: 72 },
  { id: 2, name: 'Ada', score: 95 },
  { id: 3, name: 'Grace', score: 58 },
  { id: 4, name: 'Alan', score: 83 },
  { id: 5, name: 'Margaret', score: 91 },
  { id: 6, name: 'Tim', score: 47 },
  { id: 7, name: 'Barbara', score: 66 },
  { id: 8, name: 'Dennis', score: 79 },
];

function App() {
  const [search, setSearch] = useState('');
  const [passingOnly, setPassingOnly] = useState(false);
  const [clicks, setClicks] = useState(0);   // unrelated state, to test the memo

  const visibleStudents = useMemo(() => {
    console.log('Ranking students…');
    const text = search.toLowerCase();
    return students
      .filter((s) => s.name.toLowerCase().includes(text))
      .filter((s) => (passingOnly ? s.score >= 60 : true))
      .sort((a, b) => b.score - a.score);    // filter() already made a copy
  }, [search, passingOnly]);                  // students never changes, so it is not listed

  return (
    <>
      <div className="row">
        <input
          type="search"
          placeholder="Search by name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={passingOnly}
            onChange={(e) => setPassingOnly(e.target.checked)}
          />
          Passing only
        </label>
        <button className="secondary" onClick={() => setClicks((c) => c + 1)}>
          Unrelated clicks: {clicks}
        </button>
      </div>

      <ul className="list">
        {visibleStudents.map((s, i) => (
          <li key={s.id}>
            {i + 1}. {s.name} · {s.score} {s.score >= 60 && <span className="tag">pass</span>}
          </li>
        ))}
      </ul>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

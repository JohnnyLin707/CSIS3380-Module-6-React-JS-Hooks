// Exercise: Student ranking
// Name: ______________________
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

  // TODO 1: compute visibleStudents with useMemo:
  //   - keep students whose name includes the search text (ignore upper/lower case)
  //   - if passingOnly is ticked, keep only scores of 60 or more
  //   - sort from highest score to lowest (sort a COPY, never the original array)
  //   - console.log('Ranking students…') at the start
  //   - give it the right dependency array
  const visibleStudents = students;

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
        {visibleStudents.map((s) => (
          <li key={s.id}>{s.name} · {s.score}</li>
        ))}
      </ul>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

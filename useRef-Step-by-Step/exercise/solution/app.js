// Exercise: Colour strip (solution)
const { useState, useRef } = React;

const colors = ['#e4572e', '#f3a712', '#a8c686', '#29335c', '#669bbc', '#9b5de5', '#00a6a6', '#f15bb5'];

function App() {
  const [current, setCurrent] = useState(0);

  // 1. One ref holding an array of DOM elements, one per tile
  const tiles = useRef([]);

  // 2. Move to a tile, wrapping around, and scroll it into view
  const goTo = (index) => {
    const next = (index + colors.length) % colors.length;
    setCurrent(next);
    tiles.current[next].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <>
      <div className="row">
        <button onClick={() => goTo(current - 1)}>← Previous</button>
        <button onClick={() => goTo(current + 1)}>Next →</button>
        <span className="muted">Tile {current + 1} of {colors.length}</span>
      </div>

      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '8px 2px' }}>
        {colors.map((color, i) => (
          <div
            key={color}
            // 3. A callback ref: React calls it with the element, and we store it
            ref={(el) => (tiles.current[i] = el)}
            style={{
              flex: '0 0 180px',
              height: '120px',
              borderRadius: '10px',
              background: color,
              outline: i === current ? '4px solid #1f2733' : 'none',
              outlineOffset: '3px',
            }}
          />
        ))}
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

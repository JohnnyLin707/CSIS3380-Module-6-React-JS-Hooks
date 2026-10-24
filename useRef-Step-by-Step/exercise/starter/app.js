// Exercise: Colour strip
// Name: ______________________
const { useState, useRef } = React;

const colors = ['#e4572e', '#f3a712', '#a8c686', '#29335c', '#669bbc', '#9b5de5', '#00a6a6', '#f15bb5'];

function App() {
  const [current, setCurrent] = useState(0);

  // TODO 1: create a ref that holds an ARRAY of tile elements: useRef([])

  // TODO 2: write goTo(index). It should wrap around (after the last tile comes the first),
  //         update current, and scroll that tile into view:
  //         tile.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })

  return (
    <>
      <div className="row">
        <button>← Previous</button>
        <button>Next →</button>
        <span className="muted">Tile {current + 1} of {colors.length}</span>
      </div>

      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '8px 2px' }}>
        {colors.map((color, i) => (
          <div
            key={color}
            // TODO 3: store this element in the array: ref={(el) => (tiles.current[i] = el)}
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

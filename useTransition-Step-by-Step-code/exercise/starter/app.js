// Exercise: A smooth colour slider
// Name: ______________________
const { useState, useTransition, memo } = React;

// Keeps the computer busy for a few milliseconds, standing in for real rendering work
function busyFor(ms) {
  const start = performance.now();
  while (performance.now() - start < ms) {
    // nothing, on purpose
  }
}

function Swatch({ hue, i }) {
  busyFor(0.6);
  const lightness = 35 + (i % 10) * 5;
  return <div style={{ height: '28px', borderRadius: '4px', background: `hsl(${hue} 70% ${lightness}%)` }} />;
}

// 400 slow swatches: about a quarter of a second to repaint
const SlowGrid = memo(function SlowGrid({ hue }) {
  const swatches = [];
  for (let i = 0; i < 400; i++) {
    swatches.push(<Swatch key={i} i={i} hue={hue} />);
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: '4px', marginTop: '12px' }}>
      {swatches}
    </div>
  );
});

function App() {
  const [hue, setHue] = useState(200);

  // TODO 1: split hue into two pieces of state:
  //         sliderHue (what the slider shows: urgent) and gridHue (what the grid shows: can wait)
  // TODO 2: call useTransition(), and update gridHue inside startTransition
  // TODO 3: while isPending, show <p className="status pending">Repainting…</p>

  return (
    <>
      <label>
        Hue {hue}
        <input
          type="range"
          min="0"
          max="360"
          value={hue}
          onChange={(e) => setHue(Number(e.target.value))}
        />
      </label>

      <SlowGrid hue={hue} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

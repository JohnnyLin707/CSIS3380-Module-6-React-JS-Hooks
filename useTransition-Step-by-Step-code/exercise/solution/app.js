// Exercise: A smooth colour slider (solution)
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
  // 1. Two pieces of state: one urgent, one that can wait
  const [sliderHue, setSliderHue] = useState(200);
  const [gridHue, setGridHue] = useState(200);

  // 2. The transition
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setSliderHue(value);                 // the slider moves at once
    startTransition(() => {
      setGridHue(value);                 // the grid catches up when it can
    });
  };

  return (
    <>
      <label>
        Hue {sliderHue}
        <input type="range" min="0" max="360" value={sliderHue} onChange={handleChange} />
      </label>

      {/* 3. Feedback while the grid is behind */}
      {isPending && <p className="status pending">Repainting…</p>}
      <SlowGrid hue={gridHue} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

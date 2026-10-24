const { useState, useTransition, memo } = React;

// Keeps the computer busy for a few milliseconds, standing in for real rendering work
function busyFor(ms) {
  const start = performance.now();
  while (performance.now() - start < ms) {
    // nothing, on purpose
  }
}

function SlowPost({ index }) {
  busyFor(1.5);
  return <li>Post #{index + 1}</li>;
}

// 300 slow posts: about half a second of rendering
const PostsTab = memo(function PostsTab() {
  const posts = [];
  for (let i = 0; i < 300; i++) {
    posts.push(<SlowPost key={i} index={i} />);
  }
  return <ul className="list">{posts}</ul>;
});

function AboutTab() {
  return <p>Welcome! This tab renders instantly.</p>;
}

function ContactTab() {
  return <p>You can reach us at hello@example.com. This tab renders instantly too.</p>;
}

function App() {
  const [tab, setTab] = useState('about');
  const [transitionOn, setTransitionOn] = useState(true);
  const [isPending, startTransition] = useTransition();

  const selectTab = (next) => {
    if (transitionOn) {
      startTransition(() => setTab(next));
    } else {
      setTab(next);
    }
  };

  const tabs = [['about', 'About'], ['posts', 'Posts (slow)'], ['contact', 'Contact']];

  return (
    <>
      <div className="row">
        {tabs.map(([id, label]) => (
          <button key={id} className={tab === id ? '' : 'secondary'} onClick={() => selectTab(id)}>
            {label}
          </button>
        ))}
        <label>
          <input
            type="checkbox"
            checked={transitionOn}
            onChange={(e) => setTransitionOn(e.target.checked)}
          />
          use startTransition
        </label>
      </div>

      {isPending && <p className="status pending">Loading the tab…</p>}
      <div className="panel" style={{ opacity: isPending ? 0.5 : 1 }}>
        {tab === 'about' && <AboutTab />}
        {tab === 'posts' && <PostsTab />}
        {tab === 'contact' && <ContactTab />}
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

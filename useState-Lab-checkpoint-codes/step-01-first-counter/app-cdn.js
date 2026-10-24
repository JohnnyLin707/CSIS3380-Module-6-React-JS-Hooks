const { useState } = React;

function Counter() {
    // Declare a state variable named 'count', initialized to 0
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}
function App(props) {
    return (
        <div className='App'>
            <Counter />
        </div>
    );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

const { useEffect, useState } = React;

function App() {
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (userId === null) {
            return;
        }

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user.");
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
            })

    }, [userId]);

    const handleClick = () => {
        setUserId((prevId) => (prevId === null || prevId >= 10 ? 1 : prevId + 1));
    };

    return (
        <div className='App'>
            <button onClick={handleClick}>Fetch User</button>
            {userId === null && <p>Click Fetch User to load data</p>}
            {user ? (
                <div>
                    <h2>{user.name}</h2>
                </div>
            ) : null}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
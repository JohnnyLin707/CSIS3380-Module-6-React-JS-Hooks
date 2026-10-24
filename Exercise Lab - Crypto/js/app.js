// Destructure useState and useEffect from the global React object
const { useState, useEffect } = React;

// Step 4: Define shuffleArray helper function
function shuffleArray(array, n = 12) {
    let newArray = [...array]; // Create a shallow copy to avoid mutating original
    let currentIndex = newArray.length;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [newArray[currentIndex], newArray[randomIndex]] = [
            newArray[randomIndex],
            newArray[currentIndex],
        ];
    }
    const numToSelect = Math.min(n, newArray.length);
    return newArray.slice(0, numToSelect);
}

// ... shuffleArray function ...

// Step 7: Define the CryptoCard component
function CryptoCard({ id, name, symbol, price, marketCap, image, onRemove }) {
    return (
        <div className="crypto-card"> {/* We'll add CSS for this class later */}
            <img src={image} alt={`${name} logo`} className="crypto-card-img" />
            <h3>{name} ({symbol.toUpperCase()})</h3>
            <p>Price: ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</p>
            <p>Market Cap: ${marketCap.toLocaleString()}</p>
            <button className="remove-button" onClick={() => onRemove(id)}>Remove</button>
        </div>
    );
}

// Define your main App component
const App = () => {
    const [cryptoList, setCryptoList] = useState([]);
    const [totalMarketCap, setTotalMarketCap] = useState(0); // Step 9: State for total market cap

    useEffect(() => {
        console.log('Step 6: Processing and selecting crypto data!');
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                const mappedData = data.map(crypto => ({
                    id: crypto.id, // Unique ID for React key
                    name: crypto.name,
                    symbol: crypto.symbol,
                    currentPrice: crypto.current_price,
                    marketCap: crypto.market_cap,
                    image: crypto.image // URL to the crypto's logo
                }));

                const selectedCryptos = shuffleArray(mappedData, 12); // Select 12 random unique cryptos
                setCryptoList(selectedCryptos); // Update state with the selected list
                console.log('Selected cryptos:', selectedCryptos); // Log to confirm

                // Step 9: Calculate total market cap for the displayed list on initial load
                const sumMarketCap = selectedCryptos.reduce((acc, crypto) => {
                    return acc + crypto.marketCap;
                }, 0);
                setTotalMarketCap(sumMarketCap);
            })
            .catch(err => console.error('Error fetching crypto:', err));
    }, []);

    const removeCrypto = (id) => {
        const updatedList = cryptoList.filter(crypto => crypto.id !== id);
        setCryptoList(updatedList);

        // Step 9: Recalculate total market cap with the updated list
        const newTotal = updatedList.reduce((acc, crypto) => acc + crypto.marketCap, 0);
        setTotalMarketCap(newTotal);
    };

    return (
        <div>
            <h1>Cryptocurrency Market Tracker</h1>
            {/* Step 8: Render the list of CryptoCards */}
            {/* Step 9: Display total market cap */}
            <h2>Total Market Cap of Displayed Cryptos: ${totalMarketCap.toLocaleString()}</h2>
            <div className="crypto-list"> {/* We'll add CSS for this class later */}
                {cryptoList.length > 0 ? (
                    cryptoList.map(crypto => (
                        <CryptoCard
                            key={crypto.id} // Essential for React lists
                            id={crypto.id}
                            name={crypto.name}
                            symbol={crypto.symbol}
                            price={crypto.currentPrice}
                            marketCap={crypto.marketCap}
                            image={crypto.image}
                            onRemove={removeCrypto} // Pass the removal function
                        />
                    ))
                ) : (
                    <p className="no-data-message">Loading cryptocurrencies...</p>
                )}
            </div>
        </div>
    );
};

// Tell ReactDOM to render your App component into the div with id="root"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
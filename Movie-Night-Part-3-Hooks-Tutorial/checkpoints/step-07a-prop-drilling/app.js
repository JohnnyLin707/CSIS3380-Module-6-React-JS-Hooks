// Step 07a - the theme passed down by hand (prop drilling)

const { useState, useEffect, useRef } = React;

// Pretends the network is slow, so the loading message stays visible for a moment
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Header = (props) => {
  return (
    <header>
      <h1>{ props.title }</h1>
      <span className="stats">Movies: { props.totalMovies }</span>
      <span className="stats">Avg rating: { props.averageRating }</span>
      <button className="theme-toggle" onClick={props.toggleTheme}>
        { props.theme === 'light' ? '☾ Dark' : '☀ Light' }
      </button>
    </header>
  );
};

// mm:ss, for example 14:59
const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const Countdown = (props) => {
  const [secondsLeft, setSecondsLeft] = useState(props.startSeconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft(prevSeconds => Math.max(prevSeconds - 1, 0));
    }, 1000);

    // Cleanup: React runs this when the Countdown is removed from the page
    return () => {
      clearInterval(intervalId);
      console.log('Countdown stopped');
    };
  }, []);

  return (
    <p className="countdown">
      { secondsLeft > 0
          ? <>Movie night starts in <strong>{ formatTime(secondsLeft) }</strong></>
          : <strong>Showtime!</strong> }
    </p>
  );
};

const AddMovieForm = (props) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('Drama');
  const titleInput = useRef(null);

  // Put the cursor in the title box when the form first appears
  useEffect(() => {
    titleInput.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      titleInput.current.focus();
      return;
    }
    props.onAdd({
      title: title.trim(),
      year: Number(year) || new Date().getFullYear(),
      genre: genre
    });
    setTitle('');
    setYear('');
    titleInput.current.focus();
  };

  return (
    <form className="add-movie" onSubmit={handleSubmit}>
      <input
        ref={titleInput}
        type="text"
        placeholder="Movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option>Drama</option>
        <option>Comedy</option>
        <option>Animation</option>
        <option>Sci-Fi</option>
        <option>Horror</option>
      </select>
      <button type="submit">Add movie</button>
    </form>
  );
};

// Returns two sibling spans with no wrapper element
const MovieDetails = (props) => {
  return (
    <>
      <span className="movie-title">
        { props.title }
        { props.staffPick && <span className="badge badge-pick">STAFF PICK</span> }
      </span>
      <span className="movie-meta">
        { props.year } · { props.genre }
        <button
          className={ props.watched ? "badge badge-watched" : "badge badge-unwatched" }
          onClick={() => props.toggleWatched(props.id)}
        >
          { props.watched ? "WATCHED" : "NOT YET" }
        </button>
      </span>
    </>
  );
};

const Movie = (props) => {
  return (
    <div className="movie">
      <button className="remove-movie" onClick={() => props.removeMovie(props.id)}>✖</button>
      <div className="movie-info">
        <MovieDetails
          title={props.title}
          year={props.year}
          genre={props.genre}
          watched={props.watched}
          staffPick={props.staffPick}
          id={props.id}
          toggleWatched={props.toggleWatched}
        />
      </div>

      <Rating
        score={props.rating}
        id={props.id}
        changeRating={props.changeRating}
        theme={props.theme}
      />
    </div>
  );
};

// No state of its own: the score comes from App, and clicks are reported to App
const Rating = (props) => {
  return (
    <div className={`rating rating-${props.theme}`}>
      <button
        className="rating-action decrement"
        onClick={() => props.changeRating(-1, props.id)}
        disabled={props.score === 0}
      > - </button>
      <span className="rating-score">{ props.score }</span>
      <button
        className="rating-action increment"
        onClick={() => props.changeRating(1, props.id)}
        disabled={props.score === 5}
      > + </button>
    </div>
  );
};

const Footer = (props) => {
  return (
    <footer>
      Watched { props.watchedCount } of { props.totalMovies } · Made with React
      <button onClick={props.toggleCountdown}>
        { props.showCountdown ? 'Hide countdown' : 'Show countdown' }
      </button>
    </footer>
  );
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCountdown, setShowCountdown] = useState(true);
  const [theme, setTheme] = useState('light');
  const renderCount = useRef(0);

  // Load the movies once, when App first appears
  useEffect(() => {
    const loadMovies = async () => {
      try {
        await wait(800);
        const response = await fetch('./movies.json');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(`Could not load the movies (${err.message})`);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  // Runs after every render. Changing a ref does not cause another render.
  useEffect(() => {
    renderCount.current = renderCount.current + 1;
    console.log(`App has rendered ${renderCount.current} times`);
  });

  const handleAddMovie = (newMovie) => {
    setMovies( prevMovies => [
      ...prevMovies,
      { ...newMovie, rating: 3, watched: false, staffPick: false, id: Date.now() }
    ]);
  };

  const handleRemoveMovie = (id) => {
    setMovies( prevMovies => prevMovies.filter( movie => movie.id !== id ) );
  };

  const handleRatingChange = (delta, id) => {
    setMovies( prevMovies => prevMovies.map( movie =>
      movie.id === id
        ? { ...movie, rating: Math.min(Math.max(movie.rating + delta, 0), 5) }
        : movie
    ));
  };

  const handleToggleWatched = (id) => {
    setMovies( prevMovies => prevMovies.map( movie =>
      movie.id === id
        ? { ...movie, watched: !movie.watched }
        : movie
    ));
  };

  const watchedCount = movies.filter(movie => movie.watched).length;
  const totalStars = movies.reduce((sum, movie) => sum + movie.rating, 0);
  const averageRating = movies.length > 0
    ? (totalStars / movies.length).toFixed(1)
    : '–';

  // Keep the browser tab's title in step with the watchlist
  useEffect(() => {
    document.title = `Movie Night (${watchedCount}/${movies.length} watched)`;
  }, [watchedCount, movies.length]);

  const toggleTheme = () => {
    setTheme( prevTheme => prevTheme === 'light' ? 'dark' : 'light' );
  };

  return (
    <div className={`watchlist theme-${theme}`}>
      <Header
        title="Movie Night"
        totalMovies={movies.length}
        averageRating={averageRating}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {showCountdown && <Countdown startSeconds={15 * 60} />}

      <AddMovieForm onAdd={handleAddMovie} />

      {/* Movie list */}
      {loading && <p className="status">Loading movies…</p>}
      {error && <p className="status status-error">{error}</p>}
      {!loading && !error && movies.length === 0 &&
        <p className="empty">No movies to show.</p>}

      {movies.map( movie =>
        <Movie
          title={movie.title}
          year={movie.year}
          genre={movie.genre}
          rating={movie.rating}
          watched={movie.watched}
          staffPick={movie.staffPick}
          id={movie.id}
          key={movie.id.toString()}
          removeMovie={handleRemoveMovie}
          changeRating={handleRatingChange}
          toggleWatched={handleToggleWatched}
          theme={theme}
        />
      )}

      <Footer
        watchedCount={watchedCount}
        totalMovies={movies.length}
        showCountdown={showCountdown}
        toggleCountdown={() => setShowCountdown( prev => !prev )}
      />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

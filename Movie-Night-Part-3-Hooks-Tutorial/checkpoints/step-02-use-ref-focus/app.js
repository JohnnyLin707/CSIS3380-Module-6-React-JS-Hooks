// Step 02 - useRef puts the cursor back in the title box

const { useState, useRef } = React;

const movies = [
  {
    title: "Spirited Away",
    year: 2001,
    genre: "Animation",
    rating: 5,
    watched: true,
    staffPick: true,
    id: 1
  },
  {
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 4,
    watched: true,
    staffPick: false,
    id: 2
  },
  {
    title: "The Grand Budapest Hotel",
    year: 2014,
    genre: "Comedy",
    rating: 4,
    watched: false,
    staffPick: true,
    id: 3
  },
  {
    title: "Coco",
    year: 2017,
    genre: "Animation",
    rating: 5,
    watched: false,
    staffPick: false,
    id: 4
  }
];

const Header = (props) => {
  return (
    <header>
      <h1>{ props.title }</h1>
      <span className="stats">Movies: { props.totalMovies }</span>
      <span className="stats">Avg rating: { props.averageRating }</span>
    </header>
  );
};

const AddMovieForm = (props) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('Drama');
  const titleInput = useRef(null);

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
      />
    </div>
  );
};

// No state of its own: the score comes from App, and clicks are reported to App
const Rating = (props) => {
  return (
    <div className="rating">
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
    </footer>
  );
};

const App = (props) => {
  const [movies, setMovies] = useState(props.initialMovies);

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

  return (
    <div className="watchlist">
      <Header
        title="Movie Night"
        totalMovies={movies.length}
        averageRating={averageRating}
      />

      <AddMovieForm onAdd={handleAddMovie} />

      {/* Movie list */}
      {movies.length === 0 &&
        <p className="empty">The watchlist is empty. Time to pick a movie!</p>}

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
        />
      )}

      <Footer
        watchedCount={watchedCount}
        totalMovies={movies.length}
      />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App initialMovies={movies} />);

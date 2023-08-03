import { ReactComponent as DeleteIcon } from "../assets/delete.svg";

const WatchedMovie = ({ movie, onRemoveWatched }) => {
  const { imdbID, title, poster, runtime, imdbRating, userRating } = movie;
  return (
    <li>
      <img
        src={poster !== "N/A" ? poster : "https://via.placeholder.com/40"}
        alt={`${title} poster`}
      />
      <div style={{ justifyContent: "space-between" }}>
        <h3>{title}</h3>
        <button className="btn-delete" onClick={() => onRemoveWatched(imdbID)}>
          <DeleteIcon />
        </button>
      </div>
      <div>
        <p>
          <span>⭐️</span>
          <span>{imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{runtime} min</span>
        </p>
      </div>
    </li>
  );
};

const WatchedMoviesList = ({ watched, onRemoveWatched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onRemoveWatched={onRemoveWatched}
        />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;

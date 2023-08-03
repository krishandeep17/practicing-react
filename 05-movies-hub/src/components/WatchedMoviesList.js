import { ReactComponent as DeleteIcon } from "../assets/delete.svg";

const WatchedMovie = ({ movie, handleRemoveWatched }) => {
  const { imdbID, title, poster, runtime, imdbRating, userRating } = movie;

  return (
    <li>
      <img
        src={poster !== "N/A" ? poster : "https://via.placeholder.com/40"}
        alt={`${title} poster`}
      />
      <div style={{ justifyContent: "space-between" }}>
        <h3>{title}</h3>
        <button
          title="Remove"
          className="btn-delete"
          onClick={() => handleRemoveWatched(imdbID)}
        >
          <DeleteIcon />
        </button>
      </div>
      <div>
        <p title="IMDB Rating">
          <span>⭐️</span>
          <span>{imdbRating}</span>
        </p>
        <p title="User Rating">
          <span>🌟</span>
          <span>{userRating}</span>
        </p>
        <p title="Runtime">
          <span>⏳</span>
          <span>{runtime} min</span>
        </p>
      </div>
    </li>
  );
};

const WatchedMoviesList = ({ watched, handleRemoveWatched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          handleRemoveWatched={handleRemoveWatched}
        />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;

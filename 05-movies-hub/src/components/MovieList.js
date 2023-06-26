const Movie = ({ movie, selectedId, onSelectedId }) => {
  const { imdbID, Title, Year, Poster } = movie;

  return (
    <li
      className={selectedId === imdbID ? "selected" : ""}
      onClick={() => onSelectedId(imdbID)}
    >
      <img
        src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/40"}
        alt={`${Title} poster`}
      />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
};

const MoviesList = ({ movies, selectedId, onSelectedId }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          selectedId={selectedId}
          onSelectedId={onSelectedId}
        />
      ))}
    </ul>
  );
};

export default MoviesList;

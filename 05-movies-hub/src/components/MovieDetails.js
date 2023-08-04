import { useEffect, useState } from "react";

import { useKey } from "../hooks";

import { ReactComponent as BackIcon } from "../assets/back.svg";
import Loader from "./Loader";
import StarRating from "./StarRating";

const MovieDetails = ({
  selectedId,
  handleCloseMovie,
  handleAddWatched,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Actors: actors,
    Director: director,
    Genre: genre,
    imdbRating,
    Plot: plot,
    Poster: poster,
    Released: released,
    Runtime: runtime,
    Title: title,
    Year: year,
  } = movie;

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    handleAddWatched(newWatchedMovie);
    handleCloseMovie();
  };

  // Fetch movie data whose imdbID = selectedId
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${selectedId}`
        );

        const data = await res.json();

        setMovie(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovies();
  }, [selectedId]);

  // Change website title with the movie title
  useEffect(() => {
    if (!title) return;
    document.title = `MovieHub | ${title}`;

    return () => {
      document.title = `MovieHub`;
    };
  }, [title]);

  // Close the movie on pressing `Esc` button
  useKey("Escape", handleCloseMovie);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button
              title="back"
              className="btn-back"
              onClick={handleCloseMovie}
            >
              <BackIcon />
            </button>
            <img
              src={
                poster !== "N/A" ? poster : "https://via.placeholder.com/400"
              }
              alt={`Poster of ${title}`}
            />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>You rated this movie: {watchedUserRating} ⭐</p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    setUserRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to watched
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Staring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;

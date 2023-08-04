import { useEffect, useState } from "react";

import { useMovies } from "./hooks";

import {
  ErrorMessage,
  Loader,
  Logo,
  MovieDetails,
  MoviesList,
  NumResults,
  SearchBar,
  WatchedMoviesList,
  WatchedSummary,
} from "./components";

const Navbar = ({ children }) => {
  return <nav className="navbar">{children}</nav>;
};

const Main = ({ children }) => {
  return <main className="main">{children}</main>;
};

const App = () => {
  const [query, setQuery] = useState("batman");
  const [selectedId, setSelectedId] = useState("");
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem("watched");
    return storedValue ? JSON.parse(storedValue) : [];
  });
  const { movies, isLoading, error } = useMovies(query);

  const handleSelectedId = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleCloseMovie = () => setSelectedId(null);

  const handleAddWatched = (movie) => {
    setWatched((prevWatched) => [...prevWatched, movie]);
  };

  const handleRemoveWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  return (
    <div className="app">
      <Navbar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <div className="container">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MoviesList
              movies={movies}
              selectedId={selectedId}
              handleSelectedId={handleSelectedId}
            />
          )}
        </div>

        <div className="container">
          {selectedId ? (
            <MovieDetails
              key={selectedId}
              selectedId={selectedId}
              handleCloseMovie={handleCloseMovie}
              handleAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                handleRemoveWatched={handleRemoveWatched}
              />
            </>
          )}
        </div>
      </Main>
    </div>
  );
};

export default App;

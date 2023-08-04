import { useState } from "react";

import { useLocalStorage, useMovies } from "./hooks";

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
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorage([], "watched");

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

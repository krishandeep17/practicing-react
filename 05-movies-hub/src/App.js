import { useState } from "react";

import { movieData, watchedData } from "./tempData";
import {
  Logo,
  Search,
  NumResults,
  Navbar,
  Box,
  MoviesList,
  WatchedMoviesList,
  WatchedSummary,
  Main,
} from "./components";

const App = () => {
  const [movies, setMovies] = useState(movieData);
  const [watched, setWatched] = useState(watchedData);

  return (
    <>
      <Navbar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          <MoviesList movies={movies} />
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
};

export default App;

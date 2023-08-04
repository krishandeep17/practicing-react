import { useEffect, useRef } from "react";

import logo from "../assets/logo.png";
import { ReactComponent as SearchIcon } from "../assets/search.svg";

const Logo = () => {
  return (
    <div className="logo">
      <img src={logo} alt="MovieHub Logo" />
      <h1>MovieHub</h1>
    </div>
  );
};

const SearchBar = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  // Focus search input on pressing `Enter` button
  useEffect(() => {
    const callback = (e) => {
      if (e.code === "Enter" && document.activeElement !== inputEl.current) {
        inputEl.current.focus();
        setQuery("");
      }
    };

    document.addEventListener("keydown", callback);

    return () => {
      document.addEventListener("keydown", callback);
    };
  }, [setQuery]);

  return (
    <div className="search-bar">
      <SearchIcon />
      <input
        autoComplete="off"
        className="search-input"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    </div>
  );
};

const NumResults = ({ movies }) => {
  return (
    <p className="num-results">
      <span>Results: </span>
      <strong>{movies.length}</strong>
    </p>
  );
};

export { Logo, SearchBar, NumResults };

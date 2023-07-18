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
      />
    </div>
  );
};

const NumResults = ({ movies }) => {
  return (
    <p className="num-results">
      Search results: <strong>{movies.length}</strong>
    </p>
  );
};

export { Logo, SearchBar, NumResults };

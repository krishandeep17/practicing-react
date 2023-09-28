import { ClearButton, Results, SearchPosts } from "../components";

export default function Header() {
  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <ClearButton />
      </div>
    </header>
  );
}

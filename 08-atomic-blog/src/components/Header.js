import { usePostContext } from "../contexts/PostContext";
import { Results, SearchPosts } from "../components";

export default function Header() {
  // 3) CONSUMING CONTEXT VALUE
  const { handleClearPosts } = usePostContext();

  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={handleClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}

import { useSearchContext } from "../contexts/SearchContext";

export default function SearchPosts() {
  // 3) CONSUMING CONTEXT VALUE
  const { searchQuery, setSearchQuery } = useSearchContext();

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}

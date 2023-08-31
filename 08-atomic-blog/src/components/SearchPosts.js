import { usePosts } from "../PostContext";

export default function SearchPosts() {
  // 3) CONSUMING CONTEXT VALUE
  const { searchQuery, setSearchQuery } = usePosts();

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}

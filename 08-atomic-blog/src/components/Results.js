import { usePosts } from "../PostContext";

export default function Results() {
  // 3) CONSUMING CONTEXT VALUE
  const { posts } = usePosts();

  return <p>🚀 {posts.length} atomic posts found</p>;
}

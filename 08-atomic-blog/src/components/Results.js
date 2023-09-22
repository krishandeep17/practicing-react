import { usePostContext } from "../contexts/PostContext";

export default function Results() {
  // 3) CONSUMING CONTEXT VALUE
  const { posts } = usePostContext();

  return <p>🚀 {posts.length} atomic posts found</p>;
}

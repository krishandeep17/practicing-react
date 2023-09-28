import { usePostContext } from "../contexts/PostContext";

export default function ClearButton() {
  // 3) CONSUMING CONTEXT VALUE
  const { handleClearPosts } = usePostContext();

  return <button onClick={handleClearPosts}>Clear posts</button>;
}

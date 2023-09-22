import { usePostContext } from "../contexts/PostContext";

export default function Posts() {
  // 3) CONSUMING CONTEXT VALUE
  const { posts } = usePostContext();

  return (
    <section>
      <ul>
        {posts.map((post, i) => (
          <li key={i}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

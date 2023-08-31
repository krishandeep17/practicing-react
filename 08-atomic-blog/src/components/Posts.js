import { usePosts } from "../PostContext";

function List() {
  // 3) CONSUMING CONTEXT VALUE
  const { posts } = usePosts();

  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default function Posts() {
  return (
    <section>
      <List />
    </section>
  );
}

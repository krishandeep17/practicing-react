import { List } from "../components";

export default function Posts({ posts }) {
  return (
    <section>
      <List posts={posts} />
    </section>
  );
}

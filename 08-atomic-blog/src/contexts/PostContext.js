import { createContext, useContext, useState } from "react";

import { useSearchContext } from "./SearchContext";
import { randomPosts } from "../utils/randomPosts";

// 1) CREATE A CONTEXT
const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => randomPosts())
  );
  const { searchQuery } = useSearchContext();

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    // 2) PROVIDE VALUE TO THE CHILD COMPONENTS
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        handleAddPost,
        handleClearPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

// CUSTOM HOOK
export function usePostContext() {
  const context = useContext(PostContext);

  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");

  return context;
}

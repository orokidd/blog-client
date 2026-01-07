import { useEffect, useState } from "react";
import { PostItem } from "./PostItem";

export function PostList() {
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    try {
      const res = await fetch("http://localhost:3000/api/posts");
      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();
      setPosts(data);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  if (posts.length === 0) {
    return <div>No posts found</div>;
  }

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

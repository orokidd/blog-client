import { useEffect, useState } from "react";
import { PostItem } from "./PostItem";

export function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("http://localhost:3000/api/posts/published");
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    }

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

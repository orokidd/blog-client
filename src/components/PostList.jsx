import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("http://localhost:3000/api/posts");
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
      {posts.map((element, index) => (

        <div className="post" key={element.id}>
          <Link to={`/post/${element.id}`} className="post-link">
            <div className="post-title">{element.title}</div>
          </Link>
          <div className="post-content">{element.content}</div>
        </div>

      ))}
    </div>
  );
}

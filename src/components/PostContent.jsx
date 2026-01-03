import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function PostContent() {
    // const post = fetch postApi => postId 
    const { postId } = useParams()
    const [post, setPost] = useState({})

    useEffect(()=> {

      async function fetchPost() {
        try {
          const res = await fetch(`http://localhost:3000/api/posts/${postId}`)
          if (!res.ok) throw new Error("Failed to fetch data");

          const data = await res.json();
          setPost(data);
        } catch (error) {
          console.log(error);
        }
      }

      fetchPost()
    }, [postId])

    console.log("peler")

  return (
    <div className="post-container">
      <div className="post-title">{post.title}</div>
      <div className="post-date">{post.createdAt}</div>
      <div className="post-content">{post.content}</div>
      <div>post id is: {postId}</div>
    </div>
  );
}

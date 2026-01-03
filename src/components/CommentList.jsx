import { useEffect, useState } from "react";
import { useParams } from "react-router";

export function CommentList() {
  const {postId} = useParams()
  const [comments, setComments] = useState([])

  useEffect(() => {

    async function fetchComments() {
      try {
        const res = await fetch(`http://localhost:3000/api/comments/post/${postId}`)
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.log(error)
      }
    }

    fetchComments()
  }, [postId])

  console.log(comments)

  return (
    <div className="comments-container">
        <div className="comment-header"><h2>Comments</h2></div>
      {comments.map((comment) => {
        return (
          <div className="comment" key={comment.id}>
            <div className="comment-username">{comment.user.username}</div>
            <div className="comment-content">{comment.content}</div>
          </div>
        );
      })}
    </div>
  );
}

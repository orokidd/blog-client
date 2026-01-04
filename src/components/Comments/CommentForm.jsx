import { useState } from "react";

export function CommentForm({ loggedIn, postId, onCommentCreated }) {
  const [comment, setComment] = useState({
    comment: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/api/comments/post/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(comment),
    });

    if (!res.ok) {
      setError("Failed to post comment");
      return;
    }
    setError(null);
    setComment({ comment: "" });
    onCommentCreated();
  };

  return (
    <>
      {loggedIn ? (
        <div className="comment-form">
          <div className="error">
            <p className="error-text">{error}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <textarea value={comment.comment} name="comment" onChange={handleChange} placeholder="Add your comment here..." rows="4" cols="50"></textarea>
            <br />
            <button type="submit">Submit Comment</button>
          </form>
        </div>
      ) : (
        <div>Please login to add comments.</div>
      )}
    </>
  );
}

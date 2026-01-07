import { useState } from "react";

export function CommentForm({ loggedIn, handleNewComment, error }) {
  const [comment, setComment] = useState({
    comment: "",
  });

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleNewComment(comment)
    setComment({ comment: "" });
  };

  return (
    <>
      {loggedIn ? (
        <div className="comment-form">
          <div className="error">
            <p className="error-text">{error}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <textarea value={comment.comment} name="comment" onChange={handleChange} placeholder="Add your comment here..." rows="4" cols="50" required></textarea>
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

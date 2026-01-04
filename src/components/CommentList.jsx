export function CommentList({ comments, loading, user }) {
  const userId = user ? user.id : null;

  if (loading) return <p>Loading comments...</p>;

  if (comments.length === 0) {
    return <p>No comments yet</p>;
  }

  return (
    <div className="comments-container">
      <div className="comment-header">
        <h2>Comments</h2>
      </div>

      {comments.map((comment) => {
        return (
          <div className="comment" key={comment.id}>
            <div className="comment-username">{comment.user.username}</div>
            <div className="comment-content">{comment.content}</div>

            {userId === comment.userId && (
              <div className="comment-actions">
                <button className="delete-button">Delete</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

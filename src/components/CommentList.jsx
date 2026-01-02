export function CommentList({ postId }) {
  const comments = [
    {
      content: "Comment test arasaka",
      id: 1,
    },
    {
      content: "Comment test bisoprolol",
      id: 2,
    },
  ];

  return (
    <div className="comments-container">
        <div className="comment-header"><h2>Comments</h2></div>
      {comments.map((comment) => {
        return (
          <div className="comment" key={comment.id}>
            <div className="comment-content">{comment.content}</div>
          </div>
        );
      })}
    </div>
  );
}

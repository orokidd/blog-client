export default function AdminPostComments({ comments, handleDeleteComment, loading, error, isEdit }) {
    if (!isEdit) return null;
	if (loading) return <p>Loading comments...</p>;
	if (error) return <p>Error: {error}</p>;
	if (comments.length === 0) return <p>No comments found</p>;

	return (
		<div className="admin-comments-container">
			<h2>Post Comments</h2>
			{comments.map((comment) => (
				<div className="admin-comment" key={comment.id}>
					<div className="admin-comment-username">{comment.user.username}</div>
					<div className="admin-comment-content">{comment.content}</div>

					<div className="admin-comment-actions">
						<button type="button" className="admin-delete-button" onClick={() => handleDeleteComment(comment.id)}>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

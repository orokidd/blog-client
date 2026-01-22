import styles from '../../styles/Comment.module.css'
import { formatDateSimple } from '../../utils/dateFormatting';

export default function PostComments({ comments, handleDeleteComment, loading, error, isEdit }) {
    if (!isEdit) return null;
	
	if (error) return <p>Error: {error}</p>;

	return (
		<div className={styles.comments}>
			<h1>Comments</h1>
			{comments.length === 0 ? <p className={styles.noComments}>No comments found.</p> : null}
			{loading ? <p>Loading comments...</p> : null}

			{comments.map((comment) => (
				<div className={styles.comment} key={comment.id}>
					<div className={styles.commentHeader}>
						<div className={styles.username}>{comment.user.username}</div>
						<div className={styles.commentDate}>{formatDateSimple(comment.createdAt)}</div>
					</div>

					<div className={styles.commentText}>{comment.content}</div>

					<div className="comment-actions">
						<button type="button" className={styles.deleteCommentButton} onClick={() => handleDeleteComment(comment.id)}>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

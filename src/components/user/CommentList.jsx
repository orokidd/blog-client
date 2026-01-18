import styles from '../../styles/Comment.module.css'
import { formatDateSimple } from '../../utils/dateFormatting';

export function CommentList({ comments, loading, user, handleDeleteComment }) {
  const userId = user ? user.id : null;

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className={styles.comments}>
      {comments.map((comment) => {
        return (
          <div className={styles.comment} key={comment.id}>
            <div className={styles.commentHeader}>
              <div className={styles.username}>{comment.user.username}</div>
              <div className={styles.commentDate}>{formatDateSimple(comment.createdAt)}</div>
            </div>
            
            <div className={styles.commentText}>{comment.content}</div>

            {userId === comment.userId && (
              <div className="comment-actions">
                  <button type="submit" className={styles.deleteCommentButton} onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

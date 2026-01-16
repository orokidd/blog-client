import { useState } from "react";
import styles from '../../styles/Comment.module.css'

export function CommentForm({ loggedIn, handleNewComment, error }) {
	const [comment, setComment] = useState({
		comment: "",
	});

	const handleChange = (e) => {
		setComment({ ...comment, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleNewComment(comment);
		setComment({ comment: "" });
	};

	return (
		<div className={styles.formContainer}>
			{loggedIn ? (
				<>
					<div className="error">
						<p className="error-text">{error}</p>
					</div>

					<form onSubmit={handleSubmit}>
						<textarea value={comment.comment} name="comment" onChange={handleChange} placeholder="Add your comment here..." rows="4" cols="50" required></textarea>
						<button className={styles.submitButton} type="submit">Submit</button>
					</form>
				</>
			) : (
				<div className={styles.pleaseLogin}>Please login to add comments.</div>
			)}
		</div>
	);
}

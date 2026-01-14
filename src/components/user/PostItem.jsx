import { Link } from "react-router-dom";
import styles from '../../styles/Post.module.css'
import formatDate from "../../utils/dateFormatting";

export function PostItem({ post }) {
	return (
		<div className={styles.post}>
			<div className={styles.postDate}>{ formatDate(post.createdAt) }</div>
			<Link to={`/post/${post.id}`} className="post-link">
				<div className={styles.postTitle}>{post.title}</div>
			</Link>
			<div className={styles.postContent}>{post.content}</div>
		</div>
	);
}
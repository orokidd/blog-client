import styles from '../../styles/Post.module.css'
import { Link } from 'react-router-dom'
import formatDate from '../../utils/dateFormatting';

export function PostContent({ post }) {
	return (
		<div className={styles.postContainer}>
			<div className="navigations">
				<Link to="/" className={styles.homeLink}>← Home</Link>	
			</div>

			<div className="main">
				<div className={styles.postTitle}>{post.title}</div>
				<div className={styles.postDate}>{formatDate(post.createdAt)}</div>
				<div className={styles.postContent}>{post.content}</div>
			</div>
		</div>
	);
}
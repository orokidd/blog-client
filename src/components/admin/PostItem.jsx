import { Link } from 'react-router';
import { PostOptions } from './PostOptions';
import styles from '../../styles/PostList.module.css';
import formatDate from '../../utils/dateFormatting';

export function PostItem({ post, setShowModal, setPostToDelete }) {
	return (
		<div className={styles.post}>
			<div className={styles.postDate}>{formatDate(post.createdAt)}</div>
			<Link to={`/admin/posts/${post.id}/edit`} className="post-link">
				<div className={styles.postTitle}>{post.title}</div>
			</Link>

			<div className={styles.postContent}>{post.content}</div>

			<PostOptions post={post} setShowModal={setShowModal} setPostToDelete={setPostToDelete} />
		</div>
	);
}

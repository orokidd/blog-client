import { PostItem } from './PostItem';
import styles from '../../styles/PostList.module.css';

export function PostList({ posts, setShowModal, setPostToDelete, error, loading }) {
	if (loading) {
		return <div>Loading...</div>;
	}

	if (posts.length === 0) {
		return <div>No posts found.</div>;
	}

	if (error) {
		return <div className="error">Error: {error}</div>;
	}

	return (
		<div className={styles.postsContainer}>
			{posts.map((post) => (
				<PostItem key={post.id} post={post} setShowModal={setShowModal} setPostToDelete={setPostToDelete} />
			))}
		</div>
	);
}

import { PostItem } from "./PostItem";
import styles from '../../styles/Post.module.css'

export function PostList({ posts }) {
	if (posts.length === 0) {
		return <div>No posts found</div>;
	}

	return (
		<div className={styles.postsContainer}>
			{posts.map((post) => (
				<PostItem key={post.id} post={post} />
			))}
		</div>
	);
}

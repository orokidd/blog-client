import { PostItem } from "./PostItem";

export function PostList({ posts }) {
	if (posts.length === 0) {
		return <div>No posts found</div>;
	}

	return (
		<div className="posts-container">
			{posts.map((post) => (
				<PostItem key={post.id} post={post} />
			))}
		</div>
	);
}

import { Link } from "react-router-dom";

export function PostItem({ post }) {
	return (
		<div className="post">
			<Link to={`/post/${post.id}`} className="post-link">
				<div className="post-title">{post.title}</div>
			</Link>
			<div className="post-content">{post.content}</div>
		</div>
	);
}
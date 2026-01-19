import { Link } from "react-router";
import { PostOptions } from "./PostOptions";

export function PostItem({post, deletePost}) {
	return (
		<div className="post">
			<Link to={`/post/${post.id}`} className="post-link">
				<div className="post-title">{post.title}</div>
			</Link>

			<div className="post-content">{post.content}</div>

			<PostOptions post={post} deletePost={deletePost} />
		</div>
	);
}

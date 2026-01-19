import { Link } from "react-router";

export function PostOptions({post, deletePost}) {
	return (
		<div className="post-actions">
			<div className="post-action-delete">
				<button className="post-action-delete" onClick={() => { deletePost(post.id); }}>
					Delete
				</button>
			</div>

			<div className="post-action-edit">
				<Link to={`/admin/posts/${post.id}/edit`}>Edit</Link>
			</div>

			<div className="post-action-publish">{post.published ? "Unpublish" : "Publish"}</div>
		</div>
	);
}
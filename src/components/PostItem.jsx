import { Link } from "react-router-dom";

export function PostItem({ post, isAdmin = false }) {
    return (
    <div className="post">
        <Link to={`/post/${post.id}`} className="post-link">
            <div className="post-title">{post.title}</div>
        </Link>
        <div className="post-content">{post.content}</div>

        {isAdmin && (
        <div className="post-actions">
            <div className="post-action-delete">
                <button className="post-action-delete" onClick={() => {deletePost(post.id)}}>Delete</button>
            </div>
            <div className="post-action-edit">Edit</div>
            <div className="post-action-publish">
                {post.published ? "Unpublish" : "Publish"}
            </div>
        </div> )}
    </div>
    );
}
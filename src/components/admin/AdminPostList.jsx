import {Link} from "react-router-dom";

export default function AdminPostList({posts, deletePost, error, loading}) {
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
        <div className="posts-container">
            {posts.map((post) => (
                <div className="post" key={post.id} >
                    <Link to={`/post/${post.id}`} className="post-link">
                        <div className="post-title">{post.title}</div>
                    </Link>

                    <div className="post-content">{post.content}</div>

                    <div className="post-actions">
                        <div className="post-action-delete">
                            <button className="post-action-delete" onClick={() => {deletePost(post.id)}}>Delete</button>
                        </div>

                        <div className="post-action-edit">
                            <Link to={`/admin/posts/${post.id}/edit`}>Edit</Link>
                        </div>

                        <div className="post-action-publish">
                            {post.published ? "Unpublish" : "Publish"}
                        </div>
                    </div>
                </div>
                ))}
        </div>
    )
}
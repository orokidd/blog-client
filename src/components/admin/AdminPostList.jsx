import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {Link} from "react-router-dom";

export default function AdminPostList() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const { getToken } = useContext(AuthContext);

    async function fetchPosts() {
        try {
            const res = await fetch('http://localhost:3000/api/posts');
            if (!res.ok) throw new Error("Failed to fetch data");

            const data = await res.json();
            setPosts(data);
        } catch (e) {
            setError(e.message);
            console.log(e.message)
        }
    }

    async function deletePost(postId) {
        try {
            const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                }
            });

            if (!res.ok) throw new Error("Failed to delete post");

            const data = await res.json();
            console.log("Post deleted successfully:", data);
            await fetchPosts();
        } catch (e) {
            setError(e.message);
            console.log(e.message)
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    if (posts.length === 0) {
        return <div>{error}</div>;
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
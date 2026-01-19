import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import PostList from "../../components/admin/PostList.jsx";
import ProtectedPage from "../ProtectedPage.jsx";

export default function AdminDashboard() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { getToken } = useContext(AuthContext);

    async function fetchPosts() {
        try {
            const res = await fetch('http://localhost:3000/api/posts');
            if (!res.ok) throw new Error("Failed to fetch data");

            const data = await res.json();
            setPosts(data);
            setLoading(false);
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
            setPosts(posts.filter(post => post.id !== postId));
            // await fetchPosts();
        } catch (e) {
            setError(e.message);
            console.log(e.message)
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);
    return (
        <ProtectedPage>
            <PostList posts={posts} deletePost={deletePost} error={error} loading={loading}/>
        </ProtectedPage>
    )
}
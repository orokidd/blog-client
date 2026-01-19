import { PostItem } from "./PostItem";

export default function PostList({posts, deletePost, error, loading}) {
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
                <PostItem key={post.id} post={post} deletePost={deletePost}/>
                ))}
        </div>
    )
}
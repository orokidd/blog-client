export function PostContent({ post }) {
  return (
    <div className="post-container">
      <div className="post-title">{post.title}</div>
      <div className="post-date">{post.createdAt}</div>
      <div className="post-content">{post.content}</div>
    </div>
  );
}

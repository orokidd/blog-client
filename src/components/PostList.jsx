import { posts } from "../assets/mockPost";

export function PostList() {
  return (
    <div className="posts-container">
      {posts.map((element, index) => (
        <div className="post" key={index}>
          <div className="post-title">{element.title}</div>
          <div className="post-content">{element.content}</div>
        </div>
      ))}
    </div>
  )
}

import { blogs } from "../assets/mockBlogs";

export function Blogs() {
  return (
    <div className="blogs-container">
      {blogs.map((element, index) => (
        <div className="blog" key={index}>
          <div className="blog-title">{element.title}</div>
          <div className="blog-content">{element.content}</div>
        </div>
      ))}
    </div>
  )
}

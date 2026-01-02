export function PostContent({postId}) {
    // const post = fetch postApi => postId 

  return (
    <div className="post-container">
      <div className="post-title"><h1>This is a title</h1></div>
      <div className="post-date">12:34 PM</div>
      <div className="post-content">This is a content</div>
    </div>
  );
}

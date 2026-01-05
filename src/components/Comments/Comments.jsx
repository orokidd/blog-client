import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router"
import { CommentForm } from "./CommentForm"
import { CommentList } from "./CommentList"
import { AuthContext } from "../../context/AuthContext"

export function Comments() {
  const { postId } = useParams()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const { loggedIn, user, getToken } = useContext(AuthContext)

  const fetchComments = async () => {
    setLoading(true)

    const res = await fetch(
      `http://localhost:3000/api/comments/post/${postId}`
    )

    const data = await res.json()
    setComments(data)
    setLoading(false)
  }

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        }
      })

      if (res.ok ) {
        const data = await res.json()
        console.log(data.message)
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId))
      } else {
        console.error('Failed to delete comment');
      }
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  return (
    <>
      <CommentForm loggedIn={loggedIn} postId={postId} onCommentCreated={fetchComments} getToken={getToken} />
      <CommentList comments={comments} loading={loading} user={user} onDeleteComment={handleDeleteComment}/>
    </>
  )
}

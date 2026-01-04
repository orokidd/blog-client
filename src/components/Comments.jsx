import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router"
import { CommentForm } from "./CommentForm"
import { CommentList } from "./CommentList"
import { AuthContext } from "../context/AuthContext"

export function Comments() {
  const { postId } = useParams()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const { loggedIn, user } = useContext(AuthContext)

  const fetchComments = async () => {
    setLoading(true)

    const res = await fetch(
      `http://localhost:3000/api/comments/post/${postId}`
    )

    const data = await res.json()
    setComments(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  return (
    <>
      <CommentForm loggedIn={loggedIn} postId={postId} onCommentCreated={fetchComments} />
      <CommentList comments={comments} loading={loading} user={user} />
    </>
  )
}

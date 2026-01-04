import { useContext, useState } from "react"
import { useParams } from "react-router"
import { AuthContext } from "../context/AuthContext"

export function AddComment() {
    const { postId } = useParams()
    const { loggedIn, user } = useContext(AuthContext)

    const [comment, setComment] = useState({
        comment: '',
    })

    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setComment({...comment, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!loggedIn) {
            alert("You must be logged in to submit a comment.")
            return
        }

        try {
            const res = await fetch(`http://localhost:3000/api/comments/post/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(comment)
            })
            if (!res.ok) {
                throw new Error("Failed to submit comment")
            }
        } catch (err) {
            console.error(err)
            setError("Failed to submit comment. Please try again.")
        }
    }

    return (
        <>
            { loggedIn ?
            <div className="comment-form">

                <div className="error">
                    <p className="error-text">{error}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <textarea name="comment" onChange={handleChange} placeholder="Add your comment here..." rows="4" cols="50"></textarea>
                    <br />
                    <button type="submit">Submit Comment</button>
                </form>

            </div> : 
            
            <div>Please login to add comments.</div> }
        </>
    )
}
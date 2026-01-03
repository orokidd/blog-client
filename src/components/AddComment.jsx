import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export function AddComment() {
    const { loggedIn } = useContext(AuthContext)

    return (
        <>
            { loggedIn ?<div className="comment-input">This would be the comment input box.</div> : <div>Please login to add comments.</div> }
        </>
    )
}
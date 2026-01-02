export function AddComment() {
    const loggedIn = "pler"

    return (
        <>
            { loggedIn ?<div className="comment-input">This would be the comment input box.</div> : <div>Please login to add comments.</div> }
        </>
    )
}
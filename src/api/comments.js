export async function fetchPostComments(postId) {
	const res = await fetch(`http://localhost:3000/api/comments/post/${postId}`);
	if (!res.ok) throw new Error("Failed to fetch data");

	const data = await res.json();
	return data;
}

export async function postNewComment(comment, postId, token) {
	const res = await fetch(`http://localhost:3000/api/comments/post/${postId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(comment),
	});

	if (!res.ok) throw new Error("Failed to post new comment.");
	const data = await res.json();
	const newComment = data.createdComment;

	return newComment;
}

export async function deleteComment(commentId, token) {
	const res = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await res.json();
	return data;
}

export async function fetchAllPosts() {
	const res = await fetch("http://localhost:3000/api/posts");
	if (!res.ok) throw new Error("Failed to fetch data");

	const data = await res.json();
	return data;
}

export async function fetchPublishedPosts() {
	const res = await fetch("http://localhost:3000/api/posts/published");
	if (!res.ok) throw new Error("Failed to fetch data");

	const data = await res.json();
	return data;
}

export async function fetchPostContent(postId) {
	const res = await fetch(`http://localhost:3000/api/posts/${postId}`);
	if (!res.ok) throw new Error("Failed to fetch data");

	const data = await res.json();
	return data;
}

export async function postNewPost(content, token) {
	const res = await fetch("http://localhost:3000/api/posts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(content),
	});

	if (!res.ok) throw new Error("Failed to create post");

	const data = await res.json();
	return data;
}

export async function putEditPost(postId, content, token) {
	const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(content),
	});

	if (!res.ok) throw new Error("Failed to edit post");

	const data = await res.json();
	return data;
}

export async function deletePost(postId, token) {
	const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
		method: "DELETE",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) throw new Error("Failed to delete post");

	const data = await res.json();
	console.log("Post deleted successfully:", data);
}

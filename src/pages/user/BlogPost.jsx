import { Header } from "../../components/Header";
import { PostContent } from "../../components/user/PostContent";
import { Comments } from "../../components/Comments/Comments";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BlogPost() {
	const { postId } = useParams();
	const [post, setPost] = useState({});

	async function fetchPost() {
		try {
			const res = await fetch(`http://localhost:3000/api/posts/${postId}`);
			if (!res.ok) throw new Error("Failed to fetch data");

			const data = await res.json();
			setPost(data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchPost();
	}, [postId]);

	return (
		<>
			<Header />
			<PostContent post={post} />
			<Comments />
		</>
	);
}

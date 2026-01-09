import { Header } from "../../components/Header";
import { Hero } from "../../components/Hero";
import { PostList } from "../../components/user/PostList";
import { useEffect, useState } from "react";

export default function Home() {
	const [posts, setPosts] = useState([]);

	async function fetchPosts() {
		try {
			const res = await fetch("http://localhost:3000/api/posts");
			if (!res.ok) throw new Error("Failed to fetch data");

			const data = await res.json();
			setPosts(data);
		} catch (e) {
			setError(e.message);
			console.log(e.message);
		}
	}

	useEffect(() => {
		fetchPosts();
	}, []);
	return (
		<>
			<Header />
			<Hero />
			<PostList posts={posts} />
		</>
	);
}

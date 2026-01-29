import { Hero } from "../../components/Hero";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Loading } from "../../components/Loading";
import { PostList } from "../../components/user/PostList";
import { Pagination } from "../../components/user/Pagination";
import { fetchPublishedPosts } from "../../api/posts";

import { useEffect, useState } from "react";

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 6;
	const [loading, setLoading] = useState(true)

	const start = (currentPage - 1) * postsPerPage;
	const end = start + postsPerPage;

	const paginatedItems = posts.slice(start, end);
	const totalPages = Math.ceil(posts.length / postsPerPage); // 1.23 returns 2

	useEffect(() => {
		async function loadPosts() {
			try {
				const posts = await fetchPublishedPosts();
				setPosts(posts);
			} catch (err) {
				console.error(err.message);
			} finally {
				setLoading(false)
			}
		}

		loadPosts();
	}, []);

	if (loading) return (
		<Loading />
	)

	return (
		<>
			<Header />
			<Hero />
			<PostList posts={paginatedItems} />
			<Pagination currentPage={currentPage} totalPages={totalPages} buttonHandler={setCurrentPage} />
			<Footer />
		</>
	);
}

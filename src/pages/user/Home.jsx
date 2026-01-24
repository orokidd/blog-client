import { Header } from '../../components/Header';
import { Hero } from '../../components/Hero';
import { PostList } from '../../components/user/PostList';
import { useEffect, useState } from 'react';
import { Pagination } from '../../components/user/Pagination';

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 6;

	const start = (currentPage - 1) * postsPerPage;
	const end = start + postsPerPage;

	const paginatedItems = posts.slice(start, end);
	const totalPages = Math.ceil(posts.length / postsPerPage); // 1.23 returns 2

	async function fetchPosts() {
		try {
			const res = await fetch('http://localhost:3000/api/posts/published');
			if (!res.ok) throw new Error('Failed to fetch data');

			const data = await res.json();
			setPosts(data);
		} catch (e) {
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
			<PostList posts={paginatedItems} />
			<Pagination currentPage={currentPage} totalPages={totalPages} buttonHandler={setCurrentPage} />
		</>
	);
}

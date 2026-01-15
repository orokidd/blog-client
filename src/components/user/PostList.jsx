import { PostItem } from "./PostItem";
import styles from '../../styles/PostList.module.css'
import { useState } from 'react'

export function PostList({ posts }) {
	const [currentPage, setCurrentPage] = useState(1)
	const postsPerPage = 6

	const start = (currentPage - 1) * postsPerPage
	const end = start + postsPerPage

	const paginatedItems = posts.slice(start, end)
	const totalPages = Math.ceil(posts.length / postsPerPage); // 1.23 returns 2

	if (posts.length === 0) {
		return <div>No posts found</div>;
	}

	return (
		<div className={styles.postsContainer}>
			{paginatedItems.map((post) => (
				<PostItem key={post.id} post={post} />
			))}

			<div className={styles.paginations}>
				<button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>Back</button>
				<button disabled={currentPage === totalPages} onClick={()=> setCurrentPage((prev) => prev + 1)}>Next</button>
			</div>
		</div>
	);
}

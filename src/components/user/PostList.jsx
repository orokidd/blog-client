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
				{currentPage > 1 ? (
					<button className={styles.pageButton} onClick={() => setCurrentPage((prev) => prev - 1)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gray)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
					</button> ) : null}
				
				{currentPage === totalPages ? null : (
					<button className={styles.pageButton} onClick={()=> setCurrentPage((prev) => prev + 1)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gray)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
					</button>
				)}
				
			</div>
		</div>
	);
}

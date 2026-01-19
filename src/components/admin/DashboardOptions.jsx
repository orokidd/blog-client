import styles from "../../styles/DashboardOptions.module.css";
import { useState, useEffect } from "react";

export function DashboardOptions({ setPosts, fetchAllPosts }) {
	const [searchQuery, setSearchQuery] = useState("");

    async function searchPost() {
        const res = await fetch(`http://localhost:3000/api/posts/search?title=${searchQuery}`);
		if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setPosts(data);
    }

	useEffect(() => {
		if (searchQuery.trim() === "") {
			fetchAllPosts();
			return;
		}

		const timeout = setTimeout(searchPost, 500);

		return () => clearTimeout(timeout);
	}, [searchQuery]);

	return (
		<div className={styles.dashboardOptions}>
			<div className={styles.searchPost}>
				<form>
					<input type="text" placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
				</form>
			</div>

			<div className={styles.sortPost}>sort post</div>

			<div className={styles.newPost}>new post</div>
		</div>
	);
}

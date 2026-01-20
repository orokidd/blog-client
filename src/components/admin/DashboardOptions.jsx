import styles from "../../styles/DashboardOptions.module.css";
import { useState, useEffect } from "react";

export function DashboardOptions({ setPosts, fetchAllPosts }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [sortingOptions, setSortingOptions] = useState({
		sort: "createdAt",
		order: "desc"
	})

    async function searchPost() {
        const res = await fetch(`http://localhost:3000/api/posts/search?title=${searchQuery}&sort=${sortingOptions.sort}&order=${sortingOptions.order}`);
		if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setPosts(data);
    }

	function handleSelectChange(e) {
		setSortingOptions({...sortingOptions, sort: e.target.value})
	}

	function handleSortButton(e) {
		e.preventDefault();
		setSortingOptions({...sortingOptions, order:  sortingOptions.order === "desc" ? "asc" : "desc"})
	}

	useEffect(() => {
		if (searchQuery.trim() === "") {
			searchPost();
			return;
		}

		const timeout = setTimeout(searchPost, 500);

		return () => clearTimeout(timeout);
	}, [searchQuery, sortingOptions]);

	console.log(sortingOptions)

	return (
		<div className={styles.dashboardOptions}>
			<div className={styles.searchPost}>
				<form>
					<input type="text" placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
				</form>
			</div>

			<div className={styles.sortPost}>
				<form>
					<select name="sort-post" id="sort-post" onChange={handleSelectChange}>
						<option value="createdAt">Date Created</option>
						<option value="title">Title</option>
					</select>

					<button type="button" className={styles.sortButton} onClick={handleSortButton}>
						{sortingOptions.order}
					</button>
				</form>
			</div>

			<div className={styles.newPost}>new post</div>
		</div>
	);
}

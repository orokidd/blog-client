import styles from "../../styles/DashboardOptions.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router";

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
					<input className={styles.searchInput} type="text" placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
				</form>
			</div>

				<div className={styles.selectContainer}>
					<select name="sort-post" id="sort-post" onChange={handleSelectChange}>
						<option value="" selected disabled>Sort</option>
						<option value="createdAt">Date Created</option>
						<option value="title">Title</option>
					</select>

					<button type="button" className={styles.sortButton} onClick={handleSortButton}>
						{sortingOptions.order === 'desc' ? (
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-wide-narrow-icon lucide-arrow-down-wide-narrow"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M11 4h10"/><path d="M11 8h7"/><path d="M11 12h4"/></svg>
						) : (
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-narrow-wide-icon lucide-arrow-up-narrow-wide"><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M11 12h4"/><path d="M11 16h7"/><path d="M11 20h10"/></svg>
						)}
					</button>				
				</div>

			<div className={styles.newPost}>
				<Link to="/admin/new-post">New post</Link>
			</div>
		</div>
	);
}

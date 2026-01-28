import { Link } from "react-router";
import { useState, useEffect } from "react";
import { sortPosts } from "../../api/posts";
import styles from "../../styles/DashboardOptions.module.css";

export function DashboardOptions({ setPosts }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [sortingOptions, setSortingOptions] = useState({
		sort: "createdAt",
		order: "desc",
	});

	function handleSelectChange(e) {
		setSortingOptions({ ...sortingOptions, sort: e.target.value });
	}

	function handleSortButton(e) {
		e.preventDefault();
		setSortingOptions({ ...sortingOptions, order: sortingOptions.order === "desc" ? "asc" : "desc" });
	}

	useEffect(() => {
		async function loadPosts() {
			const sortedPosts = await sortPosts(searchQuery, sortingOptions.sort, sortingOptions.order)
			setPosts(sortedPosts);
		}

		if (searchQuery.trim() === "") {
			loadPosts();
			return;
		}

		const timeout = setTimeout(loadPosts, 500); // Delay search for half a second

		return () => clearTimeout(timeout);
	}, [searchQuery, sortingOptions, setPosts]);

	console.log(sortingOptions);

	return (
		<div className={styles.dashboardOptions}>
			<div className={styles.searchPost}>
				<form>
					<input className={styles.searchInput} type="text" placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
				</form>
			</div>

			<div className={styles.selectContainer}>
				<select name="sort-post" id="sort-post" onChange={handleSelectChange}>
					<option value="" selected disabled>
						Sort
					</option>
					<option value="createdAt">Date Created</option>
					<option value="title">Title</option>
					<option value="published">Published</option>
				</select>

				<button type="button" className={styles.sortButton} onClick={handleSortButton}>
					{sortingOptions.order === "desc" ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-arrow-down-wide-narrow-icon lucide-arrow-down-wide-narrow">
							<path d="m3 16 4 4 4-4" />
							<path d="M7 20V4" />
							<path d="M11 4h10" />
							<path d="M11 8h7" />
							<path d="M11 12h4" />
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-arrow-up-narrow-wide-icon lucide-arrow-up-narrow-wide">
							<path d="m3 8 4-4 4 4" />
							<path d="M7 4v16" />
							<path d="M11 12h4" />
							<path d="M11 16h7" />
							<path d="M11 20h10" />
						</svg>
					)}
				</button>
			</div>

			<div className={styles.newPost}>
				<Link to="/admin/new-post" className={styles.newPostLink}>
					New Post
				</Link>
			</div>
		</div>
	);
}

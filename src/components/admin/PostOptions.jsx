import { Link } from "react-router";
import styles from '../../styles/PostList.module.css'

export function PostOptions({post, setShowModal, setPostToDelete}) {
	return (
		<div className={styles.postFooter}>
			<div>
				<p className={styles.postStatus}>{post.published ? "Published" : "Unpublished"}</p>
			</div>

			<div className={styles.adminActions}>
				<div className={styles.adminEdit}>
					<Link to={`/admin/posts/${post.id}/edit`} className={styles.adminEditButton}>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gray)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
					</Link>
				</div>

				<div className={styles.adminDelete}>
					{/* <button className={styles.adminDeleteButton} onClick={() => { deletePost(post.id); }}> */}
					<button className={styles.adminDeleteButton} onClick={() => { setShowModal(true); setPostToDelete(post.id)}}>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gray)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
					</button>
				</div>
			</div>
		</div>
	);
}
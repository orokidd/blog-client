import styles from '../../styles/PostList.module.css'

export function Pagination({currentPage, totalPages, buttonHandler}) {
    return (
        <div className={styles.paginations}>
			{currentPage > 1 ? (
				<button className={styles.pageButton} onClick={() => buttonHandler((prev) => prev - 1)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gray)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
				</button> ) : null}
				
			{currentPage === totalPages ? null : (
				<button className={styles.pageButton} onClick={()=> buttonHandler((prev) => prev + 1)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gray)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
				</button>
			)}
		</div>
    )
}
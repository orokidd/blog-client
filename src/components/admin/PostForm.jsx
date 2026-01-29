import styles from '../../styles/PostForm.module.css';

export function PostForm({ formData, setFormData, handleSubmit, error }) {
	return (
		<div className={styles.wrapper}>
			{error && <div className="error">{error}</div>}

			<form className={styles.formContainer}>
				<div>
					<input className={styles.titleInput} type="text" value={formData.title} placeholder="Title" onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} />
				</div>

				<div>
					<textarea className={styles.contentTextarea} value={formData.content} placeholder="Write your blog here" onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))} />
				</div>

				<div className={styles.buttonGroup}>
					<button className={styles.draftButton} type="button" onClick={() => handleSubmit(false)}>
						Draft
					</button>

					<button className={styles.publishButton} type="button" onClick={() => handleSubmit(true)}>
						Publish
					</button>
				</div>
			</form>
		</div>
	);
}

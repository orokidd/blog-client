export default function PostForm({ formData, setFormData, handleSubmit, error, isEdit, loading }) {
	return (
		<div className="admin-new-post">
			<h2>{isEdit ? "Edit Post" : "Create New Post"}</h2>
			{error && <div className="error">{error}</div>}
            {loading && <div className="loading">Loading...</div>}
			
			<form>
				<div>
					<label>Title:</label>
					<input type="text" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} />
				</div>

				<div>
					<p>{formData.published ? "Published" : "Draft"}</p>
				</div>

				<div>
					<label>Content:</label>
					<textarea value={formData.content} onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))} />
				</div>
				<div className="button-group">
					<button type="button" onClick={() => handleSubmit(true)}>
						{isEdit ? "Update & Publish" : "Publish"}
					</button>

					<button type="button" onClick={() => handleSubmit(false)}>
						Save as Draft
					</button>
				</div>
			</form>
		</div>
	);
}

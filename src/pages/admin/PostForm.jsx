import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../../components/admin/PostForm.jsx";
import { CommentList } from "../../components/user/CommentList.jsx";
import ProtectedPage from "../ProtectedPage.jsx";
import { Header } from "../../components/Header.jsx";
import { BackButton } from "../../components/admin/BackButton.jsx";
import { DeleteModal } from "../../components/DeleteModal.jsx";

import { fetchPostContent } from "../../api/posts.js";
import { fetchPostComments } from "../../api/comments";

export default function PostFormPage() {
	const navigate = useNavigate();
	const { postId } = useParams();
	const isEdit = Boolean(postId);
	const { getToken, user } = useContext(AuthContext);

	const [comments, setComments] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [commentToDelete, setCommentToDelete] = useState(0);
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		published: false,
	});

	const handleSubmit = async (published) => {
		try {
			const dataToSend = {
				title: formData.title,
				content: formData.content,
				published: published,
			};

			const url = isEdit ? `http://localhost:3000/api/posts/${postId}` : "http://localhost:3000/api/posts";
			const method = isEdit ? "PUT" : "POST";

			const res = await fetch(url, {
				method: method,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getToken()}`,
				},
				body: JSON.stringify(dataToSend),
			});
			if (!res.ok) throw new Error(isEdit ? "Failed to update post" : "Failed to create post");

			const data = await res.json();
			console.log(isEdit ? "Post updated:" : "Post created:", data);

			navigate("/admin");
		} catch (e) {
			setError(e.message);
			console.log(e.message);
		}
	};

	const handleDeleteComment = async (commentId) => {
		try {
			const res = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getToken()}`,
				},
			});

			if (!res.ok) {
				return setError("Failed to delete comment");
			}

			const data = await res.json();
			console.log(data.message);
			setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
		} catch (error) {
			console.error("Error deleting comment:", error);
		}
	};

	useEffect(() => {
        async function loadPostAndComments() {
            try {
                const postData = await fetchPostContent(postId);
                const commentsData = await fetchPostComments(postId);

                setFormData({
					title: postData.title,
					content: postData.content,
					published: postData.published,
				});

                setComments(commentsData);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

		if (isEdit) {
			loadPostAndComments()
		}

		if (!isEdit) {
			setLoading(false);
		}
	}, [isEdit, postId]);

	return (
		<ProtectedPage>
			<Header />
			<BackButton />
			<PostForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} error={error} loading={loading} />
			<CommentList comments={comments} loading={loading} user={user} setCommentToDelete={setCommentToDelete} setShowModal={setShowModal} />
			<DeleteModal toDelete="comment" deleteComment={handleDeleteComment} showModal={showModal} setShowModal={setShowModal} commentToDelete={commentToDelete} />
		</ProtectedPage>
	);
}

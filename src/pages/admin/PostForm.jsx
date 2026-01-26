import { AuthContext } from "../../context/AuthContext.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import ProtectedPage from "../ProtectedPage.jsx";
import { Header } from "../../components/Header.jsx";
import { PostForm } from "../../components/admin/PostForm.jsx";
import { BackButton } from "../../components/admin/BackButton.jsx";
import { DeleteModal } from "../../components/DeleteModal.jsx";
import { CommentList } from "../../components/user/CommentList.jsx";

import { fetchPostComments, deleteComment } from "../../api/comments";
import { fetchPostContent, postNewPost, putEditPost } from "../../api/posts.js";

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

	const token = getToken();

	async function handleSubmit(published) {
		try {
			const dataToSend = {
				title: formData.title,
				content: formData.content,
				published: published,
			};

			if (isEdit) {
				await putEditPost(postId, dataToSend, token);
			} else {
				await postNewPost(dataToSend, token);
			}

			navigate("/admin");
		} catch (e) {
			setError(e.message);
			console.log(e.message);
		}
	}

	async function handleDeleteComment(commentId) {
		try {
			await deleteComment(commentId, token);
			setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
		} catch (error) {
			console.error("Error deleting comment:", error);
		}
	}

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
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		if (isEdit) {
			loadPostAndComments();
		} else {
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

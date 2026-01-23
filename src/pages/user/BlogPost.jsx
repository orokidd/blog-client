import { Header } from "../../components/Header";
import { PostContent } from "../../components/user/PostContent";
import { CommentForm } from "../../components/user/CommentForm";
import { CommentList } from "../../components/user/CommentList";
import { DeleteModal } from "../../components/DeleteModal";

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function BlogPost() {
	const { postId } = useParams();
	const { loggedIn, user, getToken } = useContext(AuthContext);

	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showModal, setShowModal] = useState(false)
	const [commentToDelete, setCommentToDelete] = useState(0)

	async function fetchPost() {
		try {
			const res = await fetch(`http://localhost:3000/api/posts/${postId}`);
			if (!res.ok) throw new Error("Failed to fetch data");

			const data = await res.json();
			setPost(data);
		} catch (error) {
			console.log(error);
		}
	}

	const fetchComments = async () => {
		try {
			setLoading(true);
			const res = await fetch(`http://localhost:3000/api/comments/post/${postId}`);
			const data = await res.json();

			setComments(data);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const handleNewComment = async (comment) => {
		const res = await fetch(`http://localhost:3000/api/comments/post/${postId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${getToken()}`,
			},
			body: JSON.stringify(comment),
		});

		if (!res.ok) {
			return setError("Failed to post comment");
		}

		const data = await res.json();
		console.log(data.message);
		const newComment = data.createdComment;

		setComments((prevComments) => [newComment, ...prevComments]);
		setError(null);
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
		fetchPost();
		fetchComments();
	}, [postId]);

	return (
		<>
			<Header />
			<PostContent post={post} />
			<CommentForm loggedIn={loggedIn} handleNewComment={handleNewComment} error={error} />
			<CommentList comments={comments} loading={loading} user={user} setCommentToDelete={setCommentToDelete} setShowModal={setShowModal} />
			<DeleteModal toDelete="comment" deleteComment={handleDeleteComment} showModal={showModal} setShowModal={setShowModal} commentToDelete={commentToDelete} />
		</>
	);
}

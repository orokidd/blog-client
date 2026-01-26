import { Header } from "../../components/Header";
import { PostContent } from "../../components/user/PostContent";
import { CommentForm } from "../../components/user/CommentForm";
import { CommentList } from "../../components/user/CommentList";
import { DeleteModal } from "../../components/DeleteModal";

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { fetchPostContent } from "../../api/posts";
import { fetchPostComments, postNewComment, deleteComment } from "../../api/comments";

export default function BlogPost() {
	const { postId } = useParams();
	const { loggedIn, user, getToken } = useContext(AuthContext);

	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [commentToDelete, setCommentToDelete] = useState(0);

	const token = getToken();

	async function handleNewComment(comment) {
		try {
			const newComment = await postNewComment(comment, postId, token);
			setComments((prevComments) => [newComment, ...prevComments]);
		} catch (error) {
			console.log(error);
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

				setPost(postData);
				setComments(commentsData);
			} catch (error) {
				console.error(error.message);
			} finally {
				setLoading(false);
			}
		}

		loadPostAndComments();
	}, [postId]);

	return (
		<>
			<Header />
			<PostContent post={post} />
			<CommentForm loggedIn={loggedIn} handleNewComment={handleNewComment} />
			<CommentList comments={comments} loading={loading} user={user} setCommentToDelete={setCommentToDelete} setShowModal={setShowModal} />
			<DeleteModal toDelete="comment" deleteComment={handleDeleteComment} showModal={showModal} setShowModal={setShowModal} commentToDelete={commentToDelete} />
		</>
	);
}

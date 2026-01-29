import { AuthContext } from "../../context/AuthContext.jsx";
import { useContext, useEffect, useState } from "react";

import ProtectedPage from "../ProtectedPage.jsx";
import { Header } from "../../components/Header.jsx";
import { Loading } from "../../components/Loading.jsx";
import { PostList } from "../../components/admin/PostList.jsx";
import { DeleteModal } from "../../components/DeleteModal.jsx";
import { DashboardOptions } from "../../components/admin/DashboardOptions.jsx";

import { fetchAllPosts, deletePost } from "../../api/posts.js";

export default function AdminDashboard() {
	const { getToken } = useContext(AuthContext);

	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [postToDelete, setPostToDelete] = useState(0);

	const token = getToken();

	async function handleDeletePost(postId) {
		try {
			await deletePost(postId, token);
			setPosts(posts.filter((post) => post.id !== postId));
		} catch (e) {
			setError(e.message);
			console.log(e.message);
		}
	}

	useEffect(() => {
		async function loadAllPosts() {
			try {
				const posts = await fetchAllPosts();
				setPosts(posts);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		loadAllPosts();
	}, []);

	if (loading) return <Loading />;

	return (
		<ProtectedPage>
			<Header />
			<DashboardOptions setPosts={setPosts} />
			<PostList posts={posts} setShowModal={setShowModal} setPostToDelete={setPostToDelete} error={error} />
			<DeleteModal toDelete="post" deletePost={handleDeletePost} showModal={showModal} setShowModal={setShowModal} postToDelete={postToDelete} />
		</ProtectedPage>
	);
}

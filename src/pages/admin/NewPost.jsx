import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../../components/admin/PostForm.jsx";
import PostComments from "../../components/admin/PostComments.jsx";
import ProtectedPage from "../ProtectedPage.jsx";

export default function AdminPost() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const isEdit = Boolean(postId);
    const { getToken } = useContext(AuthContext);
    
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading]  = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        published: false
    });
    
    const fetchPost = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/posts/${postId}`);
            if (!res.ok) throw new Error("Failed to fetch post");

            const data = await res.json();
            setFormData({
                title: data.title,
                content: data.content,
                published: data.published
            });
            setLoading(false)
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    }

    const handleSubmit = async (published) => {
        try {
            const dataToSend = {
                title: formData.title,
                content: formData.content,
                published: published
            };

            const url = isEdit ? `http://localhost:3000/api/posts/${postId}` : 'http://localhost:3000/api/posts';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify(dataToSend)
            });
            if (!res.ok) throw new Error(isEdit ? "Failed to update post" : "Failed to create post");

            const data = await res.json();
            console.log(isEdit ? "Post updated:" : "Post created:", data);

            navigate('/admin');
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    }

    const fetchComments = async () => {
		try {
			const res = await fetch(`http://localhost:3000/api/comments/post/${postId}`);
			const data = await res.json();

			setComments(data);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
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
        if (isEdit) {
            fetchPost();
            fetchComments();
        }

        if (!isEdit) {
            setLoading(false);
        }
    }, [isEdit, postId]);

    return (
        <ProtectedPage>
            <PostForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} error={error} isEdit={isEdit} loading={loading} />
            <PostComments comments={comments} handleDeleteComment={handleDeleteComment} loading={loading} error={error} isEdit={isEdit} />
        </ProtectedPage>
    )
}
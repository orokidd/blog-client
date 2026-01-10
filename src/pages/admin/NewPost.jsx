import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useParams, useNavigate } from "react-router-dom";
import AdminPostForm from "../../components/admin/AdminPostForm.jsx";
import ProtectedPage from "../ProtectedPage.jsx";

export default function AdminPost() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const isEdit = Boolean(postId);
    const { getToken } = useContext(AuthContext);
    
    const [error, setError] = useState(null);
    const [loading, setLoading]  = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        published: false
    });
    
    const fetchPost = async () => {
        setLoading(true);
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

    useEffect(() => {
        if (isEdit) {
            fetchPost();
        }
    }, [isEdit, postId]);

    return (
        <ProtectedPage>
            <AdminPostForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} error={error} isEdit={isEdit} loading={loading} />
        </ProtectedPage>
    )
}
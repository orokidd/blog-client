import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AdminPostForm() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const isEdit = Boolean(postId);
    const { getToken } = useContext(AuthContext);
    const [error, setError] = useState(null);
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
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    }

    const handleSubmit = async (published) => {
        setError(null);

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
    }, [isEdit]);

    return (
        <div className="admin-new-post">
            <h2>{isEdit ? "Edit Post" : "Create New Post"}</h2>
            {error && <div className="error">{error}</div>}
            <form>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                    />
                </div>

                <div>
                    <p>{formData.published ? "Published" : "Draft"}</p>
                </div>

                <div>
                    <label>Content:</label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
                    />
                </div>
                <div className="button-group">
                    <button type="button" onClick={() => handleSubmit(true)}>
                        {isEdit ? "Update & Publish" : "Publish"}
                    </button>

                    <button type="button" onClick={() => handleSubmit(false)}>
                        {isEdit ? "Update Draft" : "Save as Draft"}
                    </button>                
                </div>
            </form>
        </div>
    )
}
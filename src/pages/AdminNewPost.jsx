import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import ProtectedPage from "./ProtectedPage.jsx";

export default function AdminNewPost() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        published: false
    })
    const [error, setError] = useState(null);
    const { getToken } = useContext(AuthContext);

    const handleSubmit = async (published) => {
        setError(null);

        try {
            const dataToSend = {
                title: formData.title,
                content: formData.content,
                published: published
            };

            const res = await fetch('http://localhost:3000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify(dataToSend)
            });
            if (!res.ok) throw new Error("Failed to create post");

            const data = await res.json();
            console.log("Post created successfully:", data);

            setFormData({
                title: '',
                content: '',
                published: false
            });
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    }

    return (
        <ProtectedPage>
        <div className="admin-new-post">
            <h2>Create New Post</h2>
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
                    <label>Content:</label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
                    />
                </div>
                <div className="button-group">
                    <button type="button" onClick={() => { handleSubmit(true) }}>Publish</button>
                    <button type="button" onClick={() => { handleSubmit(false) }}>Save as Draft</button>
                </div>
            </form>
        </div>
        </ProtectedPage>
    )
}
import { useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link, useNavigate} from 'react-router-dom';

export function LoginForm() {
    const navigate = useNavigate();
    const { login, user } = useContext(AuthContext)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json();
            if (!response.ok) throw new Error(data.message)

            login(data.token)
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        if (user && user.role === 'admin') {
            navigate('/admin');
        } else if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className="form-container">
            <div className="error">
                {error}
            </div>
            <form onSubmit={handleSubmit} className="form-login">
                <div className="form-header">
                    <h1>Login</h1>
                </div>

                <div className="form-content">
                    <div className="input-group">
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" onChange={handleChange} required/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" onChange={handleChange} required/>
                    </div>
                </div>
                
                <div className="form-options">
                    <div className="buttons-group">
                        <button type="submit">Login</button>
                    </div>
                </div>
            </form>

            <div className="register-text">
                <Link to="/register">Register</Link>
            </div>
        </div>
    )
}
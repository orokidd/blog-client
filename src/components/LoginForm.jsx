import { useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext)

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const [error, setError] = useState('')

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
            navigate('/')
        } catch (error) {
            setError(error.message)
        }
    }

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
                        <label htmlFor="">Username: </label>
                        <input type="text" name="username" onChange={handleChange}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Password: </label>
                        <input type="password" name="password" onChange={handleChange}/>
                    </div>
                </div>
                
                <div className="form-options">
                    <div className="buttons-group">
                        <button type="submit">Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
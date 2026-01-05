import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    })

    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)

        if (formData.password !== formData.password_confirmation) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                setError(data.message || "Failed to register");
                throw new Error("Failed to register")
            }
            const data = await response.json();
            console.log(data)
            navigate('/login')
        } catch (err) {
            console.log(err)
        }

    }


    return (
        <div className="form-container">
            <div className="error">
                {error}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                </div>

                <div className="input-group">
                    <label htmlFor="passwordConfirmation">Confirm Password</label>
                    <input type="password" name="passwordConfirmation" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                </div>

                <div className="button-group">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

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
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message)
            }

            console.log(data)
            navigate('/login')
        } catch (err) {
            setError(err.message)
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
                    <input type="text" name="username" onChange={handleChange} />
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" onChange={handleChange} />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={handleChange} />
                </div>

                <div className="input-group">
                    <label htmlFor="passwordConfirmation">Confirm Password</label>
                    <input type="password" name="passwordConfirmation" onChange={handleChange} />
                </div>

                <div className="button-group">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}
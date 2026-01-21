import {RegisterForm} from "../components/RegisterForm";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate} from 'react-router-dom';

export default function Register() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            if (user?.role === 'ADMIN') {
                navigate('/admin');
            } else if (user) {
                navigate('/');
            } else if (!user) {
                setLoading(false)
            }
        }, [user, navigate]);
    
    if (loading) {
        return <div className="loading">Loading...</div>;
    }
    
    return (
        <>
            <RegisterForm />
        </>
    )
}
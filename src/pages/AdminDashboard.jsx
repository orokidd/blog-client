import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";
import {Navigate} from "react-router-dom";
import NotAllowed from "../components/NotAllowed.jsx";

export default function AdminDashboard() {
    const { user, loggedIn, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="loading">Loading authentication...</div>;
    }

    if (!loggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== "ADMIN") {
        return <NotAllowed />
    }

    return (
        <div className="dashboard">
            <h1>This is the admin page.</h1>
        </div>
    )
}
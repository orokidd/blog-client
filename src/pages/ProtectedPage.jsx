import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";
import {Navigate} from "react-router-dom";
import Error from "./Error.jsx";

export default function ProtectedPage({children}) {
    const { user, loggedIn, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="loading">Loading authentication...</div>;
    }

    if (!loggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== "ADMIN") {
        return <Error errorType="role" />;
    }

    return (
        <div className="protected-page">
            {children}
        </div>
    )
}
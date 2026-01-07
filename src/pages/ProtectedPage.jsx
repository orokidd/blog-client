import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";
import {Navigate} from "react-router-dom";
import NotAllowed from "../components/NotAllowed.jsx";
import {AdminPostList} from "../components/admin/AdminPostList";
import { PostList } from "../components/PostList.jsx";

export default function ProtectedPage({children}) {
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
        <div className="protected-page">
            {children}
        </div>
    )
}
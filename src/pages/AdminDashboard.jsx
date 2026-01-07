import AdminPostList from "../components/admin/AdminPostList.jsx";
import ProtectedPage from "./ProtectedPage.jsx";

export default function AdminDashboard() {
    return (
        <ProtectedPage>
            <div className="dashboard">
                <h1>This is the admin page.</h1>
                <AdminPostList />
            </div>
        </ProtectedPage>
    )
}
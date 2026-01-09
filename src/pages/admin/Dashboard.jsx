import AdminPostList from "../../components/admin/AdminPostList.jsx";
import ProtectedPage from "../ProtectedPage.jsx";

export default function AdminDashboard() {
    return (
        <ProtectedPage>
            <AdminPostList />
        </ProtectedPage>
    )
}
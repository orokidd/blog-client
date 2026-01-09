import AdminPostForm from "../../components/admin/AdminPostForm.jsx";
import ProtectedPage from "../ProtectedPage.jsx";

export default function AdminPost() {
    return (
        <ProtectedPage>
            <AdminPostForm />
        </ProtectedPage>
    )
}
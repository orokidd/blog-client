import styles from '../styles/DeleteModal.module.css'
import { useNavigate } from 'react-router';

export function DeleteModal({toDelete, deletePost, showModal, setShowModal, postToDelete, deleteComment, commentToDelete}) {
    const navigate = useNavigate()

    function handleDelete() {
        if (toDelete === "post") {
            deletePost(postToDelete);
            navigate("/admin");
            setShowModal(false);
        } else {
            deleteComment(commentToDelete);
            setShowModal(false);
        }
    }

    return (
        <div className={`${styles.wrapper} ${showModal ? styles.active : ""}`}>
            <div className={styles.modalContent}>
                <div className="text">
                    {`Are you sure you want to delete this ${toDelete === "post" ? "post" : "comment"}?`}
                </div>

                <div className={styles.buttonGroup}>
                    <button className={styles.cancelButton} onClick={() => setShowModal(false)}>Cancel</button>
                    <button className={styles.confirmButton} onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

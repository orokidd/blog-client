import styles from '../styles/DeleteModal.module.css'
import { useNavigate } from 'react-router';

export function DeleteModal({deletePost, showModal, setShowModal, postToDelete}) {
    const navigate = useNavigate()

    return (
        <div className={`${styles.wrapper} ${showModal ? styles.active : ""}`}>
            <div className={styles.modalContent}>
                <div className="text">
                    Are you sure you want to delete?
                </div>

                <div className={styles.buttonGroup}>
                    <button className={styles.cancelButton} onClick={() => setShowModal(false)}>Cancel</button>
                    <button className={styles.confirmButton} onClick={() => { deletePost(postToDelete); navigate("/") }}>Delete</button>
                </div>
            </div>
        </div>
    )
}

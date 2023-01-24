import ReactDom from 'react-dom';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/delete.json';
import styles from './DeleteModal.module.css';


export const DeleteModal = ({ open, name, onCancel, onDelete }) => {
  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />

        <h1>Are you sure?</h1>
        <p>
          Do you really want to delete <span className="item_name">{name}</span> ? This process
          cannot be undone.
        </p>
        <div className={styles.btn_wrapper}>
          <button className={styles.cancel_btn} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.delete_btn} onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

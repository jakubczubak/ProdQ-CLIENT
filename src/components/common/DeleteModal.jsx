// Importy zewnętrzne
import React from 'react';
import ReactDom from 'react-dom';
import Lottie from 'lottie-react';

// Importy lokalne
import styles from './css/DeleteModal.module.css';
import animation from '../../assets/Lottie/delete.json';

export const DeleteModal = ({ open, name, onCancel, onDelete, text }) => {
  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <Lottie animationData={animation} loop={false} className={styles.animation} />
        <h1>Are you sure?</h1>
        <p>
          Do you really want to delete <span className={styles.item_name}>{name}</span> {text}? This
          process cannot be undone.
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
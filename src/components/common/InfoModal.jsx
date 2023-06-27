import React from 'react';
import ReactDom from 'react-dom';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/info.json';
import styles from './css/InfoModal.module.css';

export const InfoModal = ({ open, onCancel, onConfirm, text }) => {
  if (!open) {
    return null;
  }
  return ReactDom.createPortal(
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />

        <h1>Are you sure?</h1>
        <p>{text} This process cannot be undone.</p>
        <div className={styles.btn_wrapper}>
          <button className={styles.cancel_btn} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.confirm_btn} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

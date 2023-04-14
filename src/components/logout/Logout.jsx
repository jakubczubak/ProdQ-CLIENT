import styles from './Logout.module.css';
import ReactDom from 'react-dom';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/logout.json';

export const Logout = ({ open, onCancel, onLogout }) => {
  if (!open) {
    return null;
  }
  return ReactDom.createPortal(
    <div>
      <div className={styles.modal_container}>
        <div className={styles.modal}>
          <Lottie animationData={animation} loop={true} className={styles.animation} />

          <h1>Are you sure you want to logout?</h1>
          <div className={styles.btn_wrapper}>
            <button className={styles.logout_btn} onClick={onLogout}>
              Logout
            </button>
            <button className={styles.cancel_btn} onClick={onCancel}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

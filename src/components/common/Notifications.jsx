//Importy zewnętrzne
import { Snackbar } from '@mui/material';
import ReactDom from 'react-dom';
import Lottie from 'lottie-react';
//Importy wewnętrzne
import styles from './css/Notifications.module.css';
import info from '../../assets/Lottie/alert/info.json';
import success from '../../assets/Lottie/alert/success.json';
import error from '../../assets/Lottie/alert/error.json';
import warning from '../../assets/Lottie/alert/warning.json';

export const Notifications = ({ open, onClose, severity, message, anchorOrigin }) => {
  //dopisac kod do seveity

  return ReactDom.createPortal(
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={anchorOrigin ? anchorOrigin : { vertical: 'bottom', horizontal: 'center' }}>
      <button className={styles.button}>
        {severity === 'info' && (
          <Lottie animationData={info} className={styles.animation} loop={false} />
        )}
        {severity === 'success' && (
          <Lottie animationData={success} className={styles.animation} loop={false} />
        )}
        {severity === 'error' && (
          <Lottie animationData={error} className={styles.animation} loop={false} />
        )}
        {severity === 'warning' && (
          <Lottie animationData={warning} className={styles.animation} loop={false} />
        )}
        {message}
      </button>
    </Snackbar>,
    document.getElementById('notifications')
  );
};

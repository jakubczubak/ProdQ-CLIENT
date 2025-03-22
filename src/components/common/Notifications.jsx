import { Snackbar } from '@mui/material';
import ReactDom from 'react-dom';
import Lottie from 'lottie-react';
import styles from './css/Notifications.module.css';
import info from '../../assets/Lottie/alert/info.json';
import success from '../../assets/Lottie/alert/success.json';
import error from '../../assets/Lottie/alert/error.json';
import warning from '../../assets/Lottie/alert/warning.json';

export const Notifications = ({ open, onClose, severity, message, anchorOrigin }) => {
  const severityStyles = {
    info: { background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)' },
    success: { background: 'linear-gradient(90deg, #2e7d32 0%, #4caf50 100%)' },
    error: { background: 'linear-gradient(90deg, #d32f2f 0%, #ef5350 100%)' },
    warning: { background: 'linear-gradient(90deg, #f57c00 0%, #ff9800 100%)' },
  };

  const animationData = {
    info,
    success,
    error,
    warning,
  };

  return ReactDom.createPortal(
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={anchorOrigin || { vertical: 'bottom', horizontal: 'center' }}
      sx={{ animation: 'fadeIn 0.5s ease-in-out' }}
    >
      <button
        className={styles.button}
        style={severityStyles[severity] || severityStyles.info}
      >
        {severity in animationData && (
          <Lottie animationData={animationData[severity]} className={styles.animation} loop={false} />
        )}
        <span className={styles.message}>{message}</span>
      </button>
    </Snackbar>,
    document.getElementById('notifications')
  );
};
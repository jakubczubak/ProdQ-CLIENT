// Importy zewnętrzne
import ReactDom from 'react-dom';
import Lottie from 'lottie-react';
import { Button } from '@mui/material';

// Importy lokalne
import styles from './css/Logout.module.css';
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
            <Button
              onClick={onLogout}
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
                borderRadius: '12px',
                padding: '14px 30px', // Zwiększony padding
                minWidth: '140px', // Zwiększona minimalna szerokość
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '18px', // Większa czcionka
                boxShadow: '0 4px 12px rgba(74, 144, 226, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)',
                  boxShadow: '0 6px 16px rgba(74, 144, 226, 0.5)',
                  transform: 'translateY(-2px)',
                },
                color: '#fff',
              }}
            >
              Logout
            </Button>
            <Button
              onClick={onCancel}
              variant="contained"
              size="large"
              sx={{
                background: '#fff',
                borderRadius: '12px',
                padding: '14px 30px', // Zwiększony padding
                minWidth: '140px', // Zwiększona minimalna szerokość
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '18px', // Większa czcionka
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                color: '#4a90e2',
                border: '1px solid #4a90e2',
                '&:hover': {
                  background: '#f0f0f0',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
import React from 'react';
import ReactDOM from 'react-dom';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import styles from './css/Notification.module.css';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/notification.json';
import { IconButton, Tooltip, Button } from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearAllIcon from '@mui/icons-material/ClearAll';

export const Notification = ({ onClose }) => {
  const cartRef = useRef(null);
  const [items] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClose = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className={styles.modal_container}
      onClick={handleClose}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === 'Space') {
          handleClose();
        }
      }}
      tabIndex="0"
      role="button">
      <div className={styles.notification} ref={cartRef}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
        <h2 className={styles.header}>Number of notifications: 2</h2>
        <div className={styles.line} />
        <div className={styles.list}>
          {items.map((item, index) => (
            <div key={index} className={styles.list_item}>
              <Tooltip title={item.name} placement="top">
                <span className={styles.item_name}>
                  {index + 1}. {item.name}
                </span>
              </Tooltip>

              <Tooltip title="Remove item" placement="top">
                <IconButton>
                  <DeleteForeverIcon color="warning" />
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </div>
        <div className={styles.line} />
        <div className={styles.btn_wrapper}>
          <Button endIcon={<ClearAllIcon />}>
            <span className={styles.btn_text}>Clear all</span>
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

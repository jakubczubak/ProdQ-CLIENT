import React from 'react';
import ReactDOM from 'react-dom';
import { useRef} from 'react';
import { useEffect } from 'react';
import styles from './css/Notification.module.css';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/notification.json';
import { IconButton, Tooltip, Button, Avatar } from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import CheckIcon from '@mui/icons-material/Check';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import icon from '../../assets/system.svg';

export const Notification = ({ onClose, notificationList }) => {
  const cartRef = useRef(null);

  function getInitials(name) {
    const nameParts = name.split(' ');
    const initials = nameParts.map((part) => part.charAt(0)).join('');
    return initials;
  }

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
          {notificationList.map((item, index) => (
            <div key={index} className={styles.list_item}>
              <div className={styles.author_wrapper}>
                <Tooltip title={item.author} placement="top">
                  {item.author === 'Infrabox' ? (
                    <Avatar
                      alt="Infrabox"
                      src={icon}
                      sx={{
                        width: 40,
                        height: 40
                      }}
                    />
                  ) : (
                    <Avatar>{getInitials(item.author)}</Avatar>
                  )}
                </Tooltip>
              </div>
              <div className={styles.content_wrapper}>
                <div className={styles.content_title}>
                  <Tooltip title={item.title} placement="top-start">
                    <span>{item.title}</span>
                  </Tooltip>
                </div>
                <div className={styles.content_text}>
                  <Tooltip title={item.description} placement="top-start">
                    <span>{item.description}</span>
                  </Tooltip>
                </div>
                <div className={styles.content_date}>
                  <Tooltip title={item.date} placement="top">
                    <span>{item.date}</span>
                  </Tooltip>
                </div>
              </div>
              <div className={styles.action_wrapper}>
                <Tooltip title="Archive" placement="top">
                  <IconButton>
                    <CheckIcon
                      sx={{
                        height: 20,
                        width: 20
                      }}
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete" placement="top">
                  <IconButton>
                    <DeleteForeverIcon
                      sx={{
                        height: 20,
                        width: 20
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.line} />
        <div className={styles.btn_wrapper}>
          <Button endIcon={<Inventory2OutlinedIcon />} size="small">
            <span className={styles.btn_text}>Archives</span>
          </Button>
          <Button endIcon={<ClearAllIcon />} size="small">
            <span className={styles.btn_text}>Clear</span>
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

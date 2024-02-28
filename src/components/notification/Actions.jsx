//Importy zewnętrze
import React from 'react';
import { Tooltip, Button } from '@mui/material';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
//Importy lokalne
import styles from './css/NotificationComponent.module.css';

export const Actions = ({
  isRead,
  setIsRead,
  handleDeleteReadNotifications,
  handleDeleteUnreadNotifications
}) => {
  return (
    <div className={styles.btn_wrapper}>
      {!isRead && (
        <Tooltip title="View all archived notifications" placement="top">
          <Button endIcon={<Inventory2OutlinedIcon />} size="small" onClick={() => setIsRead(true)}>
            <span className={styles.btn_text}>Archives</span>
          </Button>
        </Tooltip>
      )}

      {isRead && (
        <Tooltip title="Back to unread notifications" placement="top">
          <Button endIcon={<ReplyOutlinedIcon />} size="small" onClick={() => setIsRead(false)}>
            <span className={styles.btn_text}>Back</span>
          </Button>
        </Tooltip>
      )}
      {isRead && (
        <Tooltip title="Delete read notifications" placement="top">
          <Button endIcon={<ClearAllIcon />} size="small" onClick={handleDeleteReadNotifications}>
            <span className={styles.btn_text}>Clear</span>
          </Button>
        </Tooltip>
      )}
      {!isRead && (
        <Tooltip title="Delete unread notifications" placement="top">
          <Button endIcon={<ClearAllIcon />} size="small" onClick={handleDeleteUnreadNotifications}>
            <span className={styles.btn_text}>Clear</span>
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

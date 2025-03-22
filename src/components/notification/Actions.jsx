import React from 'react';
import { Tooltip, Button } from '@mui/material';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
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
          <Button
            endIcon={<Inventory2OutlinedIcon />}
            size="small"
            onClick={() => setIsRead(true)}
            sx={{
              background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
              padding: '4px 16px',
              color: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              '&:hover': { background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)' },
            }}
          >
            <span className={styles.btn_text}>Archives</span>
          </Button>
        </Tooltip>
      )}
      {isRead && (
        <Tooltip title="Back to unread notifications" placement="top">
          <Button
            endIcon={<ReplyOutlinedIcon />}
            size="small"
            onClick={() => setIsRead(false)}
            sx={{
              background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
              padding: '4px 16px',
              color: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              '&:hover': { background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)' },
            }}
          >
            <span className={styles.btn_text}>Back</span>
          </Button>
        </Tooltip>
      )}
      {isRead && (
        <Tooltip title="Delete read notifications" placement="top">
          <Button
            endIcon={<ClearAllIcon />}
            size="small"
            onClick={handleDeleteReadNotifications}
        
          >
            <span className={styles.btn_text}>Clear</span>
          </Button>
        </Tooltip>
      )}
      {!isRead && (
        <Tooltip title="Delete unread notifications" placement="top">
          <Button
            endIcon={<ClearAllIcon />}
            size="small"
            onClick={handleDeleteUnreadNotifications}
           
          >
            <span className={styles.btn_text}>Clear</span>
          </Button>
        </Tooltip>
      )}
    </div>
  );
};
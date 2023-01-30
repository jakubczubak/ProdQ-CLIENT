import React from 'react';
import styles from './Header.module.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Avatar } from '@mui/material';
import { useState } from 'react';

export const Header = () => {
  const [notifications] = useState(2);
  const [user] = useState('JC');

  return (
    <div className={styles.header_container}>
      <Badge color="primary" badgeContent={notifications} className={styles.icon}>
        <NotificationsIcon />
      </Badge>
      <Avatar className={styles.icon}>{user}</Avatar>
    </div>
  );
};

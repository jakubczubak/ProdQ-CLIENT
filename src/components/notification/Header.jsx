//Importy zewnętrzne
import React from 'react';
//Importy lokalne
import styles from './css/NotificationComponent.module.css';

export const Header = ({ isRead, notifications }) => {
  return (
    <h2 className={styles.header}>
      Number of {isRead ? 'read' : 'unread'} notifications:
      {notifications.filter((notification) => notification.read == isRead).length}
    </h2>
  );
};

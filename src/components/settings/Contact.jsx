import React from 'react';
import styles from './css/Contact.module.css';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/infinite.json';
import { IconButton, Tooltip } from '@mui/material';

export const Contact = () => {
  const author = 'Jakub Czubak';
  const version = '1.0.0';
  const email = 'czubakjakub94@gmail.com';
  const date = '2024-01-01';
  const title = 'INFRABOX';

  return (
    <div className={styles.contact_section}>
      <Lottie animationData={animation} loop={true} className={styles.animation} />
      <h3 className={styles.title}>{title}</h3>
      <h3 className={styles.version}>Version: {version}</h3>
      <h3 className={styles.date}>Date: {date}</h3>
      <h3 className={styles.author}>Author: {author}</h3>
      <p className={styles.contact_text}>
        If you have any questions or suggestions, click below to contact me
      </p>
      <div className={styles.icon_wrapper}>
        <Tooltip title="Send me an email" arrow>
          <IconButton onClick={() => window.open(`mailto:${email}`)} disableRipple>
            <img src={require('../../assets/email.png')} alt="Email" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

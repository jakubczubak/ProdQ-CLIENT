import React from 'react';
import styles from './css/Contact.module.css';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/infinite.json';
import github_icon from '../../assets/github_icon.svg';
import google_icon from '../../assets/google_icon.svg';
import { IconButton, Tooltip } from '@mui/material';

export const Contact = () => {
  const author = 'Jakub Czubak';
  const version = '1.0.0';
  const email = 'czubakjakub94@gmail.com';
  const date = '2023-04-05';
  const title = 'INFRABOX';

  return (
    <div className={styles.contact_section}>
      <Lottie animationData={animation} loop={true} className={styles.animation} />
      <h3 className={styles.title}>{title}</h3>
      <h3 className={styles.version}>Version: {version}</h3>
      <h3 className={styles.date}>Date: {date}</h3>
      <h3 className={styles.author}>Author: {author}</h3>
      <p>If you have any questions or suggestions, click below to contact me</p>
      <div className={styles.icon_wrapper}>
        <Tooltip title="Send me an email" arrow>
          <IconButton onClick={() => window.open(`mailto:${email}`)} disableRipple>
            <img className={styles.logo} src={google_icon} alt="email" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Visit my GitHub profile" arrow>
          <IconButton onClick={() => window.open('https://github.com/jakubczubak')} disableRipple>
            <img className={styles.logo} src={github_icon} alt="logo" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

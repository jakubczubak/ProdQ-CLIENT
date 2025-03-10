//Importy zewnętrzne
import React from 'react';
import Lottie from 'lottie-react';
import { IconButton, Tooltip } from '@mui/material';
//Importy loklane
import styles from './css/Contact.module.css';
import animation from '../../assets/Lottie/infinite.json';

export const Contact = () => {
  const author = 'Jakub Czubak';
  const version = `${process.env.REACT_APP_VERSION}`;
  const email = 'czubakjakub94@gmail.com';
  const last_update = `${process.env.REACT_APP_UPDATE_DATE}`;
  const title = `${process.env.REACT_APP_TITLE}`;

  return (
    <div className={styles.contact_section}>
      <Lottie animationData={animation} loop={true} className={styles.animation} />
      <h3 className={styles.title}>{title}</h3>
      <h3 className={styles.version}>
        version: <span>{version}</span>
      </h3>
      <h3 className={styles.date}>
        last update: <span>{last_update}</span>{' '}
      </h3>
      <h3 className={styles.author}>
        author: <span>{author}</span>
      </h3>
      <div className={styles.img_wrapper}>
        <img src={require('../../assets/icons/react.png')} alt="React" />
        <img src={require('../../assets/icons/springboot.png')} alt="Orders" />
        <img src={require('../../assets/icons/docker.png')} alt="Orders" />
      </div>
      <p className={styles.contact_text}>
        If you have any questions or suggestions, <span>click below</span> to contact me
      </p>
      <div className={styles.icon_wrapper}>
        <Tooltip PopperProps={{ disablePortal: true }} title="Send me an email" arrow>
          <IconButton
            onClick={() => {
              window.location.href = `mailto:${email}`;
            }}
            disableRipple>
            <img src={require('../../assets/email.png')} alt="Email" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

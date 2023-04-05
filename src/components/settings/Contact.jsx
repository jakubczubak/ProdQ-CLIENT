import React from 'react';
import styles from './css/Contact.module.css';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/react_logo.json';

export const Contact = () => {
  const author = 'Jakub Czubak';
  const version = '1.0.0';
  const email = 'czubakjakub94@gmail.com';
  const date = '2023-04-05';
  const react = '18.2.0';
  const title = 'INFRABOX';

  return (
    <div className={styles.contact_section}>
      <Lottie animationData={animation} loop={true} className={styles.animation} />
      <h3 className={styles.title}>{title}</h3>
      <h3 className={styles.version}>Version: {version}</h3>
      <h3 className={styles.date}>Date: {date}</h3>
      <h3 className={styles.react}>React: {react}</h3>
      <h3 className={styles.author}>Author: {author}</h3>

      <p>
        If you have any questions or suggestions, please contact us at{' '}
        <a className={styles.email} href={`mailto:${email}`}>
          {email}
        </a>
      </p>
    </div>
  );
};

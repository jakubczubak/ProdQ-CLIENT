import React from 'react';
import styles from './css/Contact.module.css';

export const Contact = () => {
  const author = 'Jakub Czubak';
  const version = '1.0.0';
  const email = 'czubakjakub94@gmail.com';

  return (
    <div className={styles.contact_section}>
      <h2 className={styles.author}>Author: {author}</h2>
      <h3 className={styles.version}>Version: {version}</h3>
      <p>
        If you have any questions or suggestions, please contact us at{' '}
        <a className={styles.email} href={`mailto:${email}`}>
          {email}
        </a>
        .
      </p>
    </div>
  );
};

// Importy zewnętrzne
import React from 'react';
import Lottie from 'lottie-react';
// Importy lokalne
import styles from './css/UserDetails.module.css';
import animation from '../../assets/Lottie/my_profile.json';

export const UserOverview = ({ data }) => {
  return (
    <div className={styles.user_overview}>
      <div className={styles.user_overview_logo}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
      </div>
      <div className={styles.user_overview_details}>
        <p className={styles.user_overview_details_fullname}>
          {data.firstName + ' ' + data.lastName}
        </p>
        <p className={styles.user_overview_details_email}>{data.email}</p>
      </div>
    </div>
  );
};

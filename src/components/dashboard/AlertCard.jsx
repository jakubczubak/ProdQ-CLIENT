import React from 'react';
import styles from './css/Dashboard.module.css';

export const AlertCard = ({ icon, color, value, label }) => {
  return (
    <div className={styles.alert_card}>
      <div className={styles.icon_wrapper}>
        {React.cloneElement(icon, { color, sx: { width: '30px', height: '30px' } })}
      </div>
      <div>
        <p className={styles.alert_value}>{value}</p>
        <p className={styles.alert_text}>{label}</p>
      </div>
    </div>
  );
};

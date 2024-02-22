//Importy zewnętrzne
import React from 'react';
import Lottie from 'lottie-react';
//Importy loklane
import animation from '../../assets/Lottie/no_price_data.json';
import styles from './css/PriceChart.module.css';

export const NoDataChart = ({ onCancel }) => (
  <div className={styles.chart_container}>
    <div className={styles.chart}>
      <div className={styles.no_data}>No price history</div>
      <div className={styles.no_data_animation}>
        <Lottie animationData={animation} className={styles.animation} />
      </div>
      <div className={styles.btn_wrapper}>
        <button className={styles.cancel_btn} onClick={onCancel}>
          OK
        </button>
      </div>
    </div>
  </div>
);

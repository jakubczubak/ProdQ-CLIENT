import React from 'react';
import ReactDom from 'react-dom';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/info.json';
import styles from './css/PriceChart.module.css';
import { Chart } from 'react-google-charts';

export const PriceChart = ({ open, data }) => {
  if (!open) {
    return null;
  }

  const chartData = [
    ['Data', 'Cena'],
    ['2023-07-01', 10],
    ['2023-07-02', 15],
    ['2023-07-03', 12],
    ['2023-07-04', 8],
    ['2023-07-05', 11],
    ['2023-07-06', 14],
    ['2023-07-07', 13]
  ];

  return ReactDom.createPortal(
    <div className={styles.chart_container}>
      <div className={styles.chart}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />

        <h1>Are you sure?</h1>
        <Chart
          width={'100%'}
          height={'400px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            hAxis: {
              title: 'Data'
            },
            vAxis: {
              title: 'Cena'
            }
          }}
        />
        <div className={styles.btn_wrapper}>
          <button className={styles.cancel_btn}>Cancel</button>
          <button className={styles.confirm_btn}>Confirm</button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

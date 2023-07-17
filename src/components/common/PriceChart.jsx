import React from 'react';
import ReactDom from 'react-dom';

import styles from './css/PriceChart.module.css';
import { Chart } from 'react-google-charts';

export const PriceChart = ({ open, onCancel, data }) => {
  if (!open) {
    return null;
  }

  data = [];
  const chartData = [
    ['Data', 'Price (PLN/kg)'],
    ...data.sort((a, b) => new Date(a[0]) - new Date(b[0])) // Sortowanie tablicy po dacie
  ];

  return ReactDom.createPortal(
    <div className={styles.chart_container}>
      <div className={styles.chart}>
        <Chart
          width={'100%'}
          height={'400px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            vAxis: {
              title: 'Price (PLN/kg)'
            },
            backgroundColor: 'transparent',
            curveType: 'function'
          }}
        />
        <div className={styles.btn_wrapper}>
          <button className={styles.cancel_btn} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

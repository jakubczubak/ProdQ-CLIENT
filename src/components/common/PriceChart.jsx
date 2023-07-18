import React from 'react';
import ReactDom from 'react-dom';

import styles from './css/PriceChart.module.css';
import { Chart } from 'react-google-charts';
import animation from '../../assets/Lottie/no_price_data.json';
import Lottie from 'lottie-react';

export const PriceChart = ({ open, onCancel, data }) => {
  if (!open) {
    return null;
  }

  if (data.length === 0) {
    return (
      <div className={styles.chart_container}>
        <div className={styles.chart}>
          <div className={styles.no_data}>No price history</div>
          <div className={styles.no_data_animation}>
            <Lottie animationData={animation} className={styles.aniamtion} />
          </div>
          <div className={styles.btn_wrapper}>
            <button className={styles.cancel_btn} onClick={onCancel}>
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }
  const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = [
    ['Data', 'Price (PLN/kg)'],
    ...sortedData.map((item) => [item.date, parseFloat(item.pricePerKg)])
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
            hAxis: {
              format: 'dd.MM.yyyy',
              slantedText: true,
              slantedTextAngle: 45,
              textStyle: {
                fontSize: 12
              },
              viewWindow: {
                max: 20
              },
              ticks: 'auto'
            },
            colors: ['#1a73e8'],
            backgroundColor: 'transparent',
            curveType: 'monotone',
            legend: 'none',
            chartArea: {
              width: '80%',
              height: '70%'
            },
            lineWidth: 2,

            tooltip: {
              trigger: 'both',
              isHtml: true,
              ignoreBounds: true,
              textStyle: {
                fontSize: 12
              }
            }
          }}
        />
        <div className={styles.btn_wrapper}>
          <button className={styles.cancel_btn} onClick={onCancel}>
            OK
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

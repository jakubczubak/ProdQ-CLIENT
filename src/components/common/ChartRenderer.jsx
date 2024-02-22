//Importy zewnętrzne
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart } from 'react-google-charts';
//Importy lokalne
import styles from './css/PriceChart.module.css';

export const renderChart = (data, onCancel) => {
  const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
  const chartData = [
    ['Data', 'Price (PLN/kg)'],
    ...sortedData.map((item) => [item.date, parseFloat(item.price)])
  ];

  return ReactDOM.createPortal(
    <div className={styles.chart_container}>
      <div className={styles.chart}>
        <Chart
          width={'100%'}
          height={'500px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={chartOptions}
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

const chartOptions = {
  vAxis: {
    title: 'Price (PLN/kg)'
  },
  hAxis: {
    slantedText: true,
    slantedTextAngle: 45,
    textStyle: {
      fontSize: 12
    },
    viewWindow: {
      max: 150
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
};

// Importy zewnętrzne
import React from 'react';
import { Chart } from 'react-google-charts';

// Importy lokalne
import styles from './css/CalculationItem.module.css';

export const PieChart = ({ department_maintenance_cost }) => {
  return (
    <div className={styles.pie_chart}>
      <Chart
        chartType="PieChart"
        data={department_maintenance_cost}
        height={'550px'}
        options={{ pieHole: 0.4 }}
      />
    </div>
  );
};

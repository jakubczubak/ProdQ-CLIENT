// Importy zewnętrzne:
import React from 'react';
import { Chart } from 'react-google-charts';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

// Importy lokalne:
import styles from '../projects/css/ProjectListItem.module.css';

export const options = {
  is3D: true,
  backgroundColor: 'transparent', // Ustawienie przezroczystego tła
  colors: [
    '#FF6384', // Różowy
    '#36A2EB', // Niebieski
    '#FFCE56', // Żółty
    '#4BC0C0', // Turkusowy
    '#9966FF', // Fioletowy
    '#FF9F40' // Pomarańczowy
  ],
  chartArea: {
    width: '70%', // Większy obszar wykresu
    height: '70%' // Większy obszar wykresu
  },
  legend: {
    position: 'right', // Umieszczenie legendy po prawej stronie
    textStyle: {
      color: '#333', // Kolor tekstu legendy
      fontSize: 14
    }
  },
  tooltip: {
    isHtml: true // Aktywacja tooltipa HTML dla bogatszych informacji
  }
};
export const ChartContainer = ({
  productionValue,
  materialValue,
  toolValue,
  hourlyRate,
  handleChangeProjectHourlyRate,
  productionValueBasedOnDepartmentCost,
  totalProductionValue
}) => {
  const department_maintenance_cost = [
    ['Cost name', 'PLN'],
    ['Production value', productionValue ? productionValue : 0.001],
    ['Material value', materialValue ? materialValue : 0.001],
    ['Tool value', toolValue ? toolValue : 0.001]
  ];
  return (
    <div className={styles.chart_container}>
      <div className={styles.project_value}>
        <div className={styles.project_value_rate}>
          <TextField
            variant="standard"
            value={hourlyRate}
            onChange={handleChangeProjectHourlyRate}
            InputProps={{
              sx: {
                width: '150px',
                fontSize: '22px',
                color: '#333',
                fontWeight: '800',
                background:
                  'linear-gradient(135deg, rgba(244, 245, 247, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                borderRadius: '10px',
                padding: '5px'
              },
              endAdornment: <InputAdornment position="end">PLN/h</InputAdornment>
            }}
          />
          <p className={styles.project_value_title}>Hourly rate</p>
        </div>
        <div className={styles.project_value_rate}>
          <p className={styles.project_value_number}>
            {productionValue} <span>PLN</span>
          </p>
          <p className={styles.project_value_title}>Production value</p>
        </div>
        <div className={styles.project_value_rate}>
          <p className={styles.project_value_number}>
            {productionValueBasedOnDepartmentCost} <span>PLN</span>
          </p>
          <p className={styles.project_value_title}>Production value based on department cost</p>
        </div>
        <div className={styles.project_value_rate}>
          <p className={styles.project_value_number}>
            {totalProductionValue} <span>PLN</span>
          </p>
          <p className={styles.project_value_title}>Total production value</p>
        </div>
      </div>
      <div className={styles.chart_wrapper}>
        <Chart
          chartType="PieChart"
          data={department_maintenance_cost}
          className={styles.chart}
          options={options}
        />
      </div>
    </div>
  );
};

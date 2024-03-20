// Importy zewnętrzne:
import React from 'react';
import { Chart } from 'react-google-charts';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

// Importy lokalne:
import styles from '../projects/css/ProjectListItem.module.css';

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
              sx: { width: '150px', fontSize: '22px', color: '#4a4a4a', fontWeight: '800' },
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
          height={'600px'}
          width={'600px'}
        />
      </div>
    </div>
  );
};

import React from 'react';
import styles from './css/CalculationItem.module.css';
import { Typography, Breadcrumbs } from '@mui/material';

export const CalculationItem = () => {
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">Calculations</Typography>
        <Typography color="text.primary">form</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Create a calculation
        </Typography>
      </div>
      <div className={styles.calculation_container}>
        <div>
          <span className={styles.calculation_name}>Calculation Name</span>
        </div>
      </div>
    </>
  );
};

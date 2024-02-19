import React from 'react';
import { Typography, Breadcrumbs } from '@mui/material';
import styles from './css/Calculations.module.css';

export const Header = () => (
  <div className={styles.header}>
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<Typography color="text.primary">/</Typography>}>
      <Typography color="text.primary">...</Typography>
      <Typography color="text.primary">Calculations</Typography>
    </Breadcrumbs>
    <Typography variant="h5" component="div">
      Manage calculations
    </Typography>
  </div>
);

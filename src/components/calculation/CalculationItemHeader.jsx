// Importy zewnętrzne
import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';

// Importy lokalne
import styles from './css/CalculationItem.module.css';

export const CalculationItemHeader = ({ state }) => {
  return (
    <div>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}
      >
        <Typography color="text.primary">...</Typography>
        <Link color="inherit" to="/calculations" className={styles.link}>
          <Typography color="text.primary">Calculations</Typography>
        </Link>
        {state ? (
          <Typography color="text.primary">Edit calculation</Typography>
        ) : (
          <Typography color="text.primary">New calculation</Typography>
        )}
      </Breadcrumbs>
      <div className={styles.header}>
        {state ? (
          <Typography variant="h5" component="div">
            Edit calculation
          </Typography>
        ) : (
          <Typography variant="h5" component="div">
            Create calculation
          </Typography>
        )}
      </div>
    </div>
  );
};

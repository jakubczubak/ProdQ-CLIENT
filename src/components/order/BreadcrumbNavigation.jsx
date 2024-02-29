//Importy zewnętrzne
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';
// Importy lokalne
import styles from './css/OrderItem.module.css';

export const BreadcrumbNavigation = () => {
  const { state } = useLocation();

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<Typography color="text.primary">/</Typography>}
    >
      <Typography color="text.primary">...</Typography>
      <Link color="inherit" to="/orders" className={styles.link}>
        <Typography color="text.primary">Orders</Typography>
      </Link>
      {state ? (
        <Typography color="text.primary">Edit order</Typography>
      ) : (
        <Typography color="text.primary">New order</Typography>
      )}
    </Breadcrumbs>
  );
};

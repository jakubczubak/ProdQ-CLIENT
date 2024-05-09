// Importy zewnętrzne
import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
// Importy lokalne
import styles from './css/SupplierForm.module.css';

export const SupplierHeader = ({ navigate, isEditMode }) => {
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}
      >
        <Typography color="text.primary">
          <Link to="/dashboard" className={styles.link}>
            ...
          </Link>
        </Typography>
        <Typography
          color="text.primary"
          onClick={() => {
            navigate('/suppliers');
          }}
          className={styles.nav_link}
        >
          Network
        </Typography>
        <Typography color="text.primary">
          {isEditMode ? 'Edit coworker' : 'New coworker'}
        </Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          {isEditMode ? 'Coworker - edit' : 'Coworker'}
        </Typography>
      </div>
    </>
  );
};

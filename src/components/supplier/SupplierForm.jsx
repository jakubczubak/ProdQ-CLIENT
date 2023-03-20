import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import styles from './css/SupplierForm.module.css';

export const SupplierForm = () => {
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">Suppliers</Typography>
        <Typography color="text.primary">Form</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Create supplier
        </Typography>
      </div>
      <div className={styles.supplierForm_wrapper}>
        <div className={styles.supplierFrom_info_container}>
          <div className={styles.supplierFrom_info}>
            <div className={styles.supplierFrom_info_logo}>
              <img src="https://www.adamet.com.pl/wp-content/uploads/2019/08/logo_an.png" alt="" />
            </div>
            <p className={styles.supplierFrom_info_name}>Tim Cook</p>
            <p className={styles.supplierFrom_info_company_name}>Apple INC.</p>
            <p className={styles.supplierFrom_info_email}>test@gmail.com</p>
            <p className={styles.supplierFrom_info_phone}>123 123 123</p>
            <p className={styles.supplierFrom_info_address}>Seattle, SA</p>
            <button className={styles.supplierFrom_info_button}>View Company Page</button>
          </div>
        </div>
        <div className={styles.supplierFrom_details_container}></div>
      </div>
    </>
  );
};

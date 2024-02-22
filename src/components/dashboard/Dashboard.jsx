//Importy zewnętrzne
import React, { useState } from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
//Importy lokalne
import { Notifications } from '../common/Notifications';
import { DashboardAlerts } from './DashboardAlerts';
import { DashboardCards } from './DashboardCards';
import styles from './css/Dashboard.module.css';

export const Dashboard = () => {
  const location = useLocation();
  const state = location.state;
  const loginMessage = state?.loginMessage || '';

  const [showNotification, setShowNotification] = useState(loginMessage ? true : false);

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}
      >
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">Dashboard</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Dashboard
        </Typography>
      </div>
      <DashboardAlerts />
      <DashboardCards />
      <Notifications
        open={showNotification}
        onClose={() => setShowNotification(false)}
        severity="info"
        message={loginMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </>
  );
};

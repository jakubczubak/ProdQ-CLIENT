import React, { useEffect, useState } from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Notifications } from '../common/Notifications';
import { DashboardAlerts } from './DashboardAlerts';
import styles from './css/Dashboard.module.css';
import { useDispatch } from 'react-redux';
import { SET_DEFAULT_NAV_ITEM } from '../../redux/actionTypes/actionTypes';

export const Dashboard = () => {
  const location = useLocation();
  const state = location.state;
  const loginMessage = state?.loginMessage || '';

  const [showNotification, setShowNotification] = useState(!!loginMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_DEFAULT_NAV_ITEM, payload: { defaultNavItem: 'dashboard' } });
  }, [dispatch]);

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
          General information
        </Typography>
      </div>
      <DashboardAlerts />
      <Notifications
        open={showNotification}
        onClose={() => setShowNotification(false)}
        severity="success"
        message={loginMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </>
  );
};

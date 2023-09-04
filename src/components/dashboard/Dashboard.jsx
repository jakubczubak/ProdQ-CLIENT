import React from 'react';
import styles from './css/Dashboard.module.css';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Notifications } from '../common/Notifications';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const Dashboard = () => {
  const location = useLocation();
  const state = location.state;
  const loginMessage = state?.loginMessage || '';

  const [showNotification, setShowNotification] = useState(loginMessage ? true : false);

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">Dashboard</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Dashboard
        </Typography>
      </div>
      <div className={styles.cards}>
        <Link to="/materials/new" className={styles.link}>
          <div className={styles.card}>
            <img
              src={require('../../assets/dashboard/steel.png')}
              alt=""
              className={styles.card_icon}
            />
            <div>
              <Typography variant="h6" component="div" className={styles.card_title}>
                Material Group
              </Typography>
              <p className={styles.card_text}>create material group</p>
            </div>
          </div>
        </Link>
        <Link to="/tools/new" className={styles.link}>
          <div className={styles.card}>
            <img
              src={require('../../assets/dashboard/bits.png')}
              alt=""
              className={styles.card_icon}
            />
            <div>
              <Typography variant="h6" component="div" className={styles.card_title}>
                Tool Group
              </Typography>
              <p className={styles.card_text}>create tool group</p>
            </div>
          </div>
        </Link>
        <Link to="/calculation/new" className={styles.link}>
          <div className={styles.card}>
            <img
              src={require('../../assets/dashboard/calculator.png')}
              alt=""
              className={styles.card_icon}
            />
            <div>
              <Typography variant="h6" component="div" className={styles.card_title}>
                Calculation
              </Typography>
              <p className={styles.card_text}>calculate CNC job</p>
            </div>
          </div>
        </Link>
        <Link to="/order/new" className={styles.link}>
          <div className={styles.card}>
            <img
              src={require('../../assets/dashboard/delivery.png')}
              alt=""
              className={styles.card_icon}
            />
            <div>
              <Typography variant="h6" component="div" className={styles.card_title}>
                Order
              </Typography>
              <p className={styles.card_text}>order materials and tools</p>
            </div>
          </div>
        </Link>
        <Link to="/recycling/wtc" className={styles.link}>
          <div className={styles.card}>
            <img
              src={require('../../assets/dashboard/recycle.png')}
              alt=""
              className={styles.card_icon}
            />
            <div>
              <Typography variant="h6" component="div" className={styles.card_title}>
                Recycling
              </Typography>
              <p className={styles.card_text}>manage recycling</p>
            </div>
          </div>
        </Link>
        <Link to="/supplier/new" className={styles.link}>
          <div className={styles.card}>
            <img
              src={require('../../assets/dashboard/contact.png')}
              alt=""
              className={styles.card_icon}
            />
            <div>
              <Typography variant="h6" component="div" className={styles.card_title}>
                Contact
              </Typography>
              <p className={styles.card_text}>create contact</p>
            </div>
          </div>
        </Link>
        <Link to="/settings/department" className={styles.link}>
          <div className={styles.card}>
            <img
              src={require('../../assets/dashboard/engineer.png')}
              alt=""
              className={styles.card_icon}
            />
            <div>
              <Typography variant="h6" component="div" className={styles.card_title}>
                Department cost
              </Typography>
              <p className={styles.card_text}>set production department cost</p>
            </div>
          </div>
        </Link>
      </div>
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

import React from 'react';
import styles from './css/Dashboard.module.css';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Notifications } from '../common/Notifications';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import RecyclingOutlinedIcon from '@mui/icons-material/RecyclingOutlined';
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ReportIcon from '@mui/icons-material/Report';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CalculateIcon from '@mui/icons-material/Calculate';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';

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
        <div className={styles.alert_card}>
          <div className={styles.icon_wrapper}>
            <ReportIcon
              color="error"
              sx={{
                width: '20px',
                height: '20px'
              }}
            />
          </div>
          <div>
            <p className={styles.alert_text}>Missing materials:</p>
            <p className={styles.alert_value}>100</p>
          </div>
        </div>
        <div className={styles.alert_card}>
          <div className={styles.icon_wrapper}>
            <ReportIcon
              color="error"
              sx={{
                width: '20px',
                height: '20px'
              }}
            />
          </div>
          <div>
            <p className={styles.alert_text}>Missing tools:</p>
            <p className={styles.alert_value}>25</p>
          </div>
        </div>
        <div className={styles.alert_card}>
          <div className={styles.icon_wrapper}>
            <LocalShippingIcon
              color="warning"
              sx={{
                width: '20px',
                height: '20px'
              }}
            />
          </div>
          <div>
            <p className={styles.alert_text}>Active orders:</p>
            <p className={styles.alert_value}>25</p>
          </div>
        </div>
        <div className={styles.alert_card}>
          <div className={styles.icon_wrapper}>
            <CalculateIcon
              color="warning"
              sx={{
                width: '20px',
                height: '20px'
              }}
            />
          </div>
          <div>
            <p className={styles.alert_text}>Active calculations</p>
            <p className={styles.alert_value}>10</p>
          </div>
        </div>
        <div className={styles.alert_card}>
          <div className={styles.icon_wrapper}>
            <SavingsOutlinedIcon
              color="action"
              sx={{
                width: '20px',
                height: '20px'
              }}
            />
          </div>
          <div>
            <p className={styles.alert_text}>Value of materials</p>
            <p className={styles.alert_value}>
              10 <span className={styles.alert_value_text}>PLN</span>
            </p>
          </div>
        </div>
        <div className={styles.alert_card}>
          <div className={styles.icon_wrapper}>
            <SavingsOutlinedIcon
              color="action"
              sx={{
                width: '20px',
                height: '20px'
              }}
            />
          </div>
          <div>
            <p className={styles.alert_text}>Value of tools</p>
            <p className={styles.alert_value}>
              10 <span className={styles.alert_value_text}>PLN</span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.cards}>
        <Link to="/materials/new" className={styles.link}>
          <div className={styles.card}>
            <img src={require('../../assets/plate.png')} alt="" className={styles.card_icon} />
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
            <img src={require('../../assets/tools.png')} alt="" className={styles.card_icon} />
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
            <CalculateOutlinedIcon
              color="action"
              sx={{
                width: '30px',
                height: '30px'
              }}
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
            <ShoppingCartOutlinedIcon
              color="action"
              sx={{
                width: '30px',
                height: '30px'
              }}
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
            <RecyclingOutlinedIcon
              color="action"
              sx={{
                width: '30px',
                height: '30px'
              }}
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
            <Diversity2OutlinedIcon
              color="action"
              sx={{
                width: '30px',
                height: '30px'
              }}
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
            <SettingsOutlinedIcon
              color="action"
              sx={{
                width: '30px',
                height: '30px'
              }}
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

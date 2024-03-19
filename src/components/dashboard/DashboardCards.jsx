//Importy zewnętrzne
import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import RecyclingOutlinedIcon from '@mui/icons-material/RecyclingOutlined';
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
//Importy lokalne
import styles from './css/Dashboard.module.css';

export const DashboardCards = () => {
  return (
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
  );
};

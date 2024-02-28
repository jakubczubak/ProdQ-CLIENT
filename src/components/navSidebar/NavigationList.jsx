/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
//Importy zewnętrzne
import React from 'react';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
//Importy loklane
import styles from './css/NavSidebar.module.css';

export const NavigationList = ({ setOpenLogoutModal }) => {
  return (
    <ul className={styles.navSidebar_list}>
      <Link to="/dashboard" className={styles.link}>
        <Tooltip title="Dashboard" arrow placement="right">
          <li>
            <img src={require('../../assets/sidebar_icon/dashboard.png')} alt="dashboard" />
            <button>Dashboard</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/materials" className={styles.link}>
        <Tooltip title="Manage Materials" arrow placement="right">
          <li>
            <img src={require('../../assets/sidebar_icon/parcel.png')} alt="Materials" />
            <button>Materials</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/tools" className={styles.link}>
        <Tooltip title="Manage Tools" arrow placement="right">
          <li>
            <img src={require('../../assets/sidebar_icon/cnc.png')} alt="Tools" />
            <button>Tools</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/production" className={styles.link}>
        <Tooltip title="Production" arrow placement="right">
          <li>
            <img src={require('../../assets/sidebar_icon/adobe.png')} alt="Production orders" />
            <button>Production</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/projects" className={styles.link}>
        <Tooltip title="Production cost" arrow placement="right">
          <li>
            <img src={require('../../assets/sidebar_icon/excel.png')} alt="Production cost" />
            <button>Projects</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/calculations" className={styles.link}>
        <Tooltip title="Manage calculations" arrow placement="right">
          <li>
            <img src={require('../../assets/sidebar_icon/calculator.png')} alt="Calculations" />
            <button>Calculations</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/orders" className={styles.link}>
        <Tooltip title="Order missing materials and tools" arrow placement="right">
          <li>
            <img src={require('../../assets/sidebar_icon/bag.png')} alt="Orders" />
            <button>Orders</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/recycling" className={styles.link}>
        <Tooltip title="Manage recycling" arrow placement="right">
          <li>
            <img src={require('../../assets/sidebar_icon/recycle.png')} alt="Recycling" />
            <button>Recycling</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/suppliers" className={styles.link}>
        <Tooltip title="See the list of suppliers" arrow placement="right">
          <li>
            <img src={require('../../assets/sidebar_icon/book.png')} alt="Contacts" />
            <button>Contacts</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/settings" className={styles.link}>
        <Tooltip title="Check the settings" arrow placement="right">
          <li>
            <img src={require('../../assets/sidebar_icon/cogwheel.png')} alt="Settings" />
            <button>Settings</button>
          </li>
        </Tooltip>
      </Link>
      <Tooltip title="Logout" arrow placement="right">
        <li
          onClick={() => {
            setOpenLogoutModal(true);
          }}>
          <img src={require('../../assets/sidebar_icon/logout.png')} alt="Logout" />
          <button>Logout</button>
        </li>
      </Tooltip>
    </ul>
  );
};

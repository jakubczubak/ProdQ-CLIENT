/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import LoopIcon from '@mui/icons-material/Loop';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from './NavSidebar.module.css';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Logout } from '../logout/Logout';
import BuildIcon from '@mui/icons-material/Build';
import CalculateIcon from '@mui/icons-material/Calculate';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/infinite.json';
import LocalMallIcon from '@mui/icons-material/LocalMall';

export const NavSidebar = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  return (
    <>
      <div className={styles.navSidebar_container}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
        <h1 className={styles.navSidebar_header}>INFRABOX</h1>
        <ul className={styles.navSidebar_list}>
          <Link to="/materials" className={styles.link}>
            <Tooltip title="Manage Materials" arrow placement="right">
              <li>
                <AppsOutlinedIcon style={{ color: 'white' }} fontSize="medium" />
                <button>Materials</button>
              </li>
            </Tooltip>
          </Link>
          <Link to="/tools" className={styles.link}>
            <Tooltip title="Manage Tools" arrow placement="right">
              <li>
                <BuildIcon style={{ color: 'white' }} />
                <button>Tools</button>
              </li>
            </Tooltip>
          </Link>
          <Link to="/calculations" className={styles.link}>
            <Tooltip title="Manage calculations" arrow placement="right">
              <li>
                <CalculateIcon style={{ color: 'white' }} />
                <button>Calculations</button>
              </li>
            </Tooltip>
          </Link>
          <Link to="/shopping" className={styles.link}>
            <Tooltip title="Order missing materials and tools" arrow placement="right">
              <li>
                <LocalMallIcon style={{ color: 'white' }} />
                <button>Shopping</button>
              </li>
            </Tooltip>
          </Link>
          <Link to="/recycling" className={styles.link}>
            <Tooltip title="Manage recycling" arrow placement="right">
              <li>
                <LoopIcon style={{ color: 'white' }} />
                <button>Recycling</button>
              </li>
            </Tooltip>
          </Link>
          <Link to="/suppliers" className={styles.link}>
            <Tooltip title="See the list of suppliers" arrow placement="right">
              <li>
                <LocalShippingIcon style={{ color: 'white' }} />
                <button>Suppliers</button>
              </li>
            </Tooltip>
          </Link>
          <Link to="/settings" className={styles.link}>
            <Tooltip title="Check the settings" arrow placement="right">
              <li>
                <SettingsIcon style={{ color: 'white' }} />
                <button>Settings</button>
              </li>
            </Tooltip>
          </Link>
          <Tooltip title="Logout" arrow placement="right">
            <li
              onClick={() => {
                setOpenLogoutModal(true);
              }}>
              <LogoutIcon style={{ color: 'white' }} />
              <button>Logout</button>
            </li>
          </Tooltip>
        </ul>
      </div>
      <Logout
        open={openLogoutModal}
        onCancel={() => setOpenLogoutModal(false)}
        onLogout={() => {
          window.location.href = '/login';
        }}
      />
    </>
  );
};

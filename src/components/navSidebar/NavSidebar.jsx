/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import styles from './NavSidebar.module.css';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Logout } from '../logout/Logout';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/infinite.json';
import { useNavigate } from 'react-router-dom';
export const NavSidebar = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const navigate = useNavigate(); // Inicjalizacja nawigacji
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login', { state: { logoutMessage: 'See you soon 👋' } });
  };

  return (
    <>
      <div className={styles.navSidebar_container}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
        <div className={styles.navSidebar_header_container}>
          <h1 className={styles.navSidebar_header}>INFRABOX</h1>
        </div>

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
          <Link to="/production_summary" className={styles.link}>
            <Tooltip title="Production cost" arrow placement="right">
              <li>
                <img src={require('../../assets/sidebar_icon/excel.png')} alt="Production cost" />
                <button>Production summary</button>
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
      </div>

      <Logout
        open={openLogoutModal}
        onCancel={() => setOpenLogoutModal(false)}
        onLogout={handleLogout}
      />
    </>
  );
};

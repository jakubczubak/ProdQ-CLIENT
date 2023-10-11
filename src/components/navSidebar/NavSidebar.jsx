/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import styles from './NavSidebar.module.css';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Logout } from '../logout/Logout';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/infinite.json';
import RecyclingOutlinedIcon from '@mui/icons-material/RecyclingOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import { useNavigate } from 'react-router-dom';
export const NavSidebar = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const navigate = useNavigate(); // Inicjalizacja nawigacji
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('loggedInUser');
    navigate('/login', { state: { logoutMessage: 'You have been logged out.' } });
  };

  return (
    <>
      <div className={styles.navSidebar_container}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
        <h1 className={styles.navSidebar_header}>INFRABOX</h1>
        <ul className={styles.navSidebar_list}>
          <Link to="/dashboard" className={styles.link}>
            <Tooltip title="Dashboard" arrow placement="right">
              <li>
                <DashboardCustomizeOutlinedIcon style={{ color: 'white' }} fontSize="medium" />
                <button>Dashboard</button>
              </li>
            </Tooltip>
          </Link>
          <Link to="/materials" className={styles.link}>
            <Tooltip title="Manage Materials" arrow placement="right">
              <li>
                <WarehouseOutlinedIcon style={{ color: 'white' }} fontSize="medium" />
                <button>Materials</button>
              </li>
            </Tooltip>
          </Link>
          <Link to="/tools" className={styles.link}>
            <Tooltip title="Manage Tools" arrow placement="right">
              <li>
                <HandymanOutlinedIcon style={{ color: 'white' }} />
                <button>Tools</button>
              </li>
            </Tooltip>
          </Link>

          <Link to="/calculations" className={styles.link}>
            <Tooltip title="Manage calculations" arrow placement="right">
              <li>
                <PercentOutlinedIcon style={{ color: 'white' }} />
                <button>Calculations</button>
              </li>
            </Tooltip>
          </Link>
          <Link to="/orders" className={styles.link}>
            <Tooltip title="Order missing materials and tools" arrow placement="right">
              <li>
                <ShoppingCartOutlinedIcon style={{ color: 'white' }} />
                <button>Orders</button>
              </li>
            </Tooltip>
          </Link>
          <Link to="/recycling" className={styles.link}>
            <Tooltip title="Manage recycling" arrow placement="right">
              <li>
                <RecyclingOutlinedIcon style={{ color: 'white' }} />
                <button>Recycling</button>
              </li>
            </Tooltip>
          </Link>
          <Link to="/suppliers" className={styles.link}>
            <Tooltip title="See the list of suppliers" arrow placement="right">
              <li>
                <GroupsOutlinedIcon style={{ color: 'white' }} />
                <button>Contact network</button>
              </li>
            </Tooltip>
          </Link>
          <Link to="/settings" className={styles.link}>
            <Tooltip title="Check the settings" arrow placement="right">
              <li>
                <TuneOutlinedIcon style={{ color: 'white' }} />
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
        onLogout={handleLogout}
      />
    </>
  );
};

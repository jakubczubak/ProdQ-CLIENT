/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// Importy zewnętrzne
import React from 'react';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

// Importy lokalne
import styles from './css/NavSidebar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { SET_DEFAULT_NAV_ITEM } from '../../redux/actionTypes/actionTypes';
import dashboard from '../../assets/sidebar_icon/dashboard.svg';
import production from '../../assets/sidebar_icon/production.svg';
import materials from '../../assets/sidebar_icon/materials.svg';
import tools from '../../assets/sidebar_icon/tools.svg';
import accessories from '../../assets/sidebar_icon/accessories.svg';
import projects from '../../assets/sidebar_icon/projects.svg';
import orders from '../../assets/sidebar_icon/orders.svg';
import recycling from '../../assets/sidebar_icon/recycling.svg';
import suppliers from '../../assets/sidebar_icon/contacts.svg';
import settings from '../../assets/sidebar_icon/settings.svg';
import logout from '../../assets/sidebar_icon/logout.svg';

export const NavigationList = ({ setOpenLogoutModal }) => {
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.defaultNavItem); // Pobranie z Reduxa

  const handleItemClick = (id) => {
    dispatch({ type: SET_DEFAULT_NAV_ITEM, payload: { defaultNavItem: id } }); // Aktualizacja Reduxa
  };

  return (
    <ul className={styles.navSidebar_list}>
      <Link to="/dashboard" className={styles.link}>
        <Tooltip PopperProps={{ disablePortal: true }} title="Dashboard" arrow placement="right">
          <li
            className={selectedItem === 'dashboard' ? styles.selected : ''}
            onClick={() => handleItemClick('dashboard')}>
            <img src={dashboard} alt="Dashboard" />
            <button>Dashboard</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/production" className={styles.link}>
        <Tooltip PopperProps={{ disablePortal: true }} title="Production" arrow placement="right">
          <li
            className={selectedItem === 'production' ? styles.selected : ''}
            onClick={() => handleItemClick('production')}>
            <img src={production} alt="Production" />
            <button>Production</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/materials" className={styles.link}>
        <Tooltip PopperProps={{ disablePortal: true }} title="Materials" arrow placement="right">
          <li
            className={selectedItem === 'materials' ? styles.selected : ''}
            onClick={() => handleItemClick('materials')}>
            <img src={materials} alt="Materials" />
            <button>Materials</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/tools" className={styles.link}>
        <Tooltip PopperProps={{ disablePortal: true }} title="Tools" arrow placement="right">
          <li
            className={selectedItem === 'tools' ? styles.selected : ''}
            onClick={() => handleItemClick('tools')}>
            <img src={tools} alt="Tools" />
            <button>Tools</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/accessories" className={styles.link}>
        <Tooltip PopperProps={{ disablePortal: true }} title="Accessories" arrow placement="right">
          <li
            className={selectedItem === 'accessories' ? styles.selected : ''}
            onClick={() => handleItemClick('accessories')}>
            <img src={accessories} alt="Accessories" />
            <button>Accessories</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/projects" className={styles.link}>
        <Tooltip PopperProps={{ disablePortal: true }} title="Projects" arrow placement="right">
          <li
            className={selectedItem === 'projects' ? styles.selected : ''}
            onClick={() => handleItemClick('projects')}>
            <img src={projects} alt="Projects" />
            <button>Projects</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/orders" className={styles.link}>
        <Tooltip PopperProps={{ disablePortal: true }} title="Orders" arrow placement="right">
          <li
            className={selectedItem === 'orders' ? styles.selected : ''}
            onClick={() => handleItemClick('orders')}>
            <img src={orders} alt="Orders" />
            <button>Orders</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/recycling" className={styles.link}>
        <Tooltip PopperProps={{ disablePortal: true }} title="Recycling" arrow placement="right">
          <li
            className={selectedItem === 'recycling' ? styles.selected : ''}
            onClick={() => handleItemClick('recycling')}>
            <img src={recycling} alt="Recycling" />
            <button>Recycling</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/suppliers" className={styles.link}>
        <Tooltip PopperProps={{ disablePortal: true }} title="Contacts" arrow placement="right">
          <li
            className={selectedItem === 'suppliers' ? styles.selected : ''}
            onClick={() => handleItemClick('suppliers')}>
            <img src={suppliers} alt="Contacts" />
            <button>Contacts</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/settings" className={styles.link}>
        <Tooltip PopperProps={{ disablePortal: true }} title="Settings" arrow placement="right">
          <li
            className={selectedItem === 'settings' ? styles.selected : ''}
            onClick={() => handleItemClick('settings')}>
            <img src={settings} alt="Settings" />
            <button>Settings</button>
          </li>
        </Tooltip>
      </Link>
      <Tooltip PopperProps={{ disablePortal: true }} title="Logout" arrow placement="right">
        <li
          onClick={() => {
            setOpenLogoutModal(true);
          }}>
          <img src={logout} alt="Logout" />
          <button>Logout</button>
        </li>
      </Tooltip>
    </ul>
  );
};

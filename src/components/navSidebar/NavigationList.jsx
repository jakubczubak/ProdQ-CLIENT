/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
//Importy zewnętrzne
import React from 'react';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
//Importy loklane
import styles from './css/NavSidebar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { SET_DEFAULT_NAV_ITEM } from '../../redux/actionTypes/actionTypes';

export const NavigationList = ({ setOpenLogoutModal }) => {
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.defaultNavItem); // Pobranie z Reduxa

  const handleItemClick = (id) => {
    dispatch({ type: SET_DEFAULT_NAV_ITEM, payload: { defaultNavItem: id } }); // Aktualizacja Reduxa
  };

  return (
    <ul className={styles.navSidebar_list}>
      <Link to="/dashboard" className={styles.link}>
        <Tooltip title="Dashboard" arrow placement="right">
          <li
            className={selectedItem === 'dashboard' ? styles.selected : ''}
            onClick={() => handleItemClick('dashboard')}
          >
            <img src={require('../../assets/sidebar_icon/dashboard.png')} alt="Dashboard" />
            <button>Dashboard</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/production" className={styles.link}>
        <Tooltip title="Production" arrow placement="right">
          <li
            className={selectedItem === 'production' ? styles.selected : ''}
            onClick={() => handleItemClick('production')}
          >
            <img src={require('../../assets/sidebar_icon/queue.png')} alt="Production" />
            <button>Production</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/materials" className={styles.link}>
        <Tooltip title="Materials" arrow placement="right">
          <li
            className={selectedItem === 'materials' ? styles.selected : ''}
            onClick={() => handleItemClick('materials')}
          >
            <img src={require('../../assets/sidebar_icon/parcel.png')} alt="Materials" />
            <button>Materials</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/tools" className={styles.link}>
        <Tooltip title="Tools" arrow placement="right">
          <li
            className={selectedItem === 'tools' ? styles.selected : ''}
            onClick={() => handleItemClick('tools')}
          >
            <img src={require('../../assets/sidebar_icon/cnc.png')} alt="Tools" />
            <button>Tools</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/accessories" className={styles.link}>
        <Tooltip title="Accessories" arrow placement="right">
          <li
            className={selectedItem === 'accessories' ? styles.selected : ''}
            onClick={() => handleItemClick('accessories')}
          >
            <img src={require('../../assets/sidebar_icon/warehouse.png')} alt="Accessories" />
            <button>Accessories</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/projects" className={styles.link}>
        <Tooltip title="Projects" arrow placement="right">
          <li
            className={selectedItem === 'projects' ? styles.selected : ''}
            onClick={() => handleItemClick('projects')}
          >
            <img src={require('../../assets/sidebar_icon/excel.png')} alt="Projects" />
            <button>Projects</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/orders" className={styles.link}>
        <Tooltip title="Orders" arrow placement="right">
          <li
            className={selectedItem === 'orders' ? styles.selected : ''}
            onClick={() => handleItemClick('orders')}
          >
            <img src={require('../../assets/sidebar_icon/bag.png')} alt="Orders" />
            <button>Orders</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/recycling" className={styles.link}>
        <Tooltip title="Recycling" arrow placement="right">
          <li
            className={selectedItem === 'recycling' ? styles.selected : ''}
            onClick={() => handleItemClick('recycling')}
          >
            <img src={require('../../assets/sidebar_icon/recycle.png')} alt="Recycling" />
            <button>Recycling</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/suppliers" className={styles.link}>
        <Tooltip title="Contacts" arrow placement="right">
          <li
            className={selectedItem === 'suppliers' ? styles.selected : ''}
            onClick={() => handleItemClick('suppliers')}
          >
            <img src={require('../../assets/sidebar_icon/book.png')} alt="Contacts" />
            <button>Contacts</button>
          </li>
        </Tooltip>
      </Link>
      <Link to="/settings" className={styles.link}>
        <Tooltip title="Settings" arrow placement="right">
          <li
            className={selectedItem === 'settings' ? styles.selected : ''}
            onClick={() => handleItemClick('settings')}
          >
            <img src={require('../../assets/sidebar_icon/cogwheel.png')} alt="Settings" />
            <button>Settings</button>
          </li>
        </Tooltip>
      </Link>
      <Tooltip title="Logout" arrow placement="right">
        <li
          onClick={() => {
            setOpenLogoutModal(true);
          }}
        >
          <img src={require('../../assets/sidebar_icon/logout.png')} alt="Logout" />
          <button>Logout</button>
        </li>
      </Tooltip>
    </ul>
  );
};

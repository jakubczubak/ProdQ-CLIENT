/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './css/HideButton.module.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { toggleSidebar } from '../../redux/actions/Action';
import { Tooltip } from '@mui/material';

export const HideButton = () => {
  const isNavbarHidden = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Tooltip title={isNavbarHidden ? 'Show Sidebar' : 'Hide Sidebar'} arrow placement="right">
      <div
        className={`${styles.container} ${isNavbarHidden && styles.navHidden}`}
        onClick={handleClick}>
        {isNavbarHidden ? <ArrowRightIcon color="action" /> : <ArrowLeftIcon color="action" />}
      </div>
    </Tooltip>
  );
};

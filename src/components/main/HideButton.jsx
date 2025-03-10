/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './css/HideButton.module.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { toggleSidebar } from '../../redux/actions/Action';
import { Tooltip } from '@mui/material';

export const HideButton = () => {
  const isNavbarHidden = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedState = localStorage.getItem('isNavbarHidden') === 'true';
    if (savedState !== isNavbarHidden) {
      dispatch(toggleSidebar());
    }
  }, [dispatch]);

  const handleClick = () => {
    const newIsNavbarHidden = !isNavbarHidden;
    dispatch(toggleSidebar());
    localStorage.setItem('isNavbarHidden', newIsNavbarHidden);
  };

  return (
    <Tooltip
      PopperProps={{ disablePortal: true }}
      title={isNavbarHidden ? 'Show Sidebar' : 'Hide Sidebar'}
      arrow
      placement="right">
      <div
        className={`${styles.container} ${isNavbarHidden && styles.navHidden}`}
        onClick={handleClick}>
        {isNavbarHidden ? <ArrowRightIcon color="action" /> : <ArrowLeftIcon color="action" />}
      </div>
    </Tooltip>
  );
};

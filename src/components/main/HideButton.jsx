import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './css/HideButton.module.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { toggleSidebar } from '../../redux/actions/Action';

export const HideButton = () => {
  const isNavbarHidden = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className={`${styles.container} ${isNavbarHidden && styles.navHidden}`}>
      {isNavbarHidden ? (
        <ArrowRightIcon color="action" onClick={handleClick} />
      ) : (
        <ArrowLeftIcon color="action" onClick={handleClick} />
      )}
    </div>
  );
};

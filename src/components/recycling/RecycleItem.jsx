import React from 'react';
import styles from './css/RecycleItem.module.css';
import { Breadcrumbs, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/recycle_v2.json';
import { Link } from 'react-router-dom';

export const RecycleItem = () => {
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}
      >
        <Typography color="text.primary">...</Typography>

        <Typography color="text.primary">
          <Link to="/recycling" className={styles.link}>
            Recycling
          </Link>
        </Typography>
        <Typography color="text.primary">WTC</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Waste transfer card
        </Typography>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
      </div>
    </>
  );
};

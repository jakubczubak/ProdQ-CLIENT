//Importy zewnętrzne
import React from 'react';
import { Tooltip, Button } from '@mui/material';
import ClearAllIcon from '@mui/icons-material/ClearAll';
//Importy lokalne
import styles from './css/ProductionCart.module.css';

export const ActionButtons = ({ handleClearAll }) => {
  return (
    <div className={styles.btn_wrapper}>
      <Tooltip PopperProps={{ disablePortal: true }} title="Clear all items" placement="top">
        <Button endIcon={<ClearAllIcon />} onClick={handleClearAll} size="small">
          <span className={styles.btn_text}>Clear</span>
        </Button>
      </Tooltip>
    </div>
  );
};

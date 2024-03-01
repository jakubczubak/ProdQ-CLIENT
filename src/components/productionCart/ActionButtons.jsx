//Importy zewnętrzne
import React from 'react';
import { Tooltip, Button } from '@mui/material';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
//Importy lokalne
import styles from './css/ProductionCart.module.css';

export const ActionButtons = ({ handleCreateOrder, handleClearAll }) => {
  return (
    <div className={styles.btn_wrapper}>
      <Tooltip title="Create production summary" placement="top">
        <Button endIcon={<SummarizeOutlinedIcon />} onClick={handleCreateOrder} size="small">
          <span className={styles.btn_text}>Production summary</span>
        </Button>
      </Tooltip>
      <Tooltip title="Clear all items" placement="top">
        <Button endIcon={<ClearAllIcon />} onClick={handleClearAll} size="small">
          <span className={styles.btn_text}>Clear</span>
        </Button>
      </Tooltip>
    </div>
  );
};

import React from 'react';
import styles from './css/OrderItem.module.css';
import { Button } from '@mui/material';

export const SubmitButton = ({ state }) => {
  return (
    <div className={styles.form_btn}>
      {state ? (
        state.status === 'delivered' ? (
          <Button type="submit" variant="contained" color="primary" disabled>
            Update Order
          </Button>
        ) : (
          <Button type="submit" variant="contained" color="primary">
            Update Order
          </Button>
        )
      ) : (
        <Button type="submit" variant="contained" color="primary">
          Create Order
        </Button>
      )}
    </div>
  );
};

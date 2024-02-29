//Importy zewnętrzne
import React from 'react';
import { Button } from '@mui/material';
//Importy lokalne
import styles from './css/OrderItem.module.css';

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

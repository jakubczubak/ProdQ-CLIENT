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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled
            sx={{
              background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
              '&:hover': { background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)' }
            }}>
            Update Order
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
              '&:hover': { background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)' }
            }}>
            Update Order
          </Button>
        )
      ) : (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
            '&:hover': { background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)' }
          }}>
          Create Order
        </Button>
      )}
    </div>
  );
};

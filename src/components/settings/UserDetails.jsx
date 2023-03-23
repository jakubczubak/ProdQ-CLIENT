import React from 'react';
import { Button, TextField } from '@mui/material';
import styles from './css/UserDetails.module.css';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';

export const UserDetails = () => {
  return (
    <div className={styles.userDetails_container}>
      <div className={styles.user_inputs}>
        <p className={styles.userDetails_title}>Profile details</p>
        <TextField label="Imię" variant="outlined" value="asdad"  />
        <TextField label="Nazwisko" variant="outlined" />
        <TextField label="Email" variant="outlined" />
        <TextField label="Hasło" variant="outlined" type="password" />
        <TextField label="Powtórz hasło" variant="outlined" type="password" />
        <Button variant="contained" endIcon={<SaveIcon />}>
          Zapisz
        </Button>
      </div>
      <div className={styles.user_overview}>
        <div className={styles.user_overview_header}>
          <h3>Twoje dane</h3>
          <div>
            <img></img>
          </div>
        </div>
      </div>
    </div>
  );
};

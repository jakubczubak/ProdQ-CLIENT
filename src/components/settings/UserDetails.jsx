import React from 'react';
import { Button, TextField } from '@mui/material';
import styles from './css/UserDetails.module.css';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/profile.json';
import { border } from '@mui/system';

export const UserDetails = () => {
  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    password2: ''
  });
  return (
    <>
      <div className={styles.userDetails_container}>
        <div className={styles.user_inputs}>
          <p className={styles.userDetails_title}>Profile details:</p>
          <TextField label="Imię" variant="outlined" className={styles.wider_textfield} />
          <TextField label="Nazwisko" variant="outlined" className={styles.wider_textfield} />
          <TextField label="Email" variant="outlined" className={styles.wider_textfield} />
          <TextField
            label="Hasło"
            variant="outlined"
            type="password"
            className={styles.wider_textfield}
          />
          <TextField
            label="Powtórz hasło"
            variant="outlined"
            type="password"
            className={styles.wider_textfield}
          />
        </div>
        <div className={styles.user_overview}>
          <div className={styles.user_overview_logo}>
            <Lottie animationData={animation} loop={true} className={styles.animation} />
          </div>
          <div className={styles.user_overview_details}>
            <p className={styles.user_overview_details_fullname}>Jakub Czubak </p>
            <p className={styles.user_overview_details_email}>czubakjakub94@gmail.com </p>
            <p className={styles.user_overview_details_phone}>791 336 091</p>
          </div>
        </div>
      </div>
      <div className={styles.userDetails_wrapper}>
        <Button variant="contained" endIcon={<SaveIcon />} size="large">
          Zapisz
        </Button>
      </div>
    </>
  );
};

import React from 'react';
import { Button, TextField } from '@mui/material';
import styles from './css/UserDetails.module.css';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/profile.json';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userValidationSchema } from './service/validationSchema/userValidationSchema';
import { userManager } from './service/userManager';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

export const UserDetails = () => {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState({
    id: userFromLocalStorage.id,
    name: userFromLocalStorage.name,
    surname: userFromLocalStorage.surname,
    email: userFromLocalStorage.email,
    phone: userFromLocalStorage.phone
  });

  const { handleSubmit, control } = useForm({
    defaultValues: {
      id: userFromLocalStorage.id,
      name: userFromLocalStorage.name,
      surname: userFromLocalStorage.surname,
      email: userFromLocalStorage.email,
      phone: userFromLocalStorage.phone,
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(userValidationSchema)
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    data.id = user.id;
    userManager.updateUser(data, dispatch, queryClient);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.userDetails_container}>
          <div className={styles.user_inputs}>
            <p className={styles.userDetails_title}>Profile details:</p>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  error={!!error}
                  helperText={error ? error.message : null}
                  label="Name"
                  variant="outlined"
                  className={styles.wider_textfield}
                  value={value}
                  onChange={(event) => {
                    const inputName = event.target.value;
                    setUser({ ...user, name: inputName });
                    onChange(inputName);
                  }}
                />
              )}
            />

            <Controller
              name="surname"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  error={!!error}
                  helperText={error ? error.message : null}
                  label="Surname"
                  variant="outlined"
                  className={styles.wider_textfield}
                  onChange={(event) => {
                    const inputSurname = event.target.value;
                    setUser({ ...user, surname: inputSurname });
                    onChange(inputSurname);
                  }}
                  value={value}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  error={!!error}
                  helperText={error ? error.message : null}
                  label="Email"
                  variant="outlined"
                  className={styles.wider_textfield}
                  onChange={(event) => {
                    const inputEmail = event.target.value;
                    setUser({ ...user, email: inputEmail });
                    onChange(inputEmail);
                  }}
                  value={value}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  error={!!error}
                  helperText={error ? error.message : null}
                  label="Phone"
                  variant="outlined"
                  className={styles.wider_textfield}
                  onChange={(event) => {
                    const inputPhone = event.target.value;
                    setUser({ ...user, phone: inputPhone });
                    onChange(inputPhone);
                  }}
                  value={value}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  error={!!error}
                  helperText={error ? error.message : null}
                  label="Password"
                  variant="outlined"
                  type="password"
                  className={styles.wider_textfield}
                  onChange={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  error={!!error}
                  helperText={error ? error.message : null}
                  label="Confirm password"
                  variant="outlined"
                  type="password"
                  className={styles.wider_textfield}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div className={styles.user_overview}>
            <div className={styles.user_overview_logo}>
              <Lottie animationData={animation} loop={true} className={styles.animation} />
            </div>
            <div className={styles.user_overview_details}>
              <p className={styles.user_overview_details_fullname}>
                {user.name + ' ' + user.surname}
              </p>
              <p className={styles.user_overview_details_email}>{user.email}</p>
              <p className={styles.user_overview_details_phone}>{user.phone}</p>
            </div>
          </div>
        </div>
        <div className={styles.userDetails_wrapper}>
          <Button variant="contained" endIcon={<SaveIcon />} size="large" type="submit">
            SAVE
          </Button>
        </div>
      </form>
    </>
  );
};

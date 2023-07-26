import React from 'react';
import { Button, TextField } from '@mui/material';
import styles from './css/UserDetails.module.css';
import { useState } from 'react';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/my_profile.json';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userValidationSchema } from './service/validationSchema/userValidationSchema';
import { userManager } from './service/userManager';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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
                  size="small"
                  variant="outlined"
                  className={styles.wider_textfield}
                  value={value}
                  onChange={(event) => {
                    const inputName = event.target.value;
                    setUser({ ...user, name: inputName });
                    onChange(inputName);
                  }}
                  InputProps={{
                    endAdornment: <BadgeOutlinedIcon sx={{ color: '#767676' }} />
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
                  size="small"
                  variant="outlined"
                  className={styles.wider_textfield}
                  onChange={(event) => {
                    const inputSurname = event.target.value;
                    setUser({ ...user, surname: inputSurname });
                    onChange(inputSurname);
                  }}
                  value={value}
                  InputProps={{
                    endAdornment: <BadgeOutlinedIcon sx={{ color: '#767676' }} />
                  }}
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
                  size="small"
                  variant="outlined"
                  className={styles.wider_textfield}
                  onChange={(event) => {
                    const inputEmail = event.target.value;
                    setUser({ ...user, email: inputEmail });
                    onChange(inputEmail);
                  }}
                  value={value}
                  InputProps={{
                    endAdornment: <EmailOutlinedIcon sx={{ color: '#767676' }} />
                  }}
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
                  size="small"
                  variant="outlined"
                  className={styles.wider_textfield}
                  onChange={(event) => {
                    const inputPhone = event.target.value;
                    setUser({ ...user, phone: inputPhone });
                    onChange(inputPhone);
                  }}
                  value={value}
                  InputProps={{
                    endAdornment: <LocalPhoneOutlinedIcon sx={{ color: '#767676' }} />
                  }}
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
                  size="small"
                  variant="outlined"
                  type="password"
                  className={styles.wider_textfield}
                  onChange={onChange}
                  value={value}
                  InputProps={{
                    endAdornment: <LockOutlinedIcon sx={{ color: '#767676' }} />
                  }}
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
                  size="small"
                  variant="outlined"
                  type="password"
                  className={styles.wider_textfield}
                  onChange={onChange}
                  value={value}
                  InputProps={{
                    endAdornment: <LockOutlinedIcon sx={{ color: '#767676' }} />
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className={styles.userDetails_wrapper}>
          <Button variant="contained" size="size" type="submit">
            Change profile details
          </Button>
        </div>
      </form>
    </>
  );
};

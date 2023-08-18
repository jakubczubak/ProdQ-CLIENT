import React from 'react';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/infinite.json';
import { Stack, TextField, InputAdornment, Button } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import styles from './Login.module.css';
import LoginIcon from '@mui/icons-material/Login';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validationSchema';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { useState } from 'react';

export const Login = () => {
  const [error, setError] = useState(false);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(validationSchema)
  });

  const handleLogin = (data) => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: data.email,
        password: data.password
      })
    })
      .then((res) => res.json())
      .then((apiResponse) => {
        console.log(apiResponse);

        if (apiResponse.token) {
          // Successful login - you can update the app state or redirect the user
          localStorage.setItem('userToken', apiResponse.token);
          localStorage.setItem('loggedInUser', JSON.stringify(apiResponse));
        } else {
          // Unsuccessful login - display an error message
          setError(true);
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        setError(true);
      });
  };

  return (
    <Stack className={styles.login_container}>
      <Stack className={styles.login}>
        <div className={styles.loginanimation}>
          <Lottie animationData={animation} loop={true} />
        </div>

        <span className={styles.login_title}>INFRABOX</span>
        {error && <span className={styles.login_error}>Invalid credentials</span>}

        <form onSubmit={handleSubmit(handleLogin)}>
          <Stack spacing={3} className={styles.login_content}>
            <Controller
              name="email"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <TextField
                  error={!!error}
                  helperText={error ? error.message : ''}
                  placeholder="Email"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ height: '20px', width: '20px' }} />
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <TextField
                  error={!!error}
                  helperText={error ? error.message : ''}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Password"
                  onChange={onChange}
                  label="Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyOutlinedIcon sx={{ height: '20px', width: '20px' }} />
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
            <Button type="submit" variant="contained" size="large" endIcon={<LoginIcon />}>
              START
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

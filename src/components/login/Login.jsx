import React from 'react';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/infinite.json';
import { Stack, TextField, InputAdornment, Button } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import styles from './css/Login.module.css';
import LoginIcon from '@mui/icons-material/Login';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './service/validationSchema';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notifications } from '../common/Notifications';
import { useLocation } from 'react-router-dom';
import { cartManager } from '../cart/service/cartManager';
import { useDispatch } from 'react-redux';
import jwt from 'jwt-decode';

export const Login = () => {
  const location = useLocation();
  const state = location.state;
  const logoutMessage = state?.logoutMessage || '';

  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(logoutMessage ? true : false);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(validationSchema)
  });

  const navigate = useNavigate(); // Inicjalizacja nawigacji

  const handleLogin = (data) => {
    fetch(`${process.env.REACT_APP_API_SERVER_IP}/api/va/auth/authenticate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
      .then((res) => {
        if (res.status === 200) {
          // Obsługuj poprawny kod odpowiedzi (np. 200 OK)
          return res.json();
        } else if (res.status === 403) {
          // Obsługa błędu 403 - Forbidden
          setError('Access Denied' + res);
          throw new Error('Access Denied'); // Rzuć własny błąd
        } else {
          setError('Server Error');
          throw new Error('Server Error'); // Inne błędy obsługiwane jako ogólny błąd
        }
      })
      .then((apiResponse) => {
        if (apiResponse.token) {
          const decodedToken = jwt(apiResponse.token);

          sessionStorage.setItem('userToken', apiResponse.token);
          cartManager.syncCartWithServer(dispatch);
          navigate('/dashboard', { state: { loginMessage: 'Hi, ' + decodedToken.sub + ' 👋' } });
        } else {
          // Unsuccessful login - display an error message
          setError('Invalid credentials');
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        setError(error.message);
      });
  };

  return (
    <>
      <Stack className={styles.login_container}>
        <Stack className={styles.login}>
          <div className={styles.loginanimation}>
            <Lottie animationData={animation} loop={true} />
          </div>

          <span className={styles.login_title}>INFRABOX</span>
          {error && <span className={styles.login_error}>{error}</span>}

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
                    type="password"
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
      <Notifications
        open={showNotification}
        onClose={() => setShowNotification(false)}
        severity="info"
        message={logoutMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </>
  );
};

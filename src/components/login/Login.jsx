// Importy zewnętrzne
import React from 'react';
import Lottie from 'lottie-react';
import {
  Stack,
  TextField,
  InputAdornment,
  Button,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LoginIcon from '@mui/icons-material/Login';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notifications } from '../common/Notifications';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt from 'jwt-decode';

// Importy lokalne
import animation from '../../assets/Lottie/infinite.json';
import styles from './css/Login.module.css';
import { validationSchema } from './service/validationSchema';
import { cartManager } from '../cart/service/cartManager';
import { loginManager } from './service/loginManager';

export const Login = () => {
  const location = useLocation();
  const state = location.state;
  const logoutMessage = state?.logoutMessage || '';
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(logoutMessage ? true : false);
  const [rememberMe, setRememberMe] = useState(false); // Stan dla 'Remember Me'

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Inicjalizacja nawigacji
  const { handleSubmit, control, setValue } = useForm({
    // Dodaj setValue tutaj
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(validationSchema)
  });

  // Sprawdzenie localStorage przy załadowaniu komponentu
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedEmail && savedPassword) {
      setValue('email', savedEmail); // Użyj setValue bezpośrednio
      setValue('password', savedPassword);
      setRememberMe(true); // Zaznacz pole, jeśli istnieją zapisane dane
    }
  }, [setValue]); // Dodaj setValue do zależności

  const handleLogin = (data) => {
    loginManager.login(data, dispatch, navigate, setError, cartManager, jwt);

    // Zapisanie danych logowania, jeśli 'Remember Me' jest zaznaczone
    if (rememberMe) {
      localStorage.setItem('savedEmail', data.email);
      localStorage.setItem('savedPassword', data.password);
    } else {
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('savedPassword');
    }
  };

  return (
    <>
      <Stack className={styles.login_container}>
        <Stack className={styles.login}>
          <div className={styles.loginanimation}>
            <Lottie animationData={animation} loop={true} />
          </div>

          <span className={styles.login_title}>{process.env.REACT_APP_TITLE}</span>
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="Remember Me"
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

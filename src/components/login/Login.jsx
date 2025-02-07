// Importy zewnętrzne
import React, { useState, useEffect } from 'react';
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
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt from 'jwt-decode';

// Importy lokalne
import animation from '../../assets/Lottie/infinite.json';
import styles from './css/Login.module.css';
import { validationSchema } from './service/validationSchema';
import { cartManager } from '../cart/service/cartManager';
import { loginManager } from './service/loginManager';
import { Notifications } from '../common/Notifications';

export const Login = () => {
  const location = useLocation();
  const state = location.state;
  const logoutMessage = state?.logoutMessage || '';
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(!!logoutMessage);
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedEmail && savedPassword) {
      setValue('email', savedEmail);
      setValue('password', savedPassword);
      setRememberMe(true);
    }
  }, [setValue]);

  const handleLogin = (data) => {
    loginManager.login(data, dispatch, navigate, setError, cartManager, jwt);

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
          {error && (
            <>
              <span className={styles.login_error}>{error}</span>
              {error === 'Backend unavailable' && (
                <Stack spacing={3} className={styles.login_content}>
                  <Button
                 size="large"
                  variant="contained"
                  color="error"
                  onClick={() => window.open(`${process.env.REACT_APP_API_SERVER_IP}`, '_blank')}
                >
                  Go to Backend
                </Button>
                </Stack>
                
              )}
            </>
          )}

          {!error && (
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
                  label="Remember me"
                />
                <Button type="submit" variant="contained" size="large">
                  START
                </Button>
              </Stack>
            </form>
          )}
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

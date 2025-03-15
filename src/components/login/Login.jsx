// Importy zewnętrzne
import React, { useState, useEffect } from 'react';
import {
  Stack,
  TextField,
  InputAdornment,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt from 'jwt-decode';

// Importy lokalne
import prodQLogo from '../../assets/ProdQ/logo_black.svg';
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
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 }); // Stan dla efektu paralaksy

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
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

  // Obsługa efektu paralaksy
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Oblicz przesunięcie na podstawie pozycji myszy (względem środka ekranu)
      const moveX = (clientX - windowWidth / 2) * 0.02; // Skala przesunięcia w poziomie
      const moveY = (clientY - windowHeight / 2) * 0.02; // Skala przesunięcia w pionie

      setParallaxOffset({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Czyszczenie listenera przy odmontowaniu komponentu
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
      <Stack
        className={styles.login_container}
        style={{
          // Dynamiczne przesunięcie tła w zależności od ruchu myszy
          '--parallax-x': `${parallaxOffset.x}px`,
          '--parallax-y': `${parallaxOffset.y}px`,
        }}
      >
        <Stack className={styles.login}>
          {/* Logo ProdQ */}
          <div className={styles.logo_container}>
            <img src={prodQLogo} alt="ProdQ Logo" className={styles.logo} />
          </div>

          {/* Komunikat o błędzie */}
          {error && (
            <span className={styles.login_error}>
              {error === 'Backend unavailable!' ? (
                <>
                  Backend unavailable! Please{' '}
                  <a
                    href={process.env.REACT_APP_API_SERVER_IP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.login_error_link}
                  >
                    click here!
                  </a>
                </>
              ) : (
                error
              )}
            </span>
          )}

          {/* Formularz logowania */}
          <form onSubmit={handleSubmit(handleLogin)} className={styles.login_form}>
            <Stack spacing={3} className={styles.login_content}>
              <Controller
                name="email"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <TextField
                    error={!!error}
                    helperText={error ? error.message : ''}
                    placeholder="Enter your email"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon sx={{ height: '20px', width: '20px', color: '#4a90e2' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        backgroundColor: '#fafafa',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                        '& fieldset': {
                          borderColor: '#e0e0e0',
                        },
                        '&:hover fieldset': {
                          borderColor: '#4a90e2',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#4a90e2',
                          boxShadow: '0 4px 8px rgba(74, 144, 226, 0.2)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#757575',
                        fontWeight: 500,
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#4a90e2',
                      },
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
                    placeholder="Enter your password"
                    onChange={onChange}
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKeyOutlinedIcon sx={{ height: '20px', width: '20px', color: '#4a90e2' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        backgroundColor: '#fafafa',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                        '& fieldset': {
                          borderColor: '#e0e0e0',
                        },
                        '&:hover fieldset': {
                          borderColor: '#4a90e2',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#4a90e2',
                          boxShadow: '0 4px 8px rgba(74, 144, 226, 0.2)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#757575',
                        fontWeight: 500,
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#4a90e2',
                      },
                    }}
                  />
                )}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{
                      color: '#b0b0b0',
                      '&.Mui-checked': {
                        color: '#4a90e2',
                      },
                      '& .MuiSvgIcon-root': {
                        borderRadius: '4px',
                        transition: 'all 0.3s ease',
                      },
                    }}
                  />
                }
                label="Remember me"
                sx={{ color: '#757575', fontSize: '14px', fontWeight: 500 }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
                  borderRadius: '10px',
                  padding: '12px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  boxShadow: '0 4px 12px rgba(74, 144, 226, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)',
                    boxShadow: '0 6px 16px rgba(74, 144, 226, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Log In
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
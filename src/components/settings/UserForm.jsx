// Importy zewnętrzne
import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';

// Importy lokalne
import styles from './css/UserDetails.module.css';

export const UserForm = ({ control }) => {
  return (
    <div className={styles.user_inputs}>
      <p className={styles.userDetails_title}>Profile details:</p>
      <Controller
        name="firstName"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            sx={{ width: '100%' }}
            error={!!error}
            helperText={error ? error.message : null}
            label="Name"
            size="small"
            variant="outlined"
            className={styles.wider_textfield}
            value={value}
            onChange={onChange}
            InputProps={{
              endAdornment: <BadgeOutlinedIcon sx={{ color: '#767676' }} />
            }}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            sx={{ width: '100%' }}
            error={!!error}
            helperText={error ? error.message : null}
            label="Surname"
            size="small"
            variant="outlined"
            className={styles.wider_textfield}
            onChange={onChange}
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
            sx={{ width: '100%' }}
            error={!!error}
            helperText={error ? error.message : null}
            label="Email"
            size="small"
            variant="outlined"
            className={styles.wider_textfield}
            onChange={onChange}
            value={value}
            disabled
            InputProps={{
              endAdornment: <EmailOutlinedIcon sx={{ color: '#767676' }} />
            }}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          const isInvalidLength = value && value.length < 4;
          const errorMessage = isInvalidLength
            ? 'Password must be at least 4 characters long'
            : error?.message;
          return (
            <TextField
              sx={{ width: '100%' }}
              error={!!errorMessage}
              helperText={errorMessage}
              label="New password (optional)"
              size="small"
              variant="outlined"
              type="password"
              value={value}
              className={styles.wider_textfield}
              onChange={onChange}
              InputProps={{
                endAdornment: <KeyOutlinedIcon sx={{ color: '#767676' }} />
              }}
            />
          );
        }}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            sx={{ width: '100%' }}
            error={!!error}
            helperText={error ? error.message : null}
            label="Confirm password"
            size="small"
            variant="outlined"
            type="password"
            value={value}
            className={styles.wider_textfield}
            onChange={onChange}
            InputProps={{
              endAdornment: <KeyOutlinedIcon sx={{ color: '#767676' }} />
            }}
          />
        )}
      />
      <Controller
        name="actualPassword"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            sx={{ width: '100%' }}
            error={!!error}
            helperText={error ? error.message : null}
            label="Actual password"
            size="small"
            variant="outlined"
            type="password"
            value={value}
            className={styles.wider_textfield}
            onChange={onChange}
            InputProps={{
              endAdornment: <KeyOutlinedIcon sx={{ color: '#767676' }} />
            }}
          />
        )}
      />
    </div>
  );
};

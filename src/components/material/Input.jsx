import React from 'react';
import { TextField } from '@mui/material';

export const Input = ({ error, placeholder, onBlur, value, onChange, label, ...res }) => {
  return (
    <TextField
      error={!!error}
      helperText={error ? error.message : ''}
      placeholder={placeholder}
      onBlur={onBlur}
      value={value}
      onChange={onChange}
      label={label}
      {...res}
    />
  );
};

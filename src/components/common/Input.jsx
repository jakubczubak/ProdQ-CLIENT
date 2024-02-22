//Importy zewnętrzne
import React from 'react';
import { TextField } from '@mui/material';

export const Input = ({
  error,
  placeholder,
  onBlur,
  value,
  onChange,
  label,
  width,
  variant,
  ...res
}) => {
  return (
    <TextField
      style={{ width: width || '100%' }}
      error={!!error}
      helperText={error ? error.message : ''}
      placeholder={placeholder}
      onBlur={onBlur}
      value={value}
      onChange={onChange}
      label={label}
      variant={variant || 'outlined'}
      {...res}
    />
  );
};

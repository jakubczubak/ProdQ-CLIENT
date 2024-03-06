//Importy zewnętrzne
import React from 'react';
import { InputAdornment, Stack } from '@mui/material';
import { Controller } from 'react-hook-form';
//Importy lokalne
import { Input } from '../common/Input';

export const Dimensions = ({ control }) => {
  return (
    <Stack spacing={1} mt={2} direction="row">
      <Controller
        name="dc"
        control={control}
        render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
          <Input
            error={error}
            placeholder="⌀ 12"
            onBlur={onBlur}
            value={value}
            onChange={onChange}
            label="⌀ DC"
            InputProps={{
              endAdornment: <InputAdornment position="end">mm</InputAdornment>
            }}
          />
        )}
      />
      <Controller
        name="cfl"
        control={control}
        render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
          <Input
            error={error}
            placeholder="30"
            onBlur={onBlur}
            value={value}
            onChange={onChange}
            label="LCF"
            InputProps={{
              endAdornment: <InputAdornment position="end">mm</InputAdornment>
            }}
          />
        )}
      />
      <Controller
        name="oal"
        control={control}
        render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
          <Input
            error={error}
            placeholder="60"
            onBlur={onBlur}
            value={value}
            onChange={onChange}
            label="OAL"
            InputProps={{
              endAdornment: <InputAdornment position="end">mm</InputAdornment>
            }}
          />
        )}
      />
    </Stack>
  );
};

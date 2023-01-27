import React from 'react';
import { InputAdornment, Stack } from '@mui/material';
import { Controller } from 'react-hook-form';

import { Input } from './Input';

export const Dimensions = ({ control, type }) => {
  return (
    <>
      {type == 'Plate' && (
        <Stack spacing={1} mt={2} direction="row">
          <Controller
            name="x"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input
                error={error}
                placeholder="415"
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                label="Width"
                InputProps={{
                  endAdornment: <InputAdornment position="end">mm</InputAdornment>
                }}
              />
            )}
          />
          <Controller
            name="y"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input
                error={error}
                placeholder="575"
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                label="Height"
                InputProps={{
                  endAdornment: <InputAdornment position="end">mm</InputAdornment>
                }}
              />
            )}
          />
          <Controller
            name="z"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input
                error={error}
                placeholder="10"
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                label="Thickness"
                InputProps={{
                  endAdornment: <InputAdornment position="end">mm</InputAdornment>
                }}
              />
            )}
          />
        </Stack>
      )}
      {type == 'Tube' && (
        <Stack spacing={1} mt={2} direction="row">
          <Controller
            name="diameter"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input
                error={error}
                placeholder="⌀ 20"
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                label="Diameter"
                InputProps={{
                  endAdornment: <InputAdornment position="end">mm</InputAdornment>
                }}
              />
            )}
          />
          <Controller
            name="thickeness"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input
                error={error}
                placeholder="5"
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                label="Thickness"
                InputProps={{
                  endAdornment: <InputAdornment position="end">mm</InputAdornment>
                }}
              />
            )}
          />
          <Controller
            name="length"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input
                error={error}
                placeholder="1000"
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                label="Length"
                InputProps={{
                  endAdornment: <InputAdornment position="end">mm</InputAdornment>
                }}
              />
            )}
          />
        </Stack>
      )}
    </>
  );
};

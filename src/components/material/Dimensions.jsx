import React, { useEffect, useState } from 'react';
import { InputAdornment, Stack } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Input } from '../common/Input';

export const Dimensions = ({ control, type, watch }) => {
  // Stan do przechowywania wartości Internal Diameter
  const [internalDiameter, setInternalDiameter] = useState('');

  // Przechwytywanie wartości diameter i thickness
  const diameter = watch('diameter');
  const thickness = watch('thickness');

  // Obliczanie Internal Diameter po zmianie diameter lub thickness
  useEffect(() => {
    if (diameter && thickness) {
      const calcInternalDiameter = (diameter - 2 * thickness).toFixed(2);
      setInternalDiameter(calcInternalDiameter);
    } else {
      setInternalDiameter(''); // jeśli brak jednej z wartości, ustaw pustą wartość
    }
  }, [diameter, thickness]);

  return (
    <>
      {type === 'Plate' && (
        <Stack spacing={1} mt={2} direction="column">
          <Stack spacing={1} direction="row">
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
        </Stack>
      )}
      {type === 'Tube' && (
        <Stack spacing={1} mt={2} direction="column">
          <Stack spacing={1} direction="row">
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
              name="thickness"
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
          </Stack>
          {/* Internal Diameter oraz Length w tej samej linii */}
          <Stack spacing={1} direction="row">
            <Input
              label="Internal Diameter"
              value={internalDiameter || ''}
              InputProps={{
                endAdornment: <InputAdornment position="end">mm</InputAdornment>
              }}
              disabled
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
        </Stack>
      )}
      {type === 'Rod' && (
        <Stack spacing={1} mt={2} direction="column">
          <Stack spacing={1} direction="row">
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
              name="thickness"
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
          </Stack>
          <Stack spacing={1} direction="row">
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
        </Stack>
      )}
    </>
  );
};

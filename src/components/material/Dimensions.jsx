import React, { useEffect, useState } from 'react';
import { InputAdornment, Stack } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Input } from '../common/Input';

export const Dimensions = ({ control, type, watch }) => {
  const [internalDiameter, setInternalDiameter] = useState('');

  const diameter = watch('diameter');
  const thickness = watch('thickness');

  useEffect(() => {
    if (diameter && thickness) {
      const calcInternalDiameter = (diameter - 2 * thickness).toFixed(2);
      setInternalDiameter(calcInternalDiameter);
    } else {
      setInternalDiameter('');
    }
  }, [diameter, thickness]);

  return (
    <Stack spacing={1} mt={2} direction="column">
      {type === 'Plate' && (
        <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
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
                  endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                  sx: { borderRadius: '8px' }
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
                  endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                  sx: { borderRadius: '8px' }
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
                  endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                  sx: { borderRadius: '8px' }
                }}
              />
            )}
          />
        </Stack>
      )}
      {type === 'Tube' && (
        <>
          <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
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
                    endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    sx: { borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }
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
                    endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    sx: { borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }
                  }}
                />
              )}
            />
          </Stack>
          <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
            <Input
              label="Internal Diameter"
              value={internalDiameter || ''}
              disabled
              InputProps={{
                endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                sx: { borderRadius: '8px', background: 'rgba(240, 240, 240, 0.9)' }
              }}
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
                    endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    sx: { borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }
                  }}
                />
              )}
            />
          </Stack>
        </>
      )}
      {type === 'Rod' && (
        <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
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
                  endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                  sx: { borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }
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
                  endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                  sx: { borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }
                }}
              />
            )}
          />
        </Stack>
      )}
    </Stack>
  );
};

// Importy zewnętrzne
import React from 'react';
import { TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';

// Importy lokalne
import styles from './css/CalculationItem.module.css';

export function GeneralInfoForm({ control, state }) {
  return (
    <>
      <div className={styles.calculation_general_info}>
        <Controller
          name="calculationName"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <TextField
              id="outlined-basic"
              disabled={state && state.status === 'Finish' ? true : false}
              label="Calculation name"
              variant="outlined"
              error={!!error}
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              helperText={error ? error.message : null}
              mb={16}
            />
          )}
        />
        <Controller
          name="selectedDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              value={value}
              onChange={onChange}
              disabled={state && state.status === 'Finish' ? true : false}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <>
              <InputLabel id="select-label">Status:</InputLabel>
              <Select
                labelId="select-label"
                disabled={state && state.status === 'Finish' ? true : false}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                error={!!error}
              >
                <MenuItem value={'Finish'}>Finish</MenuItem>
                <MenuItem value={'Pending'}>Pending</MenuItem>
              </Select>
            </>
          )}
        />
      </div>
      <div className={styles.line} />
    </>
  );
}

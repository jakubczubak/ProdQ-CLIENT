import React from 'react';
import styles from './css/CalculationItem.module.css';
import { Typography, Breadcrumbs, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';

export const CalculationItem = () => {
  const [status, setStatus] = useState('Pending');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">Calculations</Typography>
        <Typography color="text.primary">form</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Create a calculation
        </Typography>
      </div>
      <div className={styles.calculation_container}>
        <div className={styles.calculation_general_info}>
          <TextField id="outlined-basic" label="Calculation name" variant="outlined" />
          <DatePicker />
          <InputLabel id="select-label">Status:</InputLabel>
          <Select labelId="select-label" value={status} label="Age" onChange={handleChange}>
            <MenuItem value={'Finish'}>Finish</MenuItem>
            <MenuItem value={'Pending'}>Pending</MenuItem>
          </Select>
        </div>
        <div className={styles.line} />
        <div className={styles.calculation_cost}>
          <TextField label="Monthly cost" variant="filled" disabled />
          <div>=</div>
          <TextField label="Employee costs" variant="outlined" />
          <div>+</div>
          <TextField label="kW" variant="outlined" />
          <div>x</div>
          <TextField label="hours" variant="outlined" />
          <div>x</div>
          <TextField label="PLN/kWh" variant="outlined" />
          <div>+</div>
          <TextField label="Media" variant="outlined" />
          <div>+</div>
          <TextField label="Depreciation" variant="outlined" />
        </div>
      </div>
    </>
  );
};

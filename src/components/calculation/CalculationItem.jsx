import React from 'react';
import styles from './css/CalculationItem.module.css';
import { Typography, Breadcrumbs, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { Chart } from 'react-google-charts';

export const data = [
  ['Cost name', 'PLN'],
  ['Work', 11],
  ['Eat', 2],
  ['Commute', 2]
];

export const options = {
  title: 'Cost diagram'
};

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
        <div className={styles.cost_header}>
          <Typography variant="h6" component="div">
            Department maintenance cost
          </Typography>
        </div>

        <div className={styles.calculation_cost}>
          <TextField label="Employee costs" variant="outlined" size="small" />
          <div>+</div>
          <TextField label="kW" variant="outlined" size="small" sx={{ width: '100px' }} />
          <div>x</div>
          <TextField label="hours" variant="outlined" size="small" sx={{ width: '100px' }} />
          <div>x</div>
          <TextField label="PLN/kWh" variant="outlined" size="small" sx={{ width: '100px' }} />
          <div>+</div>
          <TextField label="Media" variant="outlined" size="small" />
          <div>+</div>
          <TextField label="Depreciation" variant="outlined" size="small" />
          <div>+</div>
          <TextField label="Tools" variant="outlined" size="small" />
          <div>+</div>
          <TextField label="Service" variant="outlined" size="small" />
          <div>+</div>
          <TextField label="Leasing/Installment" variant="outlined" size="small" />
          <div>+</div>
          <TextField label="Variable costs I" variant="outlined" size="small" />
          <div>+</div>
          <TextField label="Variable costs II" variant="outlined" size="small" />
          <div>=</div>
          <TextField label="Maintenance cost" variant="filled" disabled />
        </div>
        <div className={styles.pie_chart}>
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={'100%'}
            height={'400px'}
          />
        </div>
        <div className={styles.line} />
      </div>
    </>
  );
};

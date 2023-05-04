import React from 'react';
import styles from './css/CalculationItem.module.css';
import {
  Typography,
  Breadcrumbs,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment,
  Tooltip
} from '@mui/material';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { Chart } from 'react-google-charts';

export const options = {
  title: 'Cost diagram'
};

export const CalculationItem = () => {
  const [status, setStatus] = useState('Pending');
  const [data, setData] = useState([
    ['Cost name', 'PLN'],
    ['Employee costs', 70],
    ['Electricity cost', 2],
    ['Media', 2],
    ['Depreciation', 2],
    ['Tools', 7],
    ['Service', 7],
    ['Leasing/Installment', 7],
    ['Variable costs I', 7],
    ['Variable costs II', 2]
  ]);
  const [hours, setHours] = useState(0);
  const [power, setPower] = useState(0);
  const [price, setPrice] = useState(0);

  const handleElectricityCost = () => {
    const newData = [...data];
    newData[2][1] = power * hours * price;
    setData(newData);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleEmployeeCostsChange = (event) => {
    const value = parseInt(event.target.value);
    const newData = [...data];
    newData[1][1] = value;
    setData(newData);
  };

  const handlePowerChange = (event) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) setPower(0);
    setPower(value);
    handleElectricityCost();
  };

  const handleHoursChange = (event) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) setHours(0);
    setHours(value);
    handleElectricityCost();
  };

  const handlePriceChange = (event) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) setPrice(0);
    setPrice(value);
    handleElectricityCost();
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
          <Select labelId="select-label" value={status} label="Age" onChange={handleStatusChange}>
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
          <Tooltip title="Employee costs">
            <TextField
              label="Employee costs"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">PLN</InputAdornment>
              }}
              onChange={handleEmployeeCostsChange}
              value={data[1][1]}
            />
          </Tooltip>
          <div>+</div>
          <Tooltip title="Machine power consumption">
            <TextField
              variant="outlined"
              size="small"
              sx={{ width: '100px' }}
              InputProps={{
                endAdornment: <InputAdornment position="end">kW</InputAdornment>
              }}
              onChange={handlePowerChange}
              value={power}
            />
          </Tooltip>
          <div>x</div>
          <Tooltip title="Machine operating hours">
            <TextField
              variant="outlined"
              size="small"
              sx={{ width: '100px' }}
              InputProps={{
                endAdornment: <InputAdornment position="end">h</InputAdornment>
              }}
              onChange={handleHoursChange}
              value={hours}
            />
          </Tooltip>
          <div>x</div>
          <Tooltip title="Price PLN/kWh">
            <TextField
              variant="outlined"
              size="small"
              sx={{ width: '150px' }}
              InputProps={{
                endAdornment: <InputAdornment position="end">PLN/kWh</InputAdornment>
              }}
              onChange={handlePriceChange}
              value={price}
            />
          </Tooltip>
          <div>+</div>
          <Tooltip title="Media price">
            <TextField
              label="Media"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">PLN</InputAdornment>
              }}
            />
          </Tooltip>
          <div>+</div>
          <Tooltip title="Depreciation price">
            <TextField
              label="Depreciation"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">PLN</InputAdornment>
              }}
            />
          </Tooltip>
          <div>+</div>
          <Tooltip title="Tools price">
            <TextField
              label="Tools"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">PLN</InputAdornment>
              }}
            />
          </Tooltip>
          <div>+</div>
          <Tooltip title="Service price">
            <TextField
              label="Service"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">PLN</InputAdornment>
              }}
            />
          </Tooltip>
          <div>+</div>
          <Tooltip title="Leasing/Installment price">
            <TextField
              label="Leasing/Installment"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">PLN</InputAdornment>
              }}
            />
          </Tooltip>
          <div>+</div>
          <Tooltip title="Variable costs I price">
            <TextField
              label="Variable costs I"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">PLN</InputAdornment>
              }}
            />
          </Tooltip>
          <div>+</div>
          <Tooltip title="Variable costs II price">
            <TextField
              label="Variable costs II"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">PLN</InputAdornment>
              }}
            />
          </Tooltip>
          <div>=</div>
          <Tooltip title="Department maintenance cost">
            <TextField
              label="Maintenance cost"
              variant="filled"
              disabled
              InputProps={{
                endAdornment: <InputAdornment position="end">PLN (net)</InputAdornment>
              }}
            />
          </Tooltip>
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

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
  Tooltip,
  IconButton,
  Button
} from '@mui/material';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { Chart } from 'react-google-charts';
import DownloadingIcon from '@mui/icons-material/Downloading';
import { Cart } from '../cart/Cart';

export const options = {
  title: 'Cost diagram'
};

export const CalculationItem = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const [department_maintenance_cost] = useState([
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

  const [cnc_order_cost] = useState([
    ['Cost name', 'PLN'],
    ['Material cost', 10],
    ['Tool cost', 2],
    ['Department cost', 60],
    ['Income', 10]
  ]);

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
          <Select labelId="select-label">
            <MenuItem value={'Finish'}>Finish</MenuItem>
            <MenuItem value={'Pending'}>Pending</MenuItem>
          </Select>
        </div>
        <div className={styles.line} />
        <div className={styles.department_maintenance_cost}>
          <div className={styles.cost_header}>
            <Typography variant="h6" component="div">
              Department maintenance cost
            </Typography>
          </div>
          <div className={styles.input}>
            <Tooltip title="Employee costs">
              <TextField
                label="Employee costs"
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                }}
              />
            </Tooltip>
            <Tooltip title="Machine power consumption">
              <TextField
                label="Power consumption"
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">kW</InputAdornment>
                }}
              />
            </Tooltip>
            <Tooltip title="Machine operating hours">
              <TextField
                label="Operating hours"
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">h</InputAdornment>
                }}
              />
            </Tooltip>
            <Tooltip title="Price PLN/kWh">
              <TextField
                label="Price PLN/kWh"
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN/kWh</InputAdornment>
                }}
              />
            </Tooltip>
            <Tooltip title="Media price">
              <TextField
                label="Media"
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                }}
              />
            </Tooltip>
            <Tooltip title="Depreciation price">
              <TextField
                label="Depreciation"
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                }}
              />
            </Tooltip>
            <Tooltip title="Tools price">
              <TextField
                label="Tools"
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                }}
              />
            </Tooltip>
            <Tooltip title="Service price">
              <TextField
                label="Service"
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                }}
              />
            </Tooltip>
            <Tooltip title="Leasing/Installment price">
              <TextField
                label="Leasing/Installment"
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                }}
              />
            </Tooltip>
            <Tooltip title="Variable costs I price">
              <TextField
                label="Variable costs I"
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                }}
              />
            </Tooltip>
            <Tooltip title="Variable costs II price">
              <TextField
                label="Variable costs II"
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                }}
              />
            </Tooltip>
          </div>
          <div className={styles.input}>
            <Tooltip title="Department maintenance cost">
              <TextField
                label="Maintenance cost"
                variant="filled"
                disabled
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN (net)</InputAdornment>
                }}
              />
            </Tooltip>

            <Tooltip title="Hourly department maintenance cost">
              <TextField
                label="Maintenance cost"
                variant="filled"
                disabled
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN (net)/h</InputAdornment>
                }}
              />
            </Tooltip>
          </div>
          <div className={styles.pie_chart}>
            <Chart
              chartType="PieChart"
              data={department_maintenance_cost}
              width={'100%'}
              height={'400px'}
            />
          </div>
          <div className={styles.line} />
        </div>
        <div className={styles.cnc_order_valuation}>
          <div className={styles.cost_header}>
            <Typography variant="h6" component="div">
              CNC order valuation
            </Typography>
          </div>
          <div className={styles.cnc_calculation_cost}>
            <Tooltip title="Machine time in CAM simulation">
              <TextField
                label="CAM Time"
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">h</InputAdornment>
                }}
              />
            </Tooltip>
            <div>x</div>
            <Tooltip title="Factor (Mounting, machine arming)">
              <TextField label="Factor" variant="outlined" size="small" sx={{ width: '280px' }} />
            </Tooltip>
            <div>=</div>
            <Tooltip title="Machine working time">
              <TextField
                label="CNC Time"
                size="small"
                variant="filled"
                disabled
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">h</InputAdornment>
                }}
              />
            </Tooltip>
          </div>
          <div className={styles.input}>
            <Tooltip title="Material cost">
              <TextField
                label="Material cost"
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                }}
              />
            </Tooltip>
            <Tooltip title="Download material cost from BOX">
              <IconButton>
                {' '}
                <DownloadingIcon />{' '}
              </IconButton>
            </Tooltip>
            <Button onClick={handleCartClick}>Material list included in the box</Button>
          </div>
          <div className={styles.input}>
            <Tooltip title="Tool cost">
              <TextField
                label="Tool cost"
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                }}
              />
            </Tooltip>
            <Tooltip title="Download tool cost from BOX">
              <IconButton>
                {' '}
                <DownloadingIcon />{' '}
              </IconButton>
            </Tooltip>
            <Button onClick={handleCartClick}>Tool list included in the box</Button>
          </div>
          <div className={styles.input}>
            <Tooltip title="Department cost">
              <TextField
                label="Deparment cost"
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
              />
            </Tooltip>
          </div>
          <div className={styles.input}>
            <Tooltip title="Income">
              <TextField
                label="Income"
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                }}
              />
            </Tooltip>
            <div>/</div>
            <Tooltip title="Hourly rate">
              <TextField
                label="Hourly rate"
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN/h</InputAdornment>
                }}
              />
            </Tooltip>
          </div>
          <div className={styles.input}>
            <Tooltip title="Number of machines">
              <TextField
                label="Number of machines"
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
              />
            </Tooltip>
          </div>

          <div className={styles.cnc_calculation_cost}>
            <Tooltip title="CNC order valuation">
              <TextField
                label="Valuation"
                size="small"
                variant="filled"
                disabled
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                }}
              />
            </Tooltip>
          </div>
          <div className={styles.pie_chart}>
            <Chart chartType="PieChart" data={cnc_order_cost} width={'100%'} height={'400px'} />
          </div>
        </div>
      </div>
      {isCartOpen && <Cart onClose={handleCloseCart} />}
    </>
  );
};

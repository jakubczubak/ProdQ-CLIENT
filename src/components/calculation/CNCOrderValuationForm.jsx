// Importy zewnętrzne
import React from 'react';
import { Typography, TextField, InputAdornment, Tooltip } from '@mui/material';
import { Chart } from 'react-google-charts';
import RepeatIcon from '@mui/icons-material/Repeat';
import { Controller } from 'react-hook-form';

// Importy lokalne
import styles from './css/CalculationItem.module.css';

export const CNCOrderValuationForm = ({
  control,
  state,
  machineWorkingTime,
  hourlyDepartmentMaintenanceCost,
  hourlyDepartmentMaintenanceCostPerMachine,
  hourlyRatePerMachine,
  estimatedTime,
  cncOrderValuation,
  cnc_order_cost,
  hourlyRate
}) => {
  return (
    <div className={styles.cnc_order_valuation}>
      <div className={styles.cost_header}>
        <Typography variant="h6" component="div">
          Order valuation
        </Typography>
      </div>
      <div className={styles.cnc_calculation_cost}>
        <Controller
          name="camTime"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Machine time in CAM simulation">
              <TextField
                label="CAM Time"
                disabled={state && state.status === 'Finish' ? true : false}
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">h</InputAdornment>
                }}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                error={!!error}
              />
            </Tooltip>
          )}
        />
        <div>x</div>
        <Controller
          name="factor"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Factor (Montowanie, uzbrajanie maszyny)">
              <TextField
                label="Factor"
                disabled={state && state.status === 'Finish' ? true : false}
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">x</InputAdornment>
                }}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                error={!!error}
              />
            </Tooltip>
          )}
        />
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
            value={machineWorkingTime}
          />
        </Tooltip>
      </div>
      <div className={styles.input}>
        <Controller
          name="materialCost"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Material cost">
              <TextField
                label="Material cost"
                disabled={state && state.status === 'Finish' ? true : false}
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                }}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                error={!!error}
              />
            </Tooltip>
          )}
        />
      </div>
      <div className={styles.input}>
        <Controller
          name="toolCost"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Tool cost">
              <TextField
                label="Tool cost"
                disabled={state && state.status === 'Finish' ? true : false}
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                }}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                error={!!error}
              />
            </Tooltip>
          )}
        />
      </div>
      <div className={styles.input}>
        <Controller
          name="startupFee"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Startup fee">
              <TextField
                label="Startup fee"
                disabled={state && state.status === 'Finish' ? true : false}
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                }}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                error={!!error}
              />
            </Tooltip>
          )}
        />
      </div>
      <div className={styles.input}>
        <Tooltip title="Hourly Department maintanace cost">
          <TextField
            label="Hourly maintanace cost"
            variant="filled"
            size="small"
            disabled
            sx={{ width: '280px' }}
            InputProps={{
              endAdornment: <InputAdornment position="end">PLN (net)/h</InputAdornment>
            }}
            value={hourlyDepartmentMaintenanceCost}
          />
        </Tooltip>
      </div>
      <div className={styles.input}>
        <Tooltip title="Hourly Department maintanace cost per machine">
          <TextField
            label="Per machine"
            variant="filled"
            size="small"
            disabled
            sx={{ width: '280px' }}
            InputProps={{
              endAdornment: <InputAdornment position="end">PLN (net)/machine</InputAdornment>
            }}
            value={hourlyDepartmentMaintenanceCostPerMachine}
          />
        </Tooltip>
      </div>
      <div className={styles.input}>
        <Controller
          name="income"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Income">
              <TextField
                label="Income"
                disabled={state && state.status === 'Finish' ? true : false}
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                }}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                error={!!error}
              />
            </Tooltip>
          )}
        />
        <div>
          <RepeatIcon />
        </div>
        <Tooltip title="Hourly rate">
          <TextField
            label="Hourly rate"
            variant="filled"
            disabled
            size="small"
            sx={{ width: '280px' }}
            InputProps={{
              endAdornment: <InputAdornment position="end">PLN/h</InputAdornment>
            }}
            value={hourlyRate}
          />
        </Tooltip>
        <div>
          <RepeatIcon />
        </div>
        <Tooltip title="Hourly rate per machine">
          <TextField
            label="Hourly rate per machine"
            variant="filled"
            disabled
            size="small"
            sx={{ width: '280px' }}
            InputProps={{
              endAdornment: <InputAdornment position="end">PLN/h</InputAdornment>
            }}
            value={hourlyRatePerMachine}
          />
        </Tooltip>
      </div>
      <div className={styles.input}>
        <Controller
          name="numberOfMachines"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Number of machines used">
              <TextField
                label="Number of machines"
                disabled={state && state.status === 'Finish' ? true : false}
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">x</InputAdornment>
                }}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                error={!!error}
              />
            </Tooltip>
          )}
        />
      </div>
      <div className={styles.input}>
        <Controller
          name="shiftLength"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Length of work during one day">
              <TextField
                label="Shift length"
                disabled={state && state.status === 'Finish' ? true : false}
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">h</InputAdornment>
                }}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                error={!!error}
              />
            </Tooltip>
          )}
        />
      </div>
      <div className={styles.input}>
        <Tooltip title="Estimated time of order completion">
          <TextField
            label="Estimated time"
            variant="filled"
            disabled
            size="small"
            sx={{ width: '280px' }}
            InputProps={{
              endAdornment: <InputAdornment position="end">day</InputAdornment>
            }}
            value={estimatedTime}
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
              endAdornment: <InputAdornment position="end">PLN (net)</InputAdornment>
            }}
            value={cncOrderValuation}
          />
        </Tooltip>
      </div>
      <div className={styles.pie_chart}>
        <Chart
          chartType="PieChart"
          data={cnc_order_cost}
          height={'550px'}
          options={{ pieHole: 0.4 }}
        />
      </div>
    </div>
  );
};

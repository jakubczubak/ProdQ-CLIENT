// Importy zewnętrzne
import React from 'react';
import { Typography, TextField, InputAdornment, Tooltip } from '@mui/material';
import { Controller } from 'react-hook-form';

// Importy lokalne
import styles from './css/CalculationItem.module.css';
import { PieChart } from './PieChart';

export const DepartmentMaintenanceForm = ({
  control,
  state,
  departmentMaintenanceCost,
  hourlyDepartmentMaintenanceCost,
  department_maintenance_cost
}) => {
  return (
    <div className={styles.department_maintenance_cost}>
      <div className={styles.cost_header}>
        <Typography variant="h6" component="div">
          Department maintenance cost
        </Typography>
      </div>
      <div className={styles.input}>
        <Controller
          name="billingPeriod"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Employee costs">
              <TextField
                label="Billing period"
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
        <Controller
          name="employeeCosts"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Employee costs">
              <TextField
                label="Employee costs"
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

        <Controller
          name="powerConsumption"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Machine power consumption">
              <TextField
                label="Power consumption"
                disabled={state && state.status === 'Finish' ? true : false}
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">kW</InputAdornment>
                }}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                error={!!error}
              />
            </Tooltip>
          )}
        />
        <Controller
          name="operatingHours"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Machine operating hours">
              <TextField
                label="Operating hours"
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
        <Controller
          name="pricePerKwh"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Price PLN/kWh">
              <TextField
                label="Price PLN/kWh"
                disabled={state && state.status === 'Finish' ? true : false}
                variant="outlined"
                size="small"
                sx={{ width: '280px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN/kWh</InputAdornment>
                }}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                error={!!error}
              />
            </Tooltip>
          )}
        />
        <Controller
          name="mediaPrice"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Media price">
              <TextField
                label="Media"
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
        <Controller
          name="depreciationPrice"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Depreciation price">
              <TextField
                label="Depreciation"
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
        <Controller
          name="toolsPrice"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Tools price">
              <TextField
                label="Tools"
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
        <Controller
          name="leasingPrice"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Leasing/Installment price">
              <TextField
                label="Leasing/Installment"
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
        <Controller
          name="variableCostsI"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Variable costs I price">
              <TextField
                label="Variable costs I"
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
        <Controller
          name="variableCostsII"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <Tooltip title="Variable costs II price">
              <TextField
                label="Variable costs II"
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
        <Tooltip title="Department maintenance cost">
          <TextField
            label="Maintenance cost"
            variant="filled"
            disabled
            sx={{ width: '280px' }}
            InputProps={{
              endAdornment: <InputAdornment position="end">PLN (net)</InputAdornment>
            }}
            value={departmentMaintenanceCost}
          />
        </Tooltip>

        <Tooltip title="Hourly department maintenance cost">
          <TextField
            label="Hourly maintenance cost"
            variant="filled"
            disabled
            sx={{ width: '280px' }}
            InputProps={{
              endAdornment: <InputAdornment position="end">PLN (net)/h</InputAdornment>
            }}
            value={hourlyDepartmentMaintenanceCost}
          />
        </Tooltip>
      </div>
      <PieChart department_maintenance_cost={department_maintenance_cost} />
      <div className={styles.line} />
    </div>
  );
};

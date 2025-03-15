// Importy zewnętrzne
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { Tooltip, TextField, InputAdornment, Typography, Button } from '@mui/material';
import Lottie from 'lottie-react';
import { useQuery } from '@tanstack/react-query';
// Importy lokalne
import styles from './css/DepartmentCost.module.css';
import { departmentCostValidationSchema } from './service/validationSchema/departmentCostValidationSchema';
import { departmentCostManager } from './service/departmentCostManager';
import animation from '../../assets/Lottie/department_cost2.json';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';

export const DepartmentCost = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useQuery(['departmentCost'], () =>
    departmentCostManager.getDefaultDepartmentCost()
  );
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      id: 0,
      billingPeriod: 0,
      employeeCosts: 0,
      powerConsumption: 0,
      operatingHours: 0,
      pricePerKwh: 0,
      mediaPrice: 0,
      depreciationPrice: 0,
      toolsPrice: 0,
      leasingPrice: 0,
      variableCostsI: 0,
      variableCostsII: 0
    },
    resolver: yupResolver(departmentCostValidationSchema),
    mode: 'onChange'
  });

  const onSubmit = (data) => {
    departmentCostManager.updateDefaultDepartmentCost(data, queryClient, dispatch);
  };

  useEffect(() => {
    if (data) {
      setValue('id', data.id);
      setValue('billingPeriod', data.billingPeriod);
      setValue('employeeCosts', data.employeeCosts);
      setValue('powerConsumption', data.powerConsumption);
      setValue('operatingHours', data.operatingHours);
      setValue('pricePerKwh', data.pricePerKwh);
      setValue('mediaPrice', data.mediaPrice);
      setValue('depreciationPrice', data.depreciationPrice);
      setValue('toolsPrice', data.toolsPrice);
      setValue('leasingPrice', data.leasingPrice);
      setValue('variableCostsI', data.variableCostsI);
      setValue('variableCostsII', data.variableCostsII);
    }
  }, [data, setValue]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message="Failed to fetch department cost. Check console for more info." />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.defaultValues_wrapper}>
          <div className={styles.cost_header}>
            <Lottie animationData={animation} loop={true} className={styles.animation} />
            <Typography variant="h6" component="div">
              Department Maintenance Costs
            </Typography>
          </div>
          <div className={styles.input}>
            <Controller
              name="billingPeriod"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Tooltip PopperProps={{ disablePortal: true }} title="Billing period">
                  <TextField
                    sx={{ width: '300px', marginBottom: '15px' }}
                    label="Billing period"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">h</InputAdornment>
                    }}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                </Tooltip>
              )}
            />
            <Controller
              name="employeeCosts"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Tooltip PopperProps={{ disablePortal: true }} title="Employee costs">
                  <TextField
                    sx={{ width: '300px', marginBottom: '15px' }}
                    label="Employee costs"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                    }}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                </Tooltip>
              )}
            />
            <Controller
              name="powerConsumption"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Tooltip PopperProps={{ disablePortal: true }} title="Machine power consumption">
                  <TextField
                    sx={{ width: '300px', marginBottom: '15px' }}
                    label="Power consumption"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">kW</InputAdornment>
                    }}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                </Tooltip>
              )}
            />
            <Controller
              name="operatingHours"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Tooltip PopperProps={{ disablePortal: true }} title="Machine operating hours">
                  <TextField
                    sx={{ width: '300px', marginBottom: '15px' }}
                    label="Operating hours"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">h</InputAdornment>
                    }}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                </Tooltip>
              )}
            />
            <Controller
              name="pricePerKwh"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Tooltip PopperProps={{ disablePortal: true }} title="Price PLN/kWh">
                  <TextField
                    sx={{ width: '300px', marginBottom: '15px' }}
                    label="Price PLN/kWh"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">PLN/kWh</InputAdornment>
                    }}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                </Tooltip>
              )}
            />
            <Controller
              name="mediaPrice"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Tooltip PopperProps={{ disablePortal: true }} title="Media price">
                  <TextField
                    sx={{ width: '300px', marginBottom: '15px' }}
                    label="Media"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                    }}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                </Tooltip>
              )}
            />
            <Controller
              name="depreciationPrice"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Tooltip PopperProps={{ disablePortal: true }} title="Depreciation price">
                  <TextField
                    sx={{ width: '300px', marginBottom: '15px' }}
                    label="Depreciation"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                    }}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                </Tooltip>
              )}
            />
            <Controller
              name="toolsPrice"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Tooltip PopperProps={{ disablePortal: true }} title="Tools price">
                  <TextField
                    sx={{ width: '300px', marginBottom: '15px' }}
                    label="Tools"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                    }}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                </Tooltip>
              )}
            />
            <Controller
              name="leasingPrice"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Tooltip PopperProps={{ disablePortal: true }} title="Leasing/Installment price">
                  <TextField
                    sx={{ width: '300px', marginBottom: '15px' }}
                    label="Leasing/Installment"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                    }}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                </Tooltip>
              )}
            />
            <Controller
              name="variableCostsI"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Tooltip PopperProps={{ disablePortal: true }} title="Variable costs I price">
                  <TextField
                    sx={{ width: '300px', marginBottom: '15px' }}
                    label="Variable costs I"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                    }}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                </Tooltip>
              )}
            />
            <Controller
              name="variableCostsII"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Tooltip PopperProps={{ disablePortal: true }} title="Variable costs II price">
                  <TextField
                    sx={{ width: '300px', marginBottom: '15px' }}
                    label="Variable costs II"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                    }}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                </Tooltip>
              )}
            />
          </div>
          <div className={styles.form_btn}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
                borderRadius: '10px',
                padding: '12px',
                width: '150px',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '16px',
                boxShadow: '0 4px 12px rgba(74, 144, 226, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)',
                  boxShadow: '0 6px 16px rgba(74, 144, 226, 0.5)',
                  transform: 'translateY(-2px)',
                },
                color: '#fff',
              }}
            >
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
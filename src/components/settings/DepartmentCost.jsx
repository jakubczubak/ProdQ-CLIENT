import React from 'react';
import styles from './css/DepartmentCost.module.css';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { departmentCostValidationSchema } from './service/validationSchema/departmentCostValidationSchema';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { Tooltip, TextField, InputAdornment, Typography, Button } from '@mui/material';
import { departmentCostManager } from './service/departmentCostManager';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/department_cost2.json';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
export const DepartmentCost = ({ defaultValues }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      id: 1,
      employeeCosts: defaultValues ? defaultValues.employeeCosts : 45000,
      powerConsumption: defaultValues ? defaultValues.powerConsumption : 45,
      operatingHours: defaultValues ? defaultValues.operatingHours : 160,
      pricePerKwh: defaultValues ? defaultValues.pricePerKwh : 0.79,
      mediaPrice: defaultValues ? defaultValues.mediaPrice : 1000,
      depreciationPrice: defaultValues ? defaultValues.depreciationPrice : 1000,
      toolsPrice: defaultValues ? defaultValues.toolsPrice : 1000,
      leasingPrice: defaultValues ? defaultValues.leasingPrice : 0,
      variableCostsI: defaultValues ? defaultValues.variableCostsI : 0,
      variableCostsII: defaultValues ? defaultValues.variableCostsII : 0
    },
    resolver: yupResolver(departmentCostValidationSchema),
    mode: 'onChange'
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    departmentCostManager.updateDefaultDepartmentCost(data, queryClient, dispatch);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.defaultValues_wrapper}>
          <div className={styles.cost_header}>
            <Lottie animationData={animation} loop={true} className={styles.animation} />

            <Typography variant="h9" component="div">
              Department maintenance costs
            </Typography>
          </div>
          <div className={styles.input}>
            <Controller
              name="employeeCosts"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Tooltip title="Employee costs">
                  <TextField
                    label="Employee costs"
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
          <div className={styles.form_btn}>
            <Button type="submit" variant="contained" endIcon={<ThumbUpAltOutlinedIcon />}>
              Set default values
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

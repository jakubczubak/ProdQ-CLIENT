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
  Button
} from '@mui/material';
import { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { Chart } from 'react-google-charts';
import RepeatIcon from '@mui/icons-material/Repeat';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { calcualtionItemValidationSchema } from './validationSchema/calculationItemValidationSchema';
import dayjs from 'dayjs';
import { calculationManager } from './service/calculationManager';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

export const CalculationItem = () => {
  const [departmentMaintenanceCost, setDepartmentMaintenanceCost] = useState(0);
  const [hourlyDepartmentMaintenanceCost, setHourlyDepartmentMaintenanceCost] = useState(0);
  const [machineWorkingTime, setMachineWorkingTime] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [cncOrderValuation, setCncOrderValuation] = useState(0);

  const [employeeCosts, setEmployeeCosts] = useState(0);
  const [electricityCost, setElectrictyCost] = useState(0);
  const [mediaPrice, setMediaPrice] = useState(0);
  const [depreciationPrice, setDepreciationPrice] = useState(0);
  const [toolsPrice, setToolsPrice] = useState(0);
  const [leasingPrice, setLeasingPrice] = useState(0);
  const [variableCostsI, setVariableCostsI] = useState(0);
  const [variableCostsII, setVariableCostsII] = useState(0);

  const [estimatedTime, setEstimatedTime] = useState(0);
  const [hourlyDepartmentMaintenanceCostPerMachine, setHourlyDepartmentMaintenanceCostPerMachine] =
    useState(0);

  const department_maintenance_cost = [
    ['Cost name', 'PLN'],
    ['Employee costs', employeeCosts],
    ['Electricity cost', electricityCost],
    ['Media', mediaPrice],
    ['Depreciation', depreciationPrice],
    ['Tools', toolsPrice],
    ['Leasing/Installment', leasingPrice],
    ['Variable costs I', variableCostsI],
    ['Variable costs II', variableCostsII]
  ];

  const [materialCost, setMaterialCost] = useState(0);
  const [toolCost, setToolCost] = useState(0);
  const [income, setIncome] = useState(0);
  const [departmentCost, setDepartmentCost] = useState(0);

  const cnc_order_cost = [
    ['Cost name', 'PLN'],
    ['Material cost', materialCost],
    ['Tool cost', toolCost],
    ['Department cost', departmentCost],
    ['Income', income]
  ];

  const { handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      calculationName: '',
      selectedDate: dayjs(new Date()),
      status: 'Pending',
      employeeCosts: 45000,
      powerConsumption: 45,
      operatingHours: 160,
      pricePerKwh: 0.79,
      mediaPrice: 1000,
      depreciationPrice: 1000,
      toolsPrice: 500,
      leasingPrice: 0,
      variableCostsI: 0,
      variableCostsII: 0,
      camTime: 1,
      factor: 1.2,
      materialCost: 0,
      toolCost: 0,
      income: 0,
      hourlyRate: 0,
      numberOfMachines: 1,
      shiftLength: 8
    },
    resolver: yupResolver(calcualtionItemValidationSchema),
    mode: 'onChange'
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitForm = (data) => {
    const localDate = dayjs(data.date).locale('pl').format('DD/MM/YYYY');
    data.selectedDate = localDate;
    data.cncOrderValuation = cncOrderValuation;
    calculationManager.createCalculation(data, queryClient, dispatch);
    reset();

    navigate('/calculations');
  };

  useEffect(() => {
    const employeeCost = parseFloat(watch('employeeCosts'));
    const powerConsumption = parseFloat(watch('powerConsumption'));
    const operatingHours = parseFloat(watch('operatingHours'));
    const pricePerKwh = parseFloat(watch('pricePerKwh'));
    const mediaPrice = parseFloat(watch('mediaPrice'));
    const depreciationPrice = parseFloat(watch('depreciationPrice'));
    const toolsPrice = parseFloat(watch('toolsPrice'));
    const leasingPrice = parseFloat(watch('leasingPrice'));
    const variableCostsI = parseFloat(watch('variableCostsI'));
    const variableCostsII = parseFloat(watch('variableCostsII'));

    const camTime = parseFloat(watch('camTime'));
    const factor = parseFloat(watch('factor'));
    const materialCost = parseFloat(watch('materialCost'));
    const toolCost = parseFloat(watch('toolCost'));
    const income = parseFloat(watch('income'));
    const numberOfMachines = parseInt(watch('numberOfMachines'));
    const shiftLength = parseFloat(watch('shiftLength'));

    const electricityCost = powerConsumption * operatingHours * pricePerKwh;
    const departmentMaintenanceCost = (
      employeeCost +
      mediaPrice +
      depreciationPrice +
      toolsPrice +
      leasingPrice +
      variableCostsI +
      variableCostsII +
      electricityCost
    ).toFixed(2);
    const hourlyDepartmentMaintenanceCost = (departmentMaintenanceCost / operatingHours).toFixed(2);
    const machineWorkingTime = (camTime * factor).toFixed(2);
    const departmentCost =
      (hourlyDepartmentMaintenanceCost * machineWorkingTime) / numberOfMachines;
    const cncOrderValuation = (materialCost + toolCost + departmentCost + income).toFixed(2);
    const hourlyRateValue = (
      (departmentCost + income) /
      (machineWorkingTime * numberOfMachines)
    ).toFixed(2);

    const estimatedTime = (machineWorkingTime / (shiftLength * numberOfMachines)).toFixed(2);

    setDepartmentMaintenanceCost(departmentMaintenanceCost);
    setHourlyDepartmentMaintenanceCost(hourlyDepartmentMaintenanceCost);
    setMachineWorkingTime(machineWorkingTime);
    setCncOrderValuation(cncOrderValuation);
    setHourlyRate(hourlyRateValue);

    setEmployeeCosts(employeeCost);
    setElectrictyCost(electricityCost);
    setMediaPrice(mediaPrice);
    setDepreciationPrice(depreciationPrice);
    setToolsPrice(toolsPrice);
    setLeasingPrice(leasingPrice);
    setVariableCostsI(variableCostsI);
    setVariableCostsII(variableCostsII);

    setMaterialCost(materialCost);
    setToolCost(toolCost);
    setDepartmentCost(departmentCost);

    setEstimatedTime(estimatedTime);
    setHourlyDepartmentMaintenanceCostPerMachine(
      (hourlyDepartmentMaintenanceCost / numberOfMachines).toFixed(2)
    );

    if (income >= 0) {
      setIncome(income);
    } else {
      setIncome(0);
    }
  }, [watch()]);

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}
      >
        <Typography color="text.primary">...</Typography>
        <Link color="inherit" to="/calculations" className={styles.link}>
          <Typography color="text.primary">Calculations</Typography>
        </Link>
        <Typography color="text.primary">New calculation</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Create a calculation
        </Typography>
      </div>
      <form className={styles.calculation_form} onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={styles.calculation_container}>
          <div className={styles.calculation_general_info}>
            <Controller
              name="calculationName"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <TextField
                  id="outlined-basic"
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
                <DatePicker value={value} onChange={onChange} />
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
          <div className={styles.department_maintenance_cost}>
            <div className={styles.cost_header}>
              <Typography variant="h6" component="div">
                Department maintenance cost
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
                  sx={{ width: '300px' }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">PLN (net)/h</InputAdornment>
                  }}
                  value={hourlyDepartmentMaintenanceCost}
                />
              </Tooltip>
            </div>
            <div className={styles.pie_chart}>
              <Chart
                chartType="PieChart"
                data={department_maintenance_cost}
                height={'550px'}
                options={{ pieHole: 0.4 }}
              />
            </div>
            <div className={styles.line} />
          </div>
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
                    endAdornment: <InputAdornment position="end">PLN (net)</InputAdornment>
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
                    endAdornment: (
                      <InputAdornment position="end">PLN (net) / machine</InputAdornment>
                    )
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
            </div>
            <div className={styles.input}>
              <Controller
                name="numberOfMachines"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Tooltip title="Number of machines used">
                    <TextField
                      label="Number of machines"
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
          <div className={styles.line} />
          <div className={styles.form_btn}>
            <Button variant="contained" type="submit">
              Create calculation
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

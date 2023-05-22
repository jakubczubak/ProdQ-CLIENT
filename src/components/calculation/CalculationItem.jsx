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
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { Chart } from 'react-google-charts';
import RepeatIcon from '@mui/icons-material/Repeat';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { calcualtionItemValidationSchema } from './validationSchema/calculationItemValidationSchema';
import dayjs from 'dayjs';

export const CalculationItem = () => {
  // DEPARTMENT COST
  const [employeeCost, setEmployeeCost] = useState(90000);
  const [powerConsumption, setPowerConsumption] = useState(40);
  const [operatingHours, setOperatingHours] = useState(160);
  const [pricePerKwh, setPricePerKwh] = useState(0.79);
  const [mediaPrice, setMediaPrice] = useState(1000);
  const [depreciationPrice, setDepreciationPrice] = useState(1000);
  const [toolsPrice, setToolsPrice] = useState(1000);
  const [leasingPrice, setLeasingPrice] = useState(0);
  const [variableCostsI, setVariableCostsI] = useState(0);
  const [variableCostsII, setVariableCostsII] = useState(0);
  const [electricityCost, setElectricityCost] = useState(
    powerConsumption * operatingHours * pricePerKwh
  );
  const [departmentMaintenanceCost, setDepartmentMaintenanceCost] = useState(
    (
      employeeCost +
      mediaPrice +
      depreciationPrice +
      toolsPrice +
      leasingPrice +
      variableCostsI +
      variableCostsII +
      electricityCost
    ).toFixed(2)
  );
  const [hourlyDepartmentMaintenanceCost, setHourlyDepartmentMaintenanceCost] = useState(
    (departmentMaintenanceCost / operatingHours).toFixed(2)
  );

  // CNC ORDER VALUATION
  const [camTime, setCamTime] = useState(0);
  const [factor, setFactor] = useState(0);
  const [machineWorkingTime, setMachineWorkingTime] = useState(0);
  const [materialCost, setMaterialCost] = useState(0);
  const [toolCost, setToolCost] = useState(0);
  const [income, setIncome] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [numberOfMachines, setNumberOfMachines] = useState(0);
  const [cncOrderValuation, setCncOrderValuation] = useState(0);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      calculationName: '',
      selectedDate: dayjs(new Date()),
      status: 'Pending',
      employeeCosts: employeeCost,
      powerConsumption: powerConsumption,
      operatingHours: operatingHours,
      pricePerKwh: pricePerKwh,
      mediaPrice: mediaPrice,
      depreciationPrice: depreciationPrice,
      toolsPrice: toolsPrice,
      leasingPrice: leasingPrice,
      variableCostsI: variableCostsI,
      variableCostsII: variableCostsII,
      camTime: camTime,
      factor: factor,
      materialCost: materialCost,
      toolCost: toolCost,
      income: income,
      hourlyRate: hourlyRate,
      numberOfMachines: numberOfMachines
    },
    resolver: yupResolver(calcualtionItemValidationSchema),
    mode: 'onChange'
  });

  const handleSubmitForm = (data) => {
    console.log(data);
    reset();
  };

  const calculateElectricityCost = () => {
    const electricityCost = powerConsumption * operatingHours * pricePerKwh;
    setElectricityCost(electricityCost);
  };

  const calculateDepartmentMaintenanceCost = () => {
    const departmentMaintenanceCost =
      employeeCost +
      electricityCost +
      mediaPrice +
      depreciationPrice +
      toolsPrice +
      leasingPrice +
      variableCostsI +
      variableCostsII;
    setDepartmentMaintenanceCost(departmentMaintenanceCost);
  };

  const calculateHourlyDepartmentMaintenanceCost = () => {
    const hourlyDepartmentMaintenanceCost = departmentMaintenanceCost / operatingHours;
    setHourlyDepartmentMaintenanceCost(hourlyDepartmentMaintenanceCost);
  };

  const [department_maintenance_cost_data, set_department_maintenance_cost_data] = useState([
    ['Cost name', 'PLN'],
    ['Employee costs', employeeCost],
    ['Electricity cost', electricityCost],
    ['Media', mediaPrice],
    ['Depreciation', depreciationPrice],
    ['Tools', toolsPrice],
    ['Leasing/Installment', leasingPrice],
    ['Variable costs I', variableCostsI],
    ['Variable costs II', variableCostsII]
  ]);

  const [cnc_order_cost] = useState([
    ['Cost name', 'PLN'],
    ['Material cost', 10],
    ['Tool cost', 2],
    ['Department cost', 60],
    ['Income', 10]
  ]);

  const updateCalculation = () => {
    calculateElectricityCost();
    calculateDepartmentMaintenanceCost();
    calculateHourlyDepartmentMaintenanceCost();
    const department_maintenance_cost_data = [
      ['Cost name', 'PLN'],
      ['Employee costs', employeeCost],
      ['Electricity cost', electricityCost],
      ['Media', mediaPrice],
      ['Depreciation', depreciationPrice],
      ['Tools', toolsPrice],
      ['Leasing/Installment', leasingPrice],
      ['Variable costs I', variableCostsI],
      ['Variable costs II', variableCostsII]
    ];
    set_department_maintenance_cost_data(department_maintenance_cost_data);
    console.log(department_maintenance_cost_data);
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
      <form
        className={styles.calculation_form}
        onSubmit={handleSubmit(handleSubmitForm)}
        onChange={updateCalculation}>
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
                  error={error}
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
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
                    error={error}>
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
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const newValue = isNaN(inputValue) ? 0 : parseFloat(inputValue);
                        setEmployeeCost(newValue);
                        onChange(e);
                      }}
                      error={error}
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
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const newValue = isNaN(inputValue) ? 0 : parseFloat(inputValue);
                        setPowerConsumption(newValue);
                        onChange(e);
                      }}
                      error={error}
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
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const newValue = isNaN(inputValue) ? 0 : parseFloat(inputValue);
                        setOperatingHours(newValue);
                        onChange(e);
                      }}
                      error={error}
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
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const newValue = isNaN(inputValue) ? 0 : parseFloat(inputValue);
                        setPricePerKwh(newValue);
                        onChange(e);
                      }}
                      error={error}
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
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const newValue = isNaN(inputValue) ? 0 : parseFloat(inputValue);
                        setMediaPrice(newValue);
                        onChange(e);
                      }}
                      error={error}
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
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const newValue = isNaN(inputValue) ? 0 : parseFloat(inputValue);
                        setDepreciationPrice(newValue);
                        onChange(e);
                      }}
                      error={error}
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
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const newValue = isNaN(inputValue) ? 0 : parseFloat(inputValue);
                        setToolsPrice(newValue);
                        onChange(e);
                      }}
                      error={error}
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
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const newValue = isNaN(inputValue) ? 0 : parseFloat(inputValue);
                        setLeasingPrice(newValue);
                        onChange(e);
                      }}
                      error={error}
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
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const newValue = isNaN(inputValue) ? 0 : parseFloat(inputValue);
                        setVariableCostsI(newValue);
                        onChange(e);
                      }}
                      error={error}
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
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const newValue = isNaN(inputValue) ? 0 : parseFloat(inputValue);
                        setVariableCostsII(newValue);
                        onChange(e);
                      }}
                      error={error}
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
                data={department_maintenance_cost_data}
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
                      onChange={(e) => {
                        setCamTime(e.target.value);
                        onChange(e);
                      }}
                      error={error}
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
                      onChange={(e) => {
                        setFactor(e.target.value);
                        onChange(e);
                      }}
                      error={error}
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
                      onChange={(e) => {
                        setMaterialCost(e.target.value);
                        onChange(e);
                      }}
                      error={error}
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
                      onChange={(e) => {
                        setToolCost(e.target.value);
                        onChange(e);
                      }}
                      error={error}
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
                      onChange={(e) => {
                        setIncome(e.target.value);
                        onChange(e);
                      }}
                      error={error}
                    />
                  </Tooltip>
                )}
              />
              <div>
                <RepeatIcon />
              </div>
              <Controller
                name="hourlyRate"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Tooltip title="Hourly rate">
                    <TextField
                      label="Hourly rate"
                      variant="outlined"
                      size="small"
                      sx={{ width: '280px' }}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">PLN/h</InputAdornment>
                      }}
                      onBlur={onBlur}
                      value={value}
                      onChange={(e) => {
                        setHourlyRate(e.target.value);
                        onChange(e);
                      }}
                      error={error}
                    />
                  </Tooltip>
                )}
              />
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
                      onChange={(e) => {
                        setNumberOfMachines(e.target.value);
                        onChange(e);
                      }}
                      error={error}
                    />
                  </Tooltip>
                )}
              />
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

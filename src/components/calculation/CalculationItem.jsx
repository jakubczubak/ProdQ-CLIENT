// Importy zewnętrzne
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/calculation.json';

// Importy lokalne
import styles from './css/CalculationItem.module.css';
import { InfoModal } from '../common/InfoModal';
import { CalculationItemHeader } from './CalculationItemHeader';
import { GeneralInfoForm } from './GeneralInfoForm';
import { DepartmentMaintenanceForm } from './DepartmentMaintenanceForm';
import { CNCOrderValuationForm } from './CNCOrderValuationForm';
import { calculationManager } from './service/calculationManager';
import { calcualtionItemValidationSchema } from './validationSchema/calculationItemValidationSchema';

export const CalculationItem = ({ defaultValues }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [departmentMaintenanceCost, setDepartmentMaintenanceCost] = useState(0);
  const [hourlyDepartmentMaintenanceCost, setHourlyDepartmentMaintenanceCost] = useState(0);
  const [machineWorkingTime, setMachineWorkingTime] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [hourlyRatePerMachine, setHourlyRatePerMachine] = useState(0);
  const [cncOrderValuation, setCncOrderValuation] = useState(0);
  const [employeeCosts, setEmployeeCosts] = useState(state ? state.employeeCosts : 0);
  const [electricityCost, setElectrcityCost] = useState(0);
  const [mediaPrice, setMediaPrice] = useState(state ? state.mediaPrice : 0);
  const [depreciationPrice, setDepreciationPrice] = useState(state ? state.depreciationPrice : 0);
  const [toolsPrice, setToolsPrice] = useState(state ? state.toolsPrice : 0);
  const [leasingPrice, setLeasingPrice] = useState(state ? state.leasingPrice : 0);
  const [variableCostsI, setVariableCostsI] = useState(state ? state.variableCostsI : 0);
  const [variableCostsII, setVariableCostsII] = useState(state ? state.variableCostsII : 0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [hourlyDepartmentMaintenanceCostPerMachine, setHourlyDepartmentMaintenanceCostPerMachine] =
    useState(0);
  const [materialCost, setMaterialCost] = useState(state ? state.materialCost : 0);
  const [toolCost, setToolCost] = useState(state ? state.toolCost : 0);
  const [startupFee, setStartupFee] = useState(state ? state.startupFee : 0);
  const [income, setIncome] = useState(state ? state.income : 0);
  const [departmentCost, setDepartmentCost] = useState(0);

  const department_maintenance_cost = [
    ['Cost name', 'PLN'],
    ['Employee costs 🧑‍🤝‍🧑', employeeCosts],
    ['Electricity cost ⚡', electricityCost],
    ['Media', mediaPrice],
    ['Depreciation', depreciationPrice],
    ['Tools', toolsPrice],
    ['Leasing/Installment', leasingPrice],
    ['Variable costs I ', variableCostsI],
    ['Variable costs II', variableCostsII]
  ];

  const cnc_order_cost = [
    ['Cost name', 'PLN'],
    ['Material cost', materialCost],
    ['Tool cost', toolCost],
    ['Startup fee', startupFee],
    ['Department cost', departmentCost],
    ['Income 👌', income]
  ];

  const { handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      calculationName: state ? state.calculationName : '',
      selectedDate: state ? dayjs(state.selectedDate, 'DD/MM/YYYY') : dayjs(new Date()),
      status: state ? state.status : 'Pending',
      billingPeriod: state ? state.billingPeriod : defaultValues.billingPeriod,
      employeeCosts: state ? state.employeeCosts : defaultValues.employeeCosts,
      powerConsumption: state ? state.powerConsumption : defaultValues.powerConsumption,
      operatingHours: state ? state.operatingHours : defaultValues.operatingHours,
      pricePerKwh: state ? state.pricePerKwh : defaultValues.pricePerKwh,
      mediaPrice: state ? state.mediaPrice : defaultValues.mediaPrice,
      depreciationPrice: state ? state.depreciationPrice : defaultValues.depreciationPrice,
      toolsPrice: state ? state.toolsPrice : defaultValues.toolsPrice,
      leasingPrice: state ? state.leasingPrice : defaultValues.leasingPrice,
      variableCostsI: state ? state.variableCostsI : defaultValues.variableCostsI,
      variableCostsII: state ? state.variableCostsII : defaultValues.variableCostsII,
      camTime: state ? state.camTime : 10,
      factor: state ? state.factor : 1.2,
      startupFee: state ? state.startupFee : 0,
      materialCost: state ? state.materialCost : 0,
      toolCost: state ? state.toolCost : 0,
      income: state ? state.income : 0,
      hourlyRate: state ? state.hourlyRate : 0,
      numberOfMachines: state ? state.numberOfMachines : 1,
      shiftLength: state ? state.shiftLength : 8
    },
    resolver: yupResolver(calcualtionItemValidationSchema),
    mode: 'onChange'
  });

  const handleFinishCalculation = () => {
    calculationManager.updateCalculation(formData, queryClient, dispatch);
    setOpenInfoModal(false);
    reset();
    navigate('/calculations');
  };

  const handleSubmitForm = (data) => {
    const localDate = dayjs(data.selectedDate).locale('pl').format('DD/MM/YYYY');
    data.selectedDate = localDate;
    data.cncOrderValuation = cncOrderValuation;

    if (state) {
      data.id = state.id;
      if (data.status == 'Finish') {
        setFormData(data);
        setOpenInfoModal(true);
        return;
      } else {
        calculationManager.updateCalculation(data, queryClient, dispatch);
      }
    } else {
      calculationManager.createCalculation(data, queryClient, dispatch);
    }
    reset();
    navigate('/calculations');
  };

  useEffect(() => {
    const billingPeriod = parseFloat(watch('billingPeriod'));
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
    const startupFee = parseFloat(watch('startupFee'));
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
    const hourlyDepartmentMaintenanceCost = (departmentMaintenanceCost / billingPeriod).toFixed(2);
    const machineWorkingTime = (camTime * factor).toFixed(2);
    const departmentCost = hourlyDepartmentMaintenanceCost * machineWorkingTime;
    const cncOrderValuation = (
      materialCost +
      toolCost +
      startupFee +
      departmentCost +
      income
    ).toFixed(2);

    const hourlyRateValue = ((departmentCost + income) / machineWorkingTime).toFixed(2);
    const estimatedTime = (machineWorkingTime / (shiftLength * numberOfMachines)).toFixed(2);

    setDepartmentMaintenanceCost(departmentMaintenanceCost);
    setHourlyDepartmentMaintenanceCost(hourlyDepartmentMaintenanceCost);
    setMachineWorkingTime(machineWorkingTime);
    setCncOrderValuation(cncOrderValuation);
    setHourlyRate(hourlyRateValue);
    setHourlyRatePerMachine((hourlyRateValue / numberOfMachines).toFixed(2));
    setEmployeeCosts(employeeCost);
    setElectrcityCost(electricityCost);
    setMediaPrice(mediaPrice);
    setDepreciationPrice(depreciationPrice);
    setToolsPrice(toolsPrice);
    setLeasingPrice(leasingPrice);
    setVariableCostsI(variableCostsI);
    setVariableCostsII(variableCostsII);
    setMaterialCost(materialCost);
    setToolCost(toolCost);
    setStartupFee(startupFee);
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
    // eslint-disable-next-line
  }, [watch()]);

  return (
    <>
      <CalculationItemHeader state={state} />
      <form className={styles.calculation_form} onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={styles.calculation_container}>
          <Lottie animationData={animation} loop={true} className={styles.animation} />
          <GeneralInfoForm control={control} state={state} />
          <DepartmentMaintenanceForm
            control={control}
            state={state}
            departmentMaintenanceCost={departmentMaintenanceCost}
            hourlyDepartmentMaintenanceCost={hourlyDepartmentMaintenanceCost}
            department_maintenance_cost={department_maintenance_cost}
          />
          <CNCOrderValuationForm
            control={control}
            state={state}
            machineWorkingTime={machineWorkingTime}
            hourlyDepartmentMaintenanceCost={hourlyDepartmentMaintenanceCost}
            hourlyDepartmentMaintenanceCostPerMachine={hourlyDepartmentMaintenanceCostPerMachine}
            hourlyRatePerMachine={hourlyRatePerMachine}
            estimatedTime={estimatedTime}
            cncOrderValuation={cncOrderValuation}
            cnc_order_cost={cnc_order_cost}
            hourlyRate={hourlyRate}
          />

          <div className={styles.form_btn}>
            {state ? (
              <Button
                variant="contained"
                color="warning"
                type="submit"
                disabled={state && state.status === 'Finish' ? true : false}
              >
                Update calculation
              </Button>
            ) : (
              <Button variant="contained" color="success" type="submit">
                Create calculation
              </Button>
            )}
          </div>
        </div>
      </form>
      <InfoModal
        open={openInfoModal}
        onCancel={() => setOpenInfoModal(false)}
        onConfirm={() => handleFinishCalculation()}
        text="Please check if the calculation is correct. If you want to edit the calculation, click 'Cancel' and then 'Edit calculation'.
        If you want to change the calculation status to 'FINISH', click 'Confirm'. This action cannot be undone. You will not be able to edit the calculation."
      />
    </>
  );
};

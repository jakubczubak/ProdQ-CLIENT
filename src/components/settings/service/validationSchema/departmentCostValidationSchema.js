import { number, object } from 'yup';

export const departmentCostValidationSchema = object().shape({
  employeeCosts: number().min(0).required('Employee costs are required'),
  powerConsumption: number().min(0).required('Power consumption is required'),
  operatingHours: number().min(0).required('Operating hours are required'),
  pricePerKwh: number().min(0).required('Price per kWh is required'),
  mediaPrice: number().min(0).required('Media price is required'),
  depreciationPrice: number().min(0).required('Depreciation price is required'),
  toolsPrice: number().min(0).required('Tools price is required'),
  leasingPrice: number().min(0).required('Leasing price is required'),
  variableCostsI: number().min(0).required('Variable costs I are required'),
  variableCostsII: number().min(0).required('Variable costs II are required')
});

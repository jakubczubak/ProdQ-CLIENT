import { number, object, string } from 'yup';

export const calcualtionItemValidationSchema = object().shape({
  calculationName: string().required('Calculation name is required'),
  selectedDate: string().required('Date is required'),
  status: string().required('Status is required'),
  employeeCosts: number().min(0).required('Employee costs are required'),
  powerConsumption: number().min(0).required('Power consumption is required'),
  operatingHours: number().min(0).required('Operating hours are required'),
  pricePerKwh: number().min(0).required('Price per kWh is required'),
  mediaPrice: number().min(0).required('Media price is required'),
  depreciationPrice: number().min(0).required('Depreciation price is required'),
  toolsPrice: number().min(0).required('Tools price is required'),
  leasingPrice: number().min(0).required('Leasing price is required'),
  variableCostsI: number().min(0).required('Variable costs I are required'),
  variableCostsII: number().min(0).required('Variable costs II are required'),
  camTime: number().min(0).required('CAM time is required'),
  factor: number().min(0).required('Factor is required'),
  materialCost: number().min(0).required('Material cost is required'),
  toolCost: number().min(0).required('Tool cost is required'),
  income: number().min(0).required('Income is required'),
  hourlyRate: number().min(0).required('Hourly rate is required'),
  numberOfMachines: number().min(0).required('Number of machines is required'),
  shiftLength: number().min(0).required('Shift length is required')
});

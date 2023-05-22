import { number, object, string } from 'yup';

export const calcualtionItemValidationSchema = object().shape({
  calculationName: string().required('Calculation name is required'),
  selectedDate: string().required('Date is required'),
  status: string().required('Status is required'),
  employeeCosts: number().required('Employee costs are required'),
  powerConsumption: number().required('Power consumption is required'),
  operatingHours: number().required('Operating hours are required'),
  pricePerKwh: number().required('Price per kWh is required'),
  mediaPrice: number().required('Media price is required'),
  depreciationPrice: number().required('Depreciation price is required'),
  toolsPrice: number().required('Tools price is required'),
  leasingPrice: number().required('Leasing price is required'),
  variableCostsI: number().required('Variable costs I are required'),
  variableCostsII: number().required('Variable costs II are required'),
  camTime: number().required('CAM time is required'),
  factor: number().required('Factor is required'),
  materialCost: number().required('Material cost is required'),
  toolCost: number().required('Tool cost is required'),
  income: number().required('Income is required'),
  hourlyRate: number().required('Hourly rate is required'),
  numberOfMachines: number().required('Number of machines is required')
});

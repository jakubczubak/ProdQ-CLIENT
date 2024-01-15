import { number, string, object } from 'yup';

export const productionValidationSchema = object().shape({
  partName: string().required('Part name is required'),
  status: string().required('Production sStatus is required'),
  camTime: number().min(0).required('Cam time is required'),
  materialValue: number().min(0).required('Material value is required'),
  partType: string().required('Production type is required')
});

import { number, object, string } from 'yup';

export const materialValidationSchema = object().shape({
  materialGroupName: string().required('Material group name is required'),
  materialGroupCode: string().required('Material group code is required'),
  materialGroupDensity: number()
    .typeError('Density must be a number')
    .min(0, 'Density must be greater than 0')
    .required('Density is required'),
  type: string().required('Select a type')
});

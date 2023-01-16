import { number, object, string } from 'yup';

export const materialGroupValidationSchema = object().shape({
  materialGroupName: string().required('Material group name is required'),
  materialGroupCode: string().required('Material group code is required'),
  materialGroupDensity: number()
    .typeError('Density must be a number')
    .required('Density is required')
});

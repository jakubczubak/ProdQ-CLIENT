import { object, string, mixed } from 'yup';

export const materialGroupValidationSchema = object().shape({
  name: string().required('Material group name is required'),
  type: string().required('Select a type'),
  materialType: object().required('Select a material type')
});

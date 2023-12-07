import { number, object, string } from 'yup';

export const materialTypeValidationSchema = object().shape({
  name: string().required('Material type name is required'),
  density: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required')
});
